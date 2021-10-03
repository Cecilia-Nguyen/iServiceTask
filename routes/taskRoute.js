const controller = require('../controller/manageTask');

const express = require('express');
const router = express.Router();
router.get('/task', controller.getTask);
router.post('/task', controller.postTask);

module.exports = router;
