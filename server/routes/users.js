

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


router.post("/register", async (req, res) => {
  const { username, password, email, address, phone } = req.body;

  console.log("Received data:", JSON.stringify(req.body, null, 2));

  try {
    // בדיקה אם המשתמש כבר קיים לפי שם משתמש, מספר טלפון או אימייל
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? OR phone = ? OR email = ?",
      [username, phone, email]
    );

    if (rows.length > 0) {
      return res
        .status(400)
        .json({ message: "המשתמש, מספר הטלפון או האימייל כבר קיימים במערכת." });
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // הוספת המשתמש למסד הנתונים
    const [result] = await db.query(
      "INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)",
      [username, hashedPassword, email, address, phone]
    );

    if (result.affectedRows > 0) {
      // לאחר יצירת המשתמש, נשלוף את הנתונים שלו
      const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [
        result.insertId,
      ]);

      const user = userRows[0]; // לוקחים את המשתמש הראשון מתוך המערך

      // יצירת טוקן עם מידע רלוונטי מהמשתמש
      const token = jwt.sign(
        { id: user.id, phone: user.phone, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // שליחת הטוקן ופרטי המשתמש ללקוח
      return res.json({
        message: "המשתמש נרשם בהצלחה.",
        token: token,
        userInfo: {
          id: user.id,
          username: user.username,
          phone: user.phone,
          email: user.email,
          address: user.address,
          userType: user.userType,
        },
      });
    } else {
      return res.status(500).json({ message: "שגיאה ברישום המשתמש." });
    }
  } catch (error) {
    console.error("Database Error: ", error);
    return res.status(500).json({ message: "שגיאה בשרת. נסה שוב מאוחר יותר." });
  }
});


// ספירת משתמשים לפי סוג
router.get("/countByType", async (req, res) => {
  try {
    const [activeUsers] = await db.query("SELECT COUNT(*) AS total FROM users WHERE userType IS NOT NULL");
    const [regularUsers] = await db.query("SELECT COUNT(*) AS total FROM users WHERE userType = 'regular'");
    const [businessUsers] = await db.query("SELECT COUNT(*) AS total FROM users WHERE userType = 'business'");
    res.json({
      activeUsers: activeUsers[0].total,
      regularUsers: regularUsers[0].total,
      businessUsers: businessUsers[0].total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// עדכון סוג משתמש
router.put("/updateUserType/:id", async (req, res) => {
  const { id } = req.params;
  const { userType } = req.body;

  try {
    const [result] = await db.query("UPDATE users SET userType = ? WHERE id = ?", [userType, id]);
    if (result.affectedRows > 0) {
      res.json({ message: "סוג המשתמש עודכן בהצלחה." });
    } else {
      res.status(404).json({ message: "המשתמש לא נמצא." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
