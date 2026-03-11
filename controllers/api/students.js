const db = require('../../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY full_name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { student_id, full_name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO students (student_id, full_name) VALUES (?, ?)', [student_id, full_name]);
    res.status(201).json({ id: result.insertId, student_id, full_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { student_id, full_name } = req.body;
  try {
    await db.query('UPDATE students SET student_id=?, full_name=? WHERE id=?', [student_id, full_name, req.params.id]);
    res.json({ id: req.params.id, student_id, full_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM students WHERE id=?', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};