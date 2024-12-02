const express = require('express');
const router = express.Router();
const db = require('../db');

// שליפת כל תתי-הקטגוריות
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM subcategories');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// יצירת תת-קטגוריה חדשה
router.post('/', async (req, res) => {
  const { name, category_id } = req.body;
  try {
    const [result] = await db.query('INSERT INTO subcategories (name, category_id) VALUES (?, ?)', [name, category_id]);
    res.json({ id: result.insertId, name, category_id });
  } catch (err) {
    console.error("Error adding subcategory:", err);
    res.status(500).json({ error: err.message });
  }
});

// עדכון תת-קטגוריה קיימת
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;
  try {
    await db.query('UPDATE subcategories SET name = ?, category_id = ? WHERE id = ?', [name, category_id, id]);
    res.json({ message: `Subcategory ${id} updated`, name, category_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// מחיקת תת-קטגוריה
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM subcategories WHERE id = ?', [id]);
    res.json({ message: `Subcategory ${id} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
