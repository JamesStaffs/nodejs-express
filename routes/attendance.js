const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// list attendance entries for a class schedule
router.get('/schedule/:scheduleId', attendanceController.listForSchedule);
// show register form
router.get('/schedule/:scheduleId/register', attendanceController.registerForm);
// save attendance
router.post('/schedule/:scheduleId/register', attendanceController.saveAttendance);

module.exports = router;
