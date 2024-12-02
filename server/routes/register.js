
// const express = require("express");
// const router = express.Router();
// const db = require("../db"); // חיבור למסד הנתונים

// router.post("/register", async (req, res) => {
//   const { username, password, email, address, phone } = req.body;

//   try {
//     // בדיקה אם המשתמש כבר קיים לפי שם משתמש או טלפון
//     const [existingUser] = await db.query(
//       "SELECT * FROM users WHERE username = ? OR phone = ?",
//       [username, phone]
//     );

//     if (existingUser) {
//       return res.status(400).json({ message: "המשתמש או מספר הטלפון כבר קיימים." });
//     }

//     // הוספת משתמש חדש
//     const result = await db.query(
//       "INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)",
//       [username, password, email, address, phone]
//     );

//     if (result.affectedRows > 0) {
//       res.json({ message: "משתמש נרשם בהצלחה." });
//     } else {
//       res.status(500).json({ message: "שגיאה ברישום המשתמש." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "שגיאה בשרת." });
//   }
// });

// module.exports = router;


