const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/', coursesController.list);
router.get('/new', coursesController.newForm);
router.post('/', coursesController.create);
router.get('/:id/edit', coursesController.editForm);
router.post('/:id', coursesController.update);
router.post('/:id/delete', coursesController.delete);

module.exports = router;
