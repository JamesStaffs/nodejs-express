const db = require('../../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses ORDER BY code');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Course not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { code, title } = req.body;
  try {
    const [result] = await db.query('INSERT INTO courses (code, title) VALUES (?, ?)', [code, title]);
    res.status(201).json({ id: result.insertId, code, title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { code, title } = req.body;
  try {
    await db.query('UPDATE courses SET code=?, title=? WHERE id=?', [code, title, req.params.id]);
    res.json({ id: req.params.id, code, title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM courses WHERE id=?', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};