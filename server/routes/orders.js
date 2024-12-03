// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // יצירת הזמנה חדשה
// router.post('/orders', async (req, res) => {
//   const { username, phone, totalPrice, products, status } = req.body;

//   try {
//     const [result] = await db.query(
//       'INSERT INTO orders (username, phone, total_price, status) VALUES (?, ?, ?, ?)',
//       [username, phone, totalPrice, status]
//     );

//     const orderId = result.insertId;

//     const productData = products.map((product) => [
//       orderId,
//       product.productId,
//       product.productName,
//       product.barcode,
//       product.quantity,
//       product.price,
//       product.total,
//     ]);

//     await db.query(
//       `INSERT INTO order_products
//       (order_id, product_id, product_name, barcode, quantity, price, total)
//       VALUES ?`,
//       [productData]
//     );

//     res.status(201).json({ message: 'ההזמנה נשמרה בהצלחה', orderId });
//   } catch (err) {
//     console.error('Database Error:', err);
//     res.status(500).json({ message: 'שגיאה בשמירת ההזמנה', error: err.message });
//   }
// });

// // קבלת היסטוריית הזמנות לפי משתמש
// router.get('/orders/:username', async (req, res) => {
//   const { username } = req.params;

//   try {
//     const [orders] = await db.query(
//       `SELECT o.id, o.total_price, o.status, op.product_name, op.quantity, op.price
//       FROM orders o
//       JOIN order_products op ON o.id = op.order_id
//       WHERE o.username = ?`,
//       [username]
//     );

//     res.json(orders);
//   } catch (err) {
//     console.error('Database Error:', err);
//     res.status(500).json({ message: 'שגיאה בשליפת ההיסטוריה', error: err.message });
//   }
// });

// קבלת היסטוריית הזמנות לפי משתמש

// קבלת היסטוריית הזמנות לפי משתמש
// router.get('/history/:userId', async (req, res) => {
//     const { userId } = req.params;
//     try {
//       const [orders] = await db.query(`
//         SELECT o.id, o.total_price, o.status, o.created_at,
//                GROUP_CONCAT(op.product_name SEPARATOR ', ') AS products
//         FROM orders o
//         LEFT JOIN order_products op ON o.id = op.order_id
//         WHERE o.user_id = ?
//         GROUP BY o.id
//         ORDER BY o.created_at DESC
//       `, [userId]);
//       res.json(orders);
//     } catch (err) {
//       console.error('Database Error:', err);
//       res.status(500).json({ message: 'שגיאה בשליפת היסטוריית ההזמנות', error: err.message });
//     }
//   });

//   // קבלת רשימת הזמנות (ניהול על ידי מנהל)
//   router.get('/admin/orders', async (req, res) => {
//     try {
//       const [orders] = await db.query(`
//         SELECT o.id, o.username, o.phone, o.total_price, o.status,
//                GROUP_CONCAT(op.product_name SEPARATOR ', ') AS products
//         FROM orders o
//         LEFT JOIN order_products op ON o.id = op.order_id
//         GROUP BY o.id
//       `);
//       res.json(orders);
//     } catch (err) {
//       console.error('Database Error:', err);
//       res.status(500).json({ message: 'שגיאה בשליפת ההזמנות', error: err.message });
//     }
//   });

//   // עדכון סטטוס הזמנה (ניהול על ידי מנהל)
//   router.put('/admin/orders/:id', async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     try {
//       const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'הזמנה לא נמצאה' });
//       }

//       res.json({ message: 'סטטוס ההזמנה עודכן בהצלחה' });
//     } catch (err) {
//       console.error('Database Error:', err);
//       res.status(500).json({ message: 'שגיאה בעדכון הסטטוס', error: err.message });
//     }
//   });
//   // עדכון סטטוס הזמנה (מנהל)
//   router.put('/:orderId/status', async (req, res) => {
//     const { orderId } = req.params;
//     const { status } = req.body;
//     try {
//       const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'הזמנה לא נמצאה' });
//       }
//       res.json({ message: 'סטטוס ההזמנה עודכן בהצלחה' });
//     } catch (err) {
//       console.error('Database Error:', err);
//       res.status(500).json({ message: 'שגיאה בעדכון הסטטוס', error: err.message });
//     }
//   });

// module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    // שליפת כל ההזמנות
    const [orders] = await db.query(`
 SELECT 
    o.id AS order_id, 
    o.user_id, 
    o.username, 
    o.phone, 
    o.total_price, 
    o.status, 
    o.created_at,
    GROUP_CONCAT(CONCAT(op.product_name, ' (x', op.quantity, ')') SEPARATOR ', ') AS products
FROM 
    orders o
LEFT JOIN 
    order_products op 
ON 
    o.id = op.order_id
GROUP BY 
    o.id, o.user_id, o.username, o.phone, o.total_price, o.status, o.created_at
ORDER BY 
    o.created_at DESC

    `);
  

    res.json(orders);
  } catch (error) {
    console.error("שגיאה בשליפת ההזמנות:", error);
    res
      .status(500)
      .json({ message: "שגיאה בשליפת ההזמנות", error: error.message });
  }
});


// שמירת הזמנה
router.post("/", async (req, res) => {
  const { userId, username, phone, totalPrice, items } = req.body;
  console.log(userId, username, phone, totalPrice, items);

  try {
    // שמירת ההזמנה בטבלה
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, username, phone, total_price, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [userId, username, phone, totalPrice, "בהמתנה"]
    );
    const orderId = orderResult.insertId;

    // שמירת הפריטים בטבלת order_products
    const orderItems = items.map((item) => [
      orderId,
      item.id,
      item.name,
      item.regularPrice,
      item.quantity,
    ]);

    await db.query(
      "INSERT INTO order_products (order_id, product_id, product_name, product_price, quantity) VALUES ?",
      [orderItems]
    );

    res.json({ message: "ההזמנה נשמרה בהצלחה", orderId });
  } catch (error) {
    console.error("שגיאה בשמירת ההזמנה:", error);
    res.status(500).json({ message: "שגיאה בשמירת ההזמנה" });
  }
});


router.get("/user-details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.query(
      "SELECT id, username, email, phone, address, userType, created_at FROM users WHERE id = ?",
      [id]
    );

    if (!user.length) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    res.json(user[0]);
  } catch (error) {
    console.error("שגיאה בשליפת פרטי המשתמש:", error);
    res.status(500).json({ message: "שגיאה בשליפת פרטי המשתמש", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "הזמנה לא נמצאה" });
    }

    res.json({ message: "סטטוס ההזמנה עודכן בהצלחה" });
  } catch (error) {
    console.error("שגיאה בעדכון הסטטוס:", error);
    res.status(500).json({ message: "שגיאה בעדכון הסטטוס", error: error.message });
  }
});


module.exports = router;
