const express = require('express');
const route = express.Router();


const { body } = require('express-validator');

// Controllers
const message = require('../controllers/message.controller');




// api/message
route.post('/api/message',
  // password must be at least 5 chars long
  body('message', "Message is required").exists(),
  // username must be exist
  body('type', 'Type is required').exists(),
  message.sendMessage
)

module.exports = route;