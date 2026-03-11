const express = require('express');
const router = express.Router();
const schedulesController = require('../controllers/schedulesController');

router.get('/', schedulesController.list);
router.get('/new', schedulesController.newForm);
router.post('/', schedulesController.create);
router.get('/:id/edit', schedulesController.editForm);
router.post('/:id', schedulesController.update);
router.post('/:id/delete', schedulesController.delete);

module.exports = router;
