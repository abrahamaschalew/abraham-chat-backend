const express = require('express');
const router = express.Router();

// Controller
const messageController = require('../controllers/message.controller')


router.get('/api/messages', messageController.getMessage);


module.exports = router;