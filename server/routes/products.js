const express = require('express');
const router = express.Router();
const db = require('../db'); // וודא שהנתיב נכון בהתאם למיקום של db.js

// // שליפת כל המוצרים
// router.get('/', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM products');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// שליפת כל המוצרים, עם אפשרות לסינון לפי mainCategoryId ו/או subCategoryId


// router.get('/', async (req, res) => {
//   const { mainCategoryId, subCategoryId } = req.query; // קבלת פרמטרים מהבקשה
//   let query = 'SELECT * FROM products';
//   const params = [];

//   // הוספת תנאים בהתאם לפרמטרים שקיימים
//   if (mainCategoryId) {
//     query += ' WHERE mainCategoryId = ?';
//     params.push(mainCategoryId);
//   }
//   if (subCategoryId) {
//     query += mainCategoryId ? ' AND' : ' WHERE';
//     query += ' subCategoryId = ?';
//     params.push(subCategoryId);
//   }

//   try {
//     const [rows] = await db.query(query, params); // הרצת השאילתה עם הפרמטרים
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.get('/', async (req, res) => {
  const { mainCategoryId, subCategoryId } = req.query; // קבלת פרמטרים מהבקשה
  let query = 'SELECT * FROM products';
  const params = [];

  // הוספת תנאים בהתאם לפרמטרים שקיימים
  if (mainCategoryId) {
    query += ' WHERE mainCategoryId = ?';
    params.push(mainCategoryId);
  }
  if (subCategoryId) {
    query += mainCategoryId ? ' AND' : ' WHERE';
    query += ' subCategoryId = ?';
    params.push(subCategoryId);
  }

  try {
    const [rows] = await db.query(query, params); // הרצת השאילתה עם הפרמטרים
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// הוספת מוצר חדש
router.post('/', async (req, res) => {  
  const { manufacturer, name, regularPrice, businessPrice, imageUrl, weight, unitsPerCarton, barcode, sku, isOnSale, isNew, subCategoryId, mainCategoryId } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO products (manufacturer, name, regularPrice, businessPrice, imageUrl, weight, unitsPerCarton, barcode, sku, isOnSale, isNew, subCategoryId, mainCategoryId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [manufacturer, name, regularPrice, businessPrice, imageUrl, weight, unitsPerCarton, barcode, sku, isOnSale, isNew, subCategoryId, mainCategoryId]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ error: err.message });
  }
});



// עדכון מוצר קיים
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { manufacturer, name, regularPrice, businessPrice, imageUrl, weight, unitsPerCarton, barcode, sku, isOnSale, isNew, subCategoryId } = req.body;

  try {
    await db.query(
      `UPDATE products 
       SET manufacturer = ?, name = ?, regularPrice = ?, businessPrice = ?, imageUrl = ?, weight = ?, unitsPerCarton = ?, barcode = ?, sku = ?, isOnSale = ?, isNew = ?, subCategoryId = ?
       WHERE id = ?`,
      [manufacturer, name, regularPrice, businessPrice, imageUrl, weight, unitsPerCarton, barcode, sku, isOnSale, isNew, subCategoryId, id]
    );
    res.status(200).json({ message: `Product ${id} updated successfully`, ...req.body });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// מחיקת מוצר
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.status(200).json({ message: `Product ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});


// חיפוש מוצרים לפי שם
router.get('/search', async (req, res) => {
  const { name } = req.query; // מקבל את שם המוצר מהבקשה
  try {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE name LIKE ? LIMIT 10', 
      [`%${name}%`]
    ); // חיפוש מוצרים המכילים את הטקסט
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


module.exports = router;
