const db = require('../config/db');

// show attendance for a scheduled class
exports.listForSchedule = async (req, res) => {
  const scheduleId = req.params.scheduleId;
  try {
    const [rows] = await db.query(
      `SELECT a.id, s.full_name AS student_name, a.present
       FROM attendance a
       JOIN enrollments e ON a.enrollment_id = e.id
       JOIN students s ON e.student_id = s.id
       WHERE a.schedule_id = ?
       ORDER BY s.full_name`,
      [scheduleId]
    );
    res.render('attendance/list', { attendance: rows, scheduleId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

// show a register form (checkboxes) for a schedule
exports.registerForm = async (req, res) => {
  const scheduleId = req.params.scheduleId;
  try {
    // load schedule along with names
    const [[schedule]] = await db.query(
      `SELECT sch.*, st.full_name AS staff_name, c.code AS course_code, c.title AS course_title
       FROM schedules sch
       JOIN staff st ON sch.staff_id = st.id
       JOIN courses c ON sch.course_id = c.id
       WHERE sch.id = ?`,
      [scheduleId]
    );
    if (!schedule) return res.status(404).send('Schedule not found');

    // find all enrollments for the course of this schedule
    const [enrollments] = await db.query(
      `SELECT e.id AS enrollment_id, s.full_name AS student_name
       FROM enrollments e
       JOIN students s ON e.student_id = s.id
       WHERE e.course_id = ?
       ORDER BY s.full_name`,
      [schedule.course_id]
    );

    // load existing attendance entries if any
    const [existing] = await db.query(
      'SELECT * FROM attendance WHERE schedule_id = ?',
      [scheduleId]
    );
    const attendanceMap = {};
    existing.forEach(a => {
      attendanceMap[a.enrollment_id] = a.present;
    });

    res.render('attendance/register', { schedule, enrollments, attendanceMap, action: `/attendance/schedule/${scheduleId}/register` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

// save attendance posted
exports.saveAttendance = async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const presentIds = req.body.present || [];
  // presentIds may be string or array
  const presentSet = new Set(Array.isArray(presentIds) ? presentIds : [presentIds]);
  try {
    // fetch all enrollments for course to ensure entries exist
    const [[schedule]] = await db.query('SELECT * FROM schedules WHERE id=?', [scheduleId]);
    if (!schedule) return res.status(404).send('Schedule not found');
    const [enrollments] = await db.query('SELECT id FROM enrollments WHERE course_id=?', [schedule.course_id]);
    // upsert attendance
    for (const e of enrollments) {
      const present = presentSet.has(String(e.id));
      // check if row exists
      const [rows] = await db.query(
        'SELECT id FROM attendance WHERE schedule_id=? AND enrollment_id=?',
        [scheduleId, e.id]
      );
      if (rows.length > 0) {
        await db.query('UPDATE attendance SET present=? WHERE id=?', [present, rows[0].id]);
      } else {
        await db.query('INSERT INTO attendance (schedule_id, enrollment_id, present) VALUES (?, ?, ?)', [scheduleId, e.id, present]);
      }
    }
    res.redirect(`/attendance/schedule/${scheduleId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};
