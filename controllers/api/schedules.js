const db = require('../../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT sch.id, st.full_name AS staff_name, c.code AS course_code, c.title AS course_title, sch.scheduled_at
       FROM schedules sch
       JOIN staff st ON sch.staff_id = st.id
       JOIN courses c ON sch.course_id = c.id
       ORDER BY sch.scheduled_at`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM schedules WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Schedule not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { staff_id, course_id, scheduled_at } = req.body;
  try {
    const [result] = await db.query('INSERT INTO schedules (staff_id, course_id, scheduled_at) VALUES (?, ?, ?)', [staff_id, course_id, scheduled_at]);
    res.status(201).json({ id: result.insertId, staff_id, course_id, scheduled_at });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { staff_id, course_id, scheduled_at } = req.body;
  try {
    await db.query('UPDATE schedules SET staff_id=?, course_id=?, scheduled_at=? WHERE id=?', [staff_id, course_id, scheduled_at, req.params.id]);
    res.json({ id: req.params.id, staff_id, course_id, scheduled_at });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM schedules WHERE id=?', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};