const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT e.id, s.full_name AS student_name, c.code AS course_code, c.title AS course_title
       FROM enrollments e
       JOIN students s ON e.student_id = s.id
       JOIN courses c ON e.course_id = c.id
       ORDER BY s.full_name`
    );
    res.render('enrollments/list', { enrollments: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.newForm = async (req, res) => {
  try {
    const [students] = await db.query('SELECT id, full_name FROM students ORDER BY full_name');
    const [courses] = await db.query('SELECT id, code, title FROM courses ORDER BY code');
    res.render('enrollments/form', { enrollment: {}, students, courses, action: '/enrollments' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.create = async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    await db.query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    res.redirect('/enrollments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.editForm = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM enrollments WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Enrollment not found');
    }
    const enrollment = rows[0];
    const [students] = await db.query('SELECT id, full_name FROM students ORDER BY full_name');
    const [courses] = await db.query('SELECT id, code, title FROM courses ORDER BY code');
    res.render('enrollments/form', { enrollment, students, courses, action: `/enrollments/${req.params.id}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.update = async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    await db.query('UPDATE enrollments SET student_id=?, course_id=? WHERE id=?', [student_id, course_id, req.params.id]);
    res.redirect('/enrollments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM enrollments WHERE id=?', [req.params.id]);
    res.redirect('/enrollments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};
