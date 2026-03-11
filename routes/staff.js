const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.get('/', staffController.list);
router.get('/new', staffController.newForm);
router.post('/', staffController.create);
router.get('/:id/edit', staffController.editForm);
router.post('/:id', staffController.update);
router.post('/:id/delete', staffController.delete);

// view schedule for a staff member
router.get('/:id/schedule', staffController.schedule);

module.exports = router;
