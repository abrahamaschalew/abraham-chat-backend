const express = require('express');
const route = express.Router();


const { body } = require('express-validator');


// Controllers
const user = require('../controllers/user.controller')


// api/register create new user account
route.post('/api/register',
  // username must be an email
  body('email').exists().isEmail(),
  // password must be at least 5 chars long
  body('password').exists().isLength({ min: 5 }),
  // username must be exist
  body('username', 'Username is required').exists(),
  user.register);



// api/login
route.post('/api/login',
  // password must be at least 5 chars long
  body('password').exists().isLength({ min: 5 }),
  // username must be exist
  body('username', 'Username is required').exists(),
  user.login
)



module.exports = route;