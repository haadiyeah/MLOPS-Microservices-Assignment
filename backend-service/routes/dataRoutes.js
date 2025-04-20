const express = require('express');
const dataController = require('../controllers/dataController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

router.route('/')
    .get(dataController.getData)
    .post(dataController.createData);

router.route('/:id')
    .put(dataController.updateData)
    .delete(dataController.deleteData);

module.exports = router;