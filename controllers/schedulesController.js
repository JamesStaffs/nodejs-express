const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT sch.id, st.full_name AS staff_name, c.code AS course_code, c.title AS course_title, sch.scheduled_at
       FROM schedules sch
       JOIN staff st ON sch.staff_id = st.id
       JOIN courses c ON sch.course_id = c.id
       ORDER BY sch.scheduled_at`
    );
    res.render('schedules/list', { schedules: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.newForm = async (req, res) => {
  try {
    const [staff] = await db.query('SELECT id, full_name FROM staff ORDER BY full_name');
    const [courses] = await db.query('SELECT id, code, title FROM courses ORDER BY code');
    res.render('schedules/form', { schedule: {}, staff, courses, action: '/schedules' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.create = async (req, res) => {
  const { staff_id, course_id, scheduled_at } = req.body;
  try {
    await db.query('INSERT INTO schedules (staff_id, course_id, scheduled_at) VALUES (?, ?, ?)', [staff_id, course_id, scheduled_at]);
    res.redirect('/schedules');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.editForm = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM schedules WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Schedule not found');
    }
    const schedule = rows[0];
    const [staff] = await db.query('SELECT id, full_name FROM staff ORDER BY full_name');
    const [courses] = await db.query('SELECT id, code, title FROM courses ORDER BY code');
    res.render('schedules/form', { schedule, staff, courses, action: `/schedules/${req.params.id}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.update = async (req, res) => {
  const { staff_id, course_id, scheduled_at } = req.body;
  try {
    await db.query('UPDATE schedules SET staff_id=?, course_id=?, scheduled_at=? WHERE id=?', [staff_id, course_id, scheduled_at, req.params.id]);
    res.redirect('/schedules');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM schedules WHERE id=?', [req.params.id]);
    res.redirect('/schedules');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};
