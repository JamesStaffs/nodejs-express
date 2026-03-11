const express = require('express');
const router = express.Router();

const studentsController = require('../../controllers/api/students');
const coursesController = require('../../controllers/api/courses');
const staffController = require('../../controllers/api/staff');
const enrollmentsController = require('../../controllers/api/enrollments');
const schedulesController = require('../../controllers/api/schedules');
const attendanceController = require('../../controllers/api/attendance');

// Students
router.get('/students', studentsController.list);
router.get('/students/:id', studentsController.get);
router.post('/students', studentsController.create);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.delete);

// Courses
router.get('/courses', coursesController.list);
router.get('/courses/:id', coursesController.get);
router.post('/courses', coursesController.create);
router.put('/courses/:id', coursesController.update);
router.delete('/courses/:id', coursesController.delete);

// Staff
router.get('/staff', staffController.list);
router.get('/staff/:id', staffController.get);
router.post('/staff', staffController.create);
router.put('/staff/:id', staffController.update);
router.delete('/staff/:id', staffController.delete);

// Enrollments
router.get('/enrollments', enrollmentsController.list);
router.get('/enrollments/:id', enrollmentsController.get);
router.post('/enrollments', enrollmentsController.create);
router.put('/enrollments/:id', enrollmentsController.update);
router.delete('/enrollments/:id', enrollmentsController.delete);

// Schedules
router.get('/schedules', schedulesController.list);
router.get('/schedules/:id', schedulesController.get);
router.post('/schedules', schedulesController.create);
router.put('/schedules/:id', schedulesController.update);
router.delete('/schedules/:id', schedulesController.delete);

// Attendance
router.get('/attendance/schedule/:scheduleId', attendanceController.listForSchedule);
router.post('/attendance/schedule/:scheduleId', attendanceController.saveAttendance);

module.exports = router;