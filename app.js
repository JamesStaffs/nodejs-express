// app.js - main entry point

require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');
const staffRouter = require('./routes/staff');
const coursesRouter = require('./routes/courses');
const enrollmentsRouter = require('./routes/enrollments');
const schedulesRouter = require('./routes/schedules');
const attendanceRouter = require('./routes/attendance');
const apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/staff', staffRouter);
app.use('/courses', coursesRouter);
app.use('/enrollments', enrollmentsRouter);
app.use('/schedules', schedulesRouter);
app.use('/attendance', attendanceRouter);
app.use('/api', apiRouter);

// error handler
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
