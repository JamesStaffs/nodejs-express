const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

// list all students
router.get('/', studentsController.list);
// show add form
router.get('/new', studentsController.newForm);
// create student
router.post('/', studentsController.create);
// edit form
router.get('/:id/edit', studentsController.editForm);
// update student
router.post('/:id', studentsController.update);
// delete student
router.post('/:id/delete', studentsController.delete);

module.exports = router;
