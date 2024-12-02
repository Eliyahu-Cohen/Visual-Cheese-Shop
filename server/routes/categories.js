

const express = require('express');
const router = express.Router();
const db = require('../db');

// שליפת כל הקטגוריות
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');    
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (err) {
    console.error("Error adding category:", err); // הדפסת השגיאה בקונסולה
    res.status(500).json({ error: err.message });
  }
});


// עדכון קטגוריה קיימת
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    res.json({ message: `Category ${id} updated`, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// מחיקת קטגוריה
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ message: `Category ${id} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

