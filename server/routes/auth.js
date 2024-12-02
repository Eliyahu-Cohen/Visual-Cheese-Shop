// const jwt = require('jsonwebtoken');

// // פונקציה לאימות טוקן ויכולת לבדוק אם המשתמש הוא מנהל או המשתמש עצמו
// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // יוצא טוקן מה-header

//   if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
//     req.user = user; // שומר את פרטי המשתמש המפוענחים
//     next(); // ממשיך לפונקציה הבאה ב-router
//   });
// };

// // פונקציה לאימות אם המשתמש הוא בעל החשבון או מנהל
// const authorizeUser = (req, res, next) => {
//   const userId = req.params.id;

//   if (req.user.id !== parseInt(userId) && req.user.user_type !== 'admin') {
//     return res.status(403).json({ error: 'You are not authorized to update this user.' });
//   }

//   next(); // אם הכל תקין, ממשיך לעדכון
// };

// module.exports = { authenticateToken, authorizeUser };

// routes/auth.js

// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const { generateOtp, saveOtp, verifyOtpByPhone, findOrCreateUser } = require('../services/userService');
// const { JWT_SECRET } = process.env;

// // רישום משתמש חדש
// router.post('/register', async (req, res) => {
//   const { username, password, phone } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await createUser({ username, password: hashedPassword, phone });
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // התחברות עם שם משתמש וסיסמה
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await getUserByUsername(username);
//     if (!user || !await bcrypt.compare(password, user.password)) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Logged in successfully', token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // שליחת OTP
// router.post('/send-otp', async (req, res) => {
//   const { phone } = req.body;
//   const otp = generateOtp();
//   await saveOtp(phone, otp);
//   // שליחה של OTP למספר הטלפון...
//   res.json({ message: 'OTP sent' });
// });

// // אימות OTP
// router.post('/verify-otp', async (req, res) => {
//   const { phone, otp } = req.body;
//   const isValid = await verifyOtpByPhone(phone, otp);
//   if (!isValid) {
//     return res.status(401).json({ message: 'Invalid OTP' });
//   }
//   const user = await findOrCreateUser(phone);
//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
//   res.json({ message: 'OTP verified', token });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // חיבור למסד נתונים
// const { sendSmsCode } = require('../services/smsService'); // שירות לשליחת קוד SMS
// const nodemailer = require('nodemailer'); // חבילת שליחת מיילים

// // הגדרת שירות שליחת מיילים
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // תוכל לשנות לשירות מייל אחר
//   auth: {
//     user: process.env.EMAIL_USER, // כתובת המייל שלך
//     pass: process.env.EMAIL_PASSWORD // סיסמת המייל שלך (או token למי שמשתמש ב-Google App Password)
//   }
// });

// // פונקציה לשליחת מייל עם הקוד
// const sendEmail = (email, code) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'הקוד שלך לאימות',
//     text: `הקוד שלך לאימות הוא: ${code}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('שגיאה בשליחת המייל:', error);
//     } else {
//       console.log('המייל נשלח בהצלחה:', info.response);
//     }
//   });
// };

// // נתיב התחברות למערכת
// router.post('/login', async (req, res) => {
//   const { phone, email } = req.body;

//   try {
//     // חיפוש המשתמש במסד נתונים לפי מספר טלפון
//     const [user] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);

//     if (user) {
//       // אם המשתמש קיים, שלח לו קוד SMS לאימות
//       const code = Math.floor(1000 + Math.random() * 9000); // קוד חד-פעמי
//       sendSmsCode(phone, code); // שליחת קוד SMS (עליך להגדיר את שירות ה-SMS)

//       // שלח את הקוד גם למייל אם נשלח
//       if (email) {
//         sendEmail(email, code); // שליחה למייל
//       }

//       return res.json({ success: true, message: 'קוד שלח בהצלחה' });
//     } else {
//       // אם המשתמש לא קיים, עבור לרישום
//       return res.json({ success: false, message: 'משתמש לא נמצא, עובר לרישום.' });
//     }
//   } catch (error) {
//     console.error('שגיאה בהתחברות:', error);
//     res.status(500).json({ success: false, message: 'הייתה שגיאה בשרת. אנא נסה שוב מאוחר יותר.' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();

// // Add your routes here
// router.get('/example', (req, res) => {
//   res.send('Example route');
// });

// module.exports = router;


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const db = require("../db"); // קובץ לניהול החיבור למסד הנתונים
// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// // רישום משתמש
// router.post("/register", async (req, res) => {
//   const { username, password, email, address, userType } = req.body;

//   try {
//     // בדיקה אם המשתמש קיים
//     const [existingUser] = await db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email]);
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "שם משתמש או דוא\"ל כבר קיימים במערכת" });
//     }

//     // הצפנת הסיסמה
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // הוספת המשתמש
//     await db.query(
//       "INSERT INTO users (username, password, email, address, userType) VALUES (?, ?, ?, ?, ?)",
//       [username, hashedPassword, email, address, userType]
//     );

//     // יצירת טוקן JWT
//     const token = jwt.sign({ username, userType }, JWT_SECRET, { expiresIn: "1h" });
//     res.status(201).json({ message: "רישום בוצע בהצלחה", token });
//   } catch (error) {
//     res.status(500).json({ message: "שגיאה בשרת" });
//   }
// });

// // התחברות משתמש
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const [user] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
//     if (user.length === 0) {
//       return res.status(400).json({ message: "משתמש לא נמצא" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user[0].password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "סיסמה לא נכונה" });
//     }

//     const token = jwt.sign({ username, userType: user[0].userType }, JWT_SECRET, { expiresIn: "1h" });
//     res.status(200).json({ message: "התחברות בוצעה בהצלחה", token });
//   } catch (error) {
//     res.status(500).json({ message: "שגיאה בשרת" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// const CLIENT_URL = "http://localhost:3000"; // הכתובת של ה-Frontend שלך

// // הגדרות Google Strategy
// passport.use(
//   new (require("passport-google-oauth20").Strategy)(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // בדוק אם המשתמש כבר קיים במערכת לפי Google ID או Email
//       const user = await db.query("SELECT * FROM users WHERE email = ?", [profile.emails[0].value]);

//       if (user.length === 0) {
//         // יצירת משתמש חדש אם לא קיים
//         await db.query(
//           "INSERT INTO users (username, email, userType) VALUES (?, ?, 'regular')",
//           [profile.displayName, profile.emails[0].value]
//         );
//       }
//       done(null, profile);
//     }
//   )
// );

// // מסלול התחברות ל-Google
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // מסלול החזרה מ-Google
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: `${CLIENT_URL}/login` }),
//   (req, res) => {
//     // יצירת JWT
//     const token = jwt.sign({ email: req.user.emails[0].value }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.redirect(`${CLIENT_URL}/?token=${token}`); // חזרה ל-Frontend עם הטוקן
//   }
// );

// module.exports = router;


const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const CLIENT_URL = "http://localhost:3001"; // הכתובת של ה-Frontend שלך

// הגדרות Google Strategy
passport.use(
  new (require("passport-google-oauth20").Strategy)(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // בדוק אם המשתמש כבר קיים במערכת לפי Google ID או Email
      const user = await db.query("SELECT * FROM users WHERE email = ?", [profile.emails[0].value]);

      if (user.length === 0) {
        // יצירת משתמש חדש אם לא קיים
        await db.query(
          "INSERT INTO users (username, email, userType) VALUES (?, ?, 'regular')",
          [profile.displayName, profile.emails[0].value]
        );
      }
      done(null, profile);
    }
  )
);

// מסלול התחברות ל-Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// מסלול החזרה מ-Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${CLIENT_URL}/login` }),
  (req, res) => {
    // יצירת JWT
    const token = jwt.sign({ email: req.user.emails[0].value }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.redirect(`${CLIENT_URL}/?token=${token}`); // חזרה ל-Frontend עם הטוקן
  }
);

module.exports = router;
