

const express = require('express');
const router = express.Router();
const db = require('../db'); // התחברות למסד הנתונים


router.get('/', async (req, res) => {
  const { mainCategoryId, subCategoryId, isNew, isOnSale } = req.query; // פרמטרים מכתובת ה-URL
  let query = 'SELECT * FROM products';
  const params = [];

  // הוספת תנאים לפי פרמטרים
  const conditions = [];
  
  if (mainCategoryId) {
    conditions.push('mainCategoryId = ?');
    params.push(mainCategoryId);
  }
  
  if (subCategoryId) {
    conditions.push('subCategoryId = ?');
    params.push(subCategoryId);
  }
  
  if (isNew === 'true') {
    conditions.push('isNew = 1');
  }
  
  if (isOnSale === 'true') {
    conditions.push('isOnSale = 1');
  }

  // חיבור התנאים לשאילתה
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  try {
    const [rows] = await db.query(query, params); // ביצוע השאילתה
    res.json(rows); // שליחת התוצאות
  } catch (err) {
    res.status(500).json({ error: err.message }); // טיפול בשגיאה
  }
});


// **הוספת מוצר חדש**
router.post('/', async (req, res) => {
  const {
    manufacturer, name, regularPrice, businessPrice, imageUrl,
    weight, unitsPerCarton, sku, isOnSale, isNew, subCategoryId, mainCategoryId
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO products (manufacturer, name, regularPrice, businessPrice, imageUrl, weight, 
      unitsPerCarton, sku, isOnSale, isNew, subCategoryId, mainCategoryId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [manufacturer, name, regularPrice, businessPrice, imageUrl, weight,
        unitsPerCarton, sku, isOnSale, isNew, subCategoryId, mainCategoryId]
    );
    res.status(201).json({ id: result.insertId, ...req.body }); // החזרת מזהה המוצר החדש
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// **עדכון מוצר קיים**
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    manufacturer, name, regularPrice, businessPrice, imageUrl,
    weight, unitsPerCarton, sku, isOnSale, isNew, subCategoryId, mainCategoryId
  } = req.body;

  try {
    await db.query(
      `UPDATE products 
       SET manufacturer = ?, name = ?, regularPrice = ?, businessPrice = ?, imageUrl = ?, weight = ?, 
       unitsPerCarton = ?, sku = ?, isOnSale = ?, isNew = ?, subCategoryId = ?, mainCategoryId = ?
       WHERE id = ?`,
      [manufacturer, name, regularPrice, businessPrice, imageUrl, weight,
        unitsPerCarton, sku, isOnSale, isNew, subCategoryId, mainCategoryId, id]
    );
    res.status(200).json({ message: `Product ${id} updated successfully`, ...req.body });
  } catch (err) {
    console.error("Error updating product:", err.message); // לוג לשגיאה
    res.status(500).json({ error: "Failed to update product" });
  }
});


// **מחיקת מוצר**
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

// **חיפוש מוצרים לפי שם**
router.get('/search', async (req, res) => {
  const { name } = req.query; // שם המוצר מהבקשה
  try {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE name LIKE ? LIMIT 10',
      [`%${name}%`] // התאמת שם המוצר לחיפוש
    );
    res.json(rows); // החזרת תוצאות
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// **שליפת מוצר לפי ID**
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]); // החזרת המוצר
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
