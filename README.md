# Class Register Application (Node.js + Express + Vue.js)

This repository contains a sample multi-page application built with Node.js, Express, and Vue.js (included via CDN) backed by a MySQL/MariaDB database. The project is designed as a **teaching tool** for demonstrating key concepts from Node to Express and front-end interactivity.

---

## Objectives (from course syllabus)

1. **Introduction to Node.js**
   - What is Node.js?
   - Why use Node.js?
   - Installation and development environment setup
2. **How Node.js works**
   - Event model and event loop
   - Asynchronism and non-blocking I/O
3. **Node.js modules**
   - Built-in modules (fs, http, etc.)
   - Third-party modules (Express)
   - Creating and using custom modules
4. **Express.js fundamentals**
   - Routing and middleware
   - View engines and static assets
5. **Callbacks and Promises**
   - Callback pattern and pitfalls
   - Promises and async/await
   - Applying Promises to database operations


---

## Getting Started

### Requirements

- Node.js
- MySQL (or MariaDB) server
- `npm`

### Installation

```bash
# clone repository
npm install
```

### Database Setup

1. Create a `.env` file in the project root with the database connection:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=class_register
   PORT=3000
   ```
2. Import the schema:
   ```bash
   mysql -u root -p < schema.sql
   ```


### Running the App

```bash
npm run dev   # requires nodemon or use npm start
```

Visit `http://localhost:3000` in your browser for the web interface, or use `/api/` endpoints for JSON responses.

---

### Directory Structure

- `app.js` – main Express application
- `routes/` – route definitions per resource
  - `api/` – JSON API routes (e.g., `index.js` imports controllers)
- `controllers/` – logic and database interaction
  - `api/` – API controllers (e.g., `students.js`, `courses.js`)
- `config/db.js` – MySQL connection pool
- `views/` – EJS templates for server-rendered pages
- `public/` – static assets including a simple Vue.js script via CDN
- `schema.sql` – SQL schema for creating required tables

---

## Application Overview

The application manages:

- **Students** (student ID, full name)
- **Staff** (staff ID, full name)
- **Courses** (code, title)
- **Enrollments** linking students to courses
- **Schedules** linking staff to courses at a specific datetime
- **Attendance** records of student presence on scheduled classes

Each resource has list/add/edit/delete pages. Scheduling and attendance pages demonstrate simple server-rendered forms enhanced with Vue.js for interactivity (e.g. toggling attendance checkboxes).

### API Endpoints

The app also includes JSON API endpoints under `/api/` for programmatic access:

- **Students**: `/api/students` (GET, POST), `/api/students/:id` (GET, PUT, DELETE)
- **Courses**: `/api/courses` (GET, POST), `/api/courses/:id` (GET, PUT, DELETE)
- **Staff**: `/api/staff` (GET, POST), `/api/staff/:id` (GET, PUT, DELETE)
- **Enrollments**: `/api/enrollments` (GET, POST), `/api/enrollments/:id` (GET, PUT, DELETE)
- **Schedules**: `/api/schedules` (GET, POST), `/api/schedules/:id` (GET, PUT, DELETE)
- **Attendance**: `/api/attendance/schedule/:scheduleId` (GET, POST)

Example: `curl -X POST http://localhost:3000/api/students -H "Content-Type: application/json" -d '{"student_id":"S001","full_name":"Alice"}'`