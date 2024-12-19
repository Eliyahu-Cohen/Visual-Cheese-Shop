const express = require("express");
const router = express.Router();
const db = require("../db"); // חיבור למסד הנתונים

router.get("/", async (req, res) => {
    const { year, month } = req.query;
  
    try {
      const [rows] = await db.query(
        `SELECT 
           p.name, 
           p.sku, 
           ms.year, 
           ms.month, 
           ms.total_quantity 
         FROM 
           monthly_sales ms
         JOIN 
           products p ON ms.product_id = p.id
         WHERE 
           ms.year = ? AND ms.month = ?`,
        [year, month]
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching sales data:", error.message);
      res.status(500).json({ error: "Failed to fetch sales data" });
    }
  });
  

module.exports = router;
