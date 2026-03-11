const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollmentsController');

router.get('/', enrollmentsController.list);
router.get('/new', enrollmentsController.newForm);
router.post('/', enrollmentsController.create);
router.get('/:id/edit', enrollmentsController.editForm);
router.post('/:id', enrollmentsController.update);
router.post('/:id/delete', enrollmentsController.delete);

module.exports = router;
