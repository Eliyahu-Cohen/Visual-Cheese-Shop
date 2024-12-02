// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const bcrypt = require('bcryptjs'); // חבילה להצפנת סיסמאות
// const jwt = require('jsonwebtoken'); // חבילה לניהול JWT

// // רשימת משתמשים
// router.get('/', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM users');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // יצירת משתמש חדש (הרשמה)
// router.post('/register', async (req, res) => {
//   const { username, password, email, phone_number, address, user_type } = req.body;

//   // בדיקת אם המשתמש כבר קיים
//   db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, result) => {
//       if (err) return res.status(500).json({ message: 'אירעה שגיאה' });

//       if (result.length > 0) {
//           return res.status(400).json({ message: 'המשתמש כבר קיים' });
//       }

//       // הצפנת סיסמה
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // הוספת משתמש למסד נתונים
//       db.query('INSERT INTO users (username, password, email, phone_number, address, user_type) VALUES (?, ?, ?, ?, ?, ?)',
//           [username, hashedPassword, email, phone_number, address, user_type], (err, result) => {
//               if (err) return res.status(500).json({ message: 'אירעה שגיאה' });

//               res.status(201).json({ message: 'המשתמש נרשם בהצלחה' });
//           });
//   });
// });

// // התחברות משתמש
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // חיפוש משתמש לפי שם משתמש
//     const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
//     const user = rows[0];

//     if (!user) {
//       return res.status(400).json({ error: 'User not found' });
//     }

//     // בדיקת התאמת סיסמה
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({ error: 'Incorrect password' });
//     }

//     // יצירת JSON Web Token (JWT) עבור המשתמש
//     const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ message: "User logged in", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // מחיקת משתמש
// router.delete('/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     await db.query('DELETE FROM users WHERE id = ?', [userId]);
//     res.json({ message: `User ${userId} deleted` });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

// קוד מהשאלה של רישום
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const { getUserByUsername, createUser, generateOtp, saveOtp, verifyOtpByPhone } = require('../services/userService'); // פונקציות שירות
// const { JWT_SECRET } = process.env;

// // רישום משתמש חדש
// router.post('/register', async (req, res) => {
//   const { username, password, phone } = req.body;

//   // בדיקה אם המשתמש כבר קיים
//   const existingUser = await getUserByUsername(username);
//   if (existingUser) {
//     return res.status(400).json({ message: 'Username already exists' });
//   }

//   // יצירת סיסמה מוצפנת ושמירת המשתמש החדש
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const newUser = await createUser({ username, password: hashedPassword, phone });
//   res.status(201).json({ message: 'User registered successfully', user: newUser });
// });

// // כניסה עם שם משתמש וסיסמה
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const user = await getUserByUsername(username);
//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     return res.status(401).json({ message: 'Invalid username or password' });
//   }

//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
//   res.json({ message: 'Logged in successfully', token });
// });

// // שליחת קוד OTP לטלפון
// router.post('/send-otp', async (req, res) => {
//   const { phone } = req.body;

//   const otp = generateOtp(); // פונקציה שמייצרת קוד OTP
//   await saveOtp(phone, otp); // שמירת ה-OTP במסד נתונים עם תוקף קצר (5 דקות)

//   // כאן תוכל לשלב פונקציה לשליחת הקוד לטלפון (SMS או דוא"ל)
//   res.json({ message: 'OTP sent to phone number' });
// });

// // אימות קוד OTP
// router.post('/verify-otp', async (req, res) => {
//   const { phone, otp } = req.body;

//   const isValid = await verifyOtpByPhone(phone, otp); // בדיקת תקינות הקוד מול מספר הטלפון
//   if (!isValid) {
//     return res.status(401).json({ message: 'Invalid OTP' });
//   }

//   // יצירת או מציאת משתמש קיים לפי הטלפון
//   const user = await findOrCreateUser(phone); // פונקציה שמוצאת או יוצרת משתמש לפי הטלפון
//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
//   res.json({ message: 'Logged in successfully', token });
// });

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const db = require('../db'); // מחבר למסד נתונים
// const { authenticateToken } = require('../middleware/auth');

// // פונקציה לרישום משתמש חדש
// router.post('/register', async (req, res) => {
//   const { username, email, password, phone, address } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await db.query(
//       'INSERT INTO users (username, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
//       [username, email, hashedPassword, phone, address]
//     );
//     res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // פונקציה לכניסת משתמש קיים
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     const user = rows[0];
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Email or password is incorrect' });
//     }

//     const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ accessToken, message: 'Logged in successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // דוגמה למסלול מוגן עם JWT
// router.get('/profile', authenticateToken, async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT username, email, phone, address FROM users WHERE id = ?', [req.user.userId]);
//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../db");
const router = express.Router();
require("dotenv").config(); // אם אתה משתמש ב-`.env`

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.post("/register", async (req, res) => {
//   const { username, password, email, address, phone } = req.body;

//   try {
//      // בדיקה אם המשתמש כבר קיים
//      const [rows] = await db.query(
//         "SELECT * FROM users WHERE username = ? OR phone = ?",
//         [username, phone]
//      );

//      if (rows.length > 0) {

//         return res.status(400).json({ message: "המשתמש או מספר הטלפון כבר קיימים." });
//      }

//      // הצפנת הסיסמה
//      const hashedPassword = await bcrypt.hash(password, 10);

//      // הוספת המשתמש למסד הנתונים
//      const result = await db.query(
//         "INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)",
//         [username, hashedPassword, email, address, phone]
//      );

//      if (result.affectedRows > 0) {
//         return res.json({ message: "משתמש נרשם בהצלחה." });
//      } else {
//         return res.status(500).json({ message: "שגיאה ברישום המשתמש." });
//      }
//   } catch (error) {
//      console.error("Database Error: ", error);
//      res.status(500).json({ message: "שגיאה בשרת. נסה שוב מאוחר יותר." });
//   }
// });

// router.post("/register", async (req, res) => {
//   const { username, password, email, address, phone } = req.body;

//   // לוגים של הנתונים הנכנסים
//   console.log("Received data:", req.body);

//   try {
//     // בדיקה אם המשתמש כבר קיים
//     const [rows] = await db.query(
//       "SELECT * FROM users WHERE username = ? OR phone = ?",
//       [username, phone]
//     );

//     console.log("User existence check result:", rows);

//     if (rows.length > 0) {
//       console.warn("User already exists:", { username, phone });
//       return res
//         .status(400)
//         .json({ message: "המשתמש או מספר הטלפון כבר קיימים." });
//     }

//     // הצפנת הסיסמה
//     console.log("Hashing password...");
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Password hashed successfully.");

//     // הוספת המשתמש למסד הנתונים
//     const result = await db.query(
//       "INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)",
//       [username, hashedPassword, email, address, phone]
//     );

//     console.log("Insert result:", result);

//     if (result.affectedRows > 0) {
//       console.log("User registered successfully:", { username, email, phone });
//       return res.json({ message: "משתמש נרשם בהצלחה." });
//     } else {
//       console.error("Insert failed, no rows affected.");
//       return res.status(500).json({ message: "שגיאה ברישום המשתמש." });
//     }
//   } catch (error) {
//     console.error("Database Error: ", error);
//     res.status(500).json({ message: "שגיאה בשרת. נסה שוב מאוחר יותר.", error });
//   }
// });
// const jwt = require('jsonwebtoken'); // ודא ש-jwt יובא בהצלחה

router.post("/register", async (req, res) => {
  const { username, password, email, address, phone } = req.body;

  console.log("Received data:", JSON.stringify(req.body, null, 2));

  try {
    // בדיקה אם המשתמש כבר קיים לפי שם משתמש, מספר טלפון או אימייל
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? OR phone = ? OR email = ?",
      [username, phone, email]
    );

    console.log("User existence check result:", rows);

    if (rows.length > 0) {
      console.warn("User already exists:", { username, phone, email });
      return res
        .status(400)
        .json({ message: "המשתמש, מספר הטלפון או האימייל כבר קיימים במערכת." });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    // הוספת המשתמש למסד הנתונים
    const [result] = await db.query(
      "INSERT INTO orders (userId, username, phone, totalPrice, items)VALUES (?, ?, ?, ?, ?)",
      [username, hashedPassword, email, address, phone]
    );

    console.log("Insert result:", result);

    if (result.affectedRows > 0) {
      // לאחר יצירת המשתמש, נשלח את הטוקן
      const [user] = await db.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);

      // יצירת טוקן עם מידע רלוונטי מהמשתמש
      const token = jwt.sign(
        { id: user.id, phone: user.phone, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // הגדרת תוקף של 1 שעה
      );

      // שליחת הטוקן ופרטי המשתמש ללקוח
      return res.json({
        message: "המשתמש נרשם בהצלחה.",
        token: token,
        userInfo: user,
      });
    } else {
      return res.status(500).json({ message: "שגיאה ברישום המשתמש." });
    }
  } catch (error) {
    console.error("Database Error: ", error);
    return res.status(500).json({ message: "שגיאה בשרת. נסה שוב מאוחר יותר." });
  }
});

// התחברות משתמש
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    // חיפוש משתמש לפי מספר טלפון
    const [rows] = await db.query("SELECT * FROM users WHERE phone = ?", [
      phone,
    ]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ message: "מספר הטלפון לא נמצא" });
    }

    // בדיקת התאמת סיסמה
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "סיסמה שגויה" });
    }

    // יצירת JSON Web Token
    const token = jwt.sign(
      { id: user.id, phone: user.phone, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "התחברת בהצלחה", token, userInfo: user });
  } catch (err) {
    res.status(500).json({ message: "שגיאה בשרת", error: err.message });
  }
});

module.exports = router;
