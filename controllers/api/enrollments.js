const db = require('../../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT e.id, s.full_name AS student_name, c.code AS course_code, c.title AS course_title
       FROM enrollments e
       JOIN students s ON e.student_id = s.id
       JOIN courses c ON e.course_id = c.id
       ORDER BY s.full_name`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM enrollments WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Enrollment not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    const [result] = await db.query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    res.status(201).json({ id: result.insertId, student_id, course_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    await db.query('UPDATE enrollments SET student_id=?, course_id=? WHERE id=?', [student_id, course_id, req.params.id]);
    res.json({ id: req.params.id, student_id, course_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM enrollments WHERE id=?', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};