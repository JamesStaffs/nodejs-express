const db = require('../../config/db');

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
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveAttendance = async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const { attendance } = req.body; // expect { enrollment_id: present }
  try {
    for (const [enrollmentId, present] of Object.entries(attendance)) {
      const [rows] = await db.query('SELECT id FROM attendance WHERE schedule_id=? AND enrollment_id=?', [scheduleId, enrollmentId]);
      if (rows.length > 0) {
        await db.query('UPDATE attendance SET present=? WHERE id=?', [present, rows[0].id]);
      } else {
        await db.query('INSERT INTO attendance (schedule_id, enrollment_id, present) VALUES (?, ?, ?)', [scheduleId, enrollmentId, present]);
      }
    }
    res.status(200).json({ message: 'Attendance saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};