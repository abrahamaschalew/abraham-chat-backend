const { validationResult } = require('express-validator');
const mongo = require('../mongo');
const config = require('../config/config.json');


exports.sendMessage = (req,res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}