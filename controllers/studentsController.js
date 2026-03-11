const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY full_name');
    res.render('students/list', { students: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.newForm = (req, res) => {
  res.render('students/form', { student: {}, action: '/students' });
};

exports.create = async (req, res) => {
  const { student_id, full_name } = req.body;
  try {
    await db.query('INSERT INTO students (student_id, full_name) VALUES (?, ?)', [student_id, full_name]);
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.editForm = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Student not found');
    }
    res.render('students/form', { student: rows[0], action: `/students/${req.params.id}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.update = async (req, res) => {
  const { student_id, full_name } = req.body;
  try {
    await db.query('UPDATE students SET student_id=?, full_name=? WHERE id=?', [student_id, full_name, req.params.id]);
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM students WHERE id=?', [req.params.id]);
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};
