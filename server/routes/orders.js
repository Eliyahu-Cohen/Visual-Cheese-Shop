
const express = require("express");
const router = express.Router();
const db = require("../db");
const sendEmail = require("./mail"); // עדכן את הנתיב למיקום הקובץ


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

router.get("/:orderId/products", async (req, res) => {
  try {
    const { orderId } = req.params;

    // שליפת פרטי המוצרים להזמנה מסוימת
    const [products] = await db.query(
      `
      SELECT 
        id, 
        order_id, 
        product_id, 
        product_name, 
        product_price, 
        quantity
      FROM 
        order_products
      WHERE 
        order_id = ?
      `,
      [orderId]
    );

    res.json(products);
  } catch (error) {
    console.error("שגיאה בשליפת פרטי המוצרים:", error);
    res.status(500).json({
      message: "שגיאה בשליפת פרטי המוצרים",
      error: error.message,
    });
  }
});


// שמירת הזמנה
router.post("/", async (req, res) => {
  const { userId, username, phone, totalPrice, items } = req.body;

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


       // עדכון טבלת monthly_sales
       const currentDate = new Date();
       const year = currentDate.getFullYear();
       const month = currentDate.getMonth() + 1;
   
       for (const item of items) {
         const { id: productId, quantity } = item;
   
         // בדוק אם יש כבר רשומה לחודש ולמוצר זה
         const [existingRecord] = await db.query(
           "SELECT * FROM monthly_sales WHERE product_id = ? AND year = ? AND month = ?",
           [productId, year, month]
         );
   
         if (existingRecord.length > 0) {
           // עדכון רשומה קיימת
           await db.query(
             "UPDATE monthly_sales SET total_quantity = total_quantity + ? WHERE product_id = ? AND year = ? AND month = ?",
             [quantity, productId, year, month]
           );
         } else {
           // יצירת רשומה חדשה
           await db.query(
             "INSERT INTO monthly_sales (product_id, year, month, total_quantity) VALUES (?, ?, ?, ?)",
             [productId, year, month, quantity]
           );
         }
       }
   

    // שליחת מייל לנמען
    const emailSubject = "תודה על ביצוע ההזמנה!";
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="he" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>תודה על ההזמנה</title>
      </head>
      <body style="font-family: Arial, sans-serif; direction: rtl; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
            <h1>תודה על ההזמנה שלך!</h1>
          </div>
          <div style="padding: 20px; text-align: right;">
            <p>שלום ${username},</p>
            <p> ההזמנה שלך נשמרה במערכת.</p>
            <p>תודה שבחרת בנו!</p>
            <p><strong>מספר הזמנה:</strong> ${orderId}</p>
            <p><strong>סה"כ לתשלום:</strong> ₪${totalPrice.toFixed(2)}</p>
            <p>   אנו עובדים כעת על הזמנתך !</p>
            <p>נשמח לראות אותך שוב בקרוב!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const to ="alyiu0504142151@gmail.com"

    try {
      await sendEmail(to, emailSubject, "", emailHtml);
    } catch (error) {
      console.error("שגיאה בשליחת המייל:", error);
    }

    res.json({ message: "ההזמנה נשמרה בהצלחה", orderId });
  } catch (error) {
    console.error("שגיאה בשמירת ההזמנה:", error);
    res.status(500).json({ message: "שגיאה בשמירת ההזמנה" });
  }
});

// // שמירת הזמנה
// router.post("/", upload.single("file"), async (req, res) => {
//   const { userId, username, phone, totalPrice, items } = req.body;
//   const uploadedFile = req.file; // הקובץ שצורף


//   try {
//     // שמירת ההזמנה בטבלה
//     const [orderResult] = await db.query(
//       "INSERT INTO orders (user_id, username, phone, total_price, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
//       [userId, username, phone, totalPrice, "בהמתנה"]
//     );
//     const orderId = orderResult.insertId;

//     // שמירת הפריטים בטבלת order_products
//     const orderItems = items.map((item) => [
//       orderId,
//       item.id,
//       item.name,
//       item.regularPrice,
//       item.quantity,
//     ]);

//     await db.query(
//       "INSERT INTO order_products (order_id, product_id, product_name, product_price, quantity) VALUES ?",
//       [orderItems]
//     );


//        // עדכון טבלת monthly_sales
//        const currentDate = new Date();
//        const year = currentDate.getFullYear();
//        const month = currentDate.getMonth() + 1;
   
//        for (const item of items) {
//          const { id: productId, quantity } = item;
   
//          // בדוק אם יש כבר רשומה לחודש ולמוצר זה
//          const [existingRecord] = await db.query(
//            "SELECT * FROM monthly_sales WHERE product_id = ? AND year = ? AND month = ?",
//            [productId, year, month]
//          );
   
//          if (existingRecord.length > 0) {
//            // עדכון רשומה קיימת
//            await db.query(
//              "UPDATE monthly_sales SET total_quantity = total_quantity + ? WHERE product_id = ? AND year = ? AND month = ?",
//              [quantity, productId, year, month]
//            );
//          } else {
//            // יצירת רשומה חדשה
//            await db.query(
//              "INSERT INTO monthly_sales (product_id, year, month, total_quantity) VALUES (?, ?, ?, ?)",
//              [productId, year, month, quantity]
//            );
//          }
//        }
   

//     // שליחת מייל לנמען
//     const emailSubject = "תודה על ביצוע ההזמנה!";
//     const emailHtml = `
//       <!DOCTYPE html>
//       <html lang="he" dir="rtl">
//       <head>
//         <meta charset="UTF-8">
//         <title>תודה על ההזמנה</title>
//       </head>
//       <body style="font-family: Arial, sans-serif; direction: rtl; background-color: #f9f9f9; padding: 20px;">
//         <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
//           <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
//             <h1>תודה על ההזמנה שלך!</h1>
//           </div>
//           <div style="padding: 20px; text-align: right;">
//             <p>שלום ${username},</p>
//             <p> ההזמנה שלך נשמרה במערכת.</p>
//             <p>תודה שבחרת בנו!</p>
//             <p><strong>מספר הזמנה:</strong> ${orderId}</p>
//             <p><strong>סה"כ לתשלום:</strong> ₪${totalPrice.toFixed(2)}</p>
//             <p>   אנו עובדים כעת על הזמנתך !</p>
//             <p>נשמח לראות אותך שוב בקרוב!</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//     const attachments = uploadedFile

//     const to ="alyiu0504142151@gmail.com"

//     try {
//       await sendEmail(to, emailSubject, "", emailHtml,attachments);
//     } catch (error) {
//       console.error("שגיאה בשליחת המייל:", error);
//     }

//     res.json({ message: "ההזמנה נשמרה בהצלחה", orderId });
//   } catch (error) {
//     console.error("שגיאה בשמירת ההזמנה:", error);
//     res.status(500).json({ message: "שגיאה בשמירת ההזמנה" });
//   }
// });

// router.get("/user-details/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [user] = await db.query(
//       "SELECT id, username, email, phone, address, userType, created_at FROM users WHERE id = ?",
//       [id]
//     );

//     if (!user.length) {
//       return res.status(404).json({ message: "משתמש לא נמצא" });
//     }

//     res.json(user[0]);
//   } catch (error) {
//     console.error("שגיאה בשליפת פרטי המשתמש:", error);
//     res
//       .status(500)
//       .json({ message: "שגיאה בשליפת פרטי המשתמש", error: error.message });
//   }
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "הזמנה לא נמצאה" });
    }

    res.json({ message: "סטטוס ההזמנה עודכן בהצלחה" });
  } catch (error) {
    console.error("שגיאה בעדכון הסטטוס:", error);
    res
      .status(500)
      .json({ message: "שגיאה בעדכון הסטטוס", error: error.message });
  }
});




// שליפת כמות מוצרים לפי חודש ושנה
router.get("/sales", async (req, res) => {
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ message: "יש לספק שנה וחודש" });
  }

  try {
    const [results] = await db.query(
      `
      SELECT 
        ms.product_id, 
        p.name, 
        p.manufacturer, 
        p.price, 
        p.imageUrl, 
        ms.total_quantity
      FROM 
        monthly_sales ms
      JOIN 
        products p 
      ON 
        ms.product_id = p.id
      WHERE 
        ms.year = ? AND ms.month = ?
      ORDER BY 
        ms.total_quantity DESC
      `,
      [year, month]
    );

    res.json(results);
  } catch (error) {
    console.error("שגיאה בשליפת הנתונים:", error);
    res.status(500).json({ message: "שגיאה בשליפת הנתונים" });
  }
});


module.exports = router;
