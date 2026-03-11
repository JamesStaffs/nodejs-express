const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses ORDER BY code');
    res.render('courses/list', { courses: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.newForm = (req, res) => {
  res.render('courses/form', { course: {}, action: '/courses' });
};

exports.create = async (req, res) => {
  const { code, title } = req.body;
  try {
    await db.query('INSERT INTO courses (code, title) VALUES (?, ?)', [code, title]);
    res.redirect('/courses');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.editForm = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Course not found');
    }
    res.render('courses/form', { course: rows[0], action: `/courses/${req.params.id}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.update = async (req, res) => {
  const { code, title } = req.body;
  try {
    await db.query('UPDATE courses SET code=?, title=? WHERE id=?', [code, title, req.params.id]);
    res.redirect('/courses');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM courses WHERE id=?', [req.params.id]);
    res.redirect('/courses');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};
