const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM staff ORDER BY full_name');
    res.render('staff/list', { staff: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.newForm = (req, res) => {
  res.render('staff/form', { person: {}, action: '/staff' });
};

exports.create = async (req, res) => {
  const { staff_id, full_name } = req.body;
  try {
    await db.query('INSERT INTO staff (staff_id, full_name) VALUES (?, ?)', [staff_id, full_name]);
    res.redirect('/staff');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.editForm = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM staff WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Staff member not found');
    }
    res.render('staff/form', { person: rows[0], action: `/staff/${req.params.id}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.update = async (req, res) => {
  const { staff_id, full_name } = req.body;
  try {
    await db.query('UPDATE staff SET staff_id=?, full_name=? WHERE id=?', [staff_id, full_name, req.params.id]);
    res.redirect('/staff');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM staff WHERE id=?', [req.params.id]);
    res.redirect('/staff');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

// show schedule for a particular staff member
exports.schedule = async (req, res) => {
  const staffId = req.params.id;
  try {
    const [[person]] = await db.query('SELECT * FROM staff WHERE id=?', [staffId]);
    if (!person) return res.status(404).send('Staff member not found');
    const [rows] = await db.query(
      `SELECT sch.id, c.code AS course_code, c.title AS course_title, sch.scheduled_at
       FROM schedules sch
       JOIN courses c ON sch.course_id = c.id
       WHERE sch.staff_id = ?
       ORDER BY sch.scheduled_at`,
      [staffId]
    );
    res.render('staff/schedule', { person, schedules: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};
