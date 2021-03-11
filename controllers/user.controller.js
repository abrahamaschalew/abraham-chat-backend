const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongo = require('../config/mongo');
const config = require('../config/config.json');

/**
* @api {post} /api/register Create user
* @apiName Create new user
* @apiPermission end user
* @apiGroup User
*
* @apiParam  {String} [username] username
* @apiParam  {String} [email] Email
* @apiParam  {String} [password] Password
*
* @apiSuccess (200)
*/
exports.register = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check username is allready taken
  const isUsernameTaken = await mongo.user.find({username: req.body.username});
  if (isUsernameTaken.length > 0)
    return res.status(400).json({msg : "Username allready taken please try another one."});

  // creating a mongodb document
  const user = new mongo.user({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });


  user.save((err, result) => {
    if (err)  {
      res.sendStatus(501);
      return console.log(err)
    }

    mongo.user.find({ username: req.body.username, password: req.body.password },
      (err, result) => {
        if (err) return res.sendStatus(501);
        if (result.length == 0)
          return res.status(404).json({ msg: "Please check your username & password." });
        // if the user exist we need to generate a JSON Web Token(JWT) & send back to client.
        // To save the token.
        if (result.length == 1) {
          jwt.sign({ _id: result[0]._id }, config.JWTKey, (err, token) => {
            if (err) {
              console.log(err);
              return res.status(501).json({ err });
            }
            res.json({ msg: "Account created sucessfully", token })
          })
        } else {
          return res.status(404).json({ msg: "Please check your username & password." });
        }
      })
  })
}

/**
* @api {post} /api/login Login user
* @apiName Login user
* @apiPermission end user
* @apiGroup User
*
* @apiParam  {String} [username] username
* @apiParam  {String} [password] Password
*
* @apiSuccess (200)
*/
exports.login = (req, res) => {
  mongo.user.find({ username: req.body.username, password: req.body.password },
    (err, result) => {
      if (err) return res.sendStatus(501);
      if (result.length == 0)
        return res.status(404).json({ msg: "Please check your username & password." });
      // if the user exist we need to generate a JSON Web Token(JWT) & send back to client.
      // To save the token.
      if (result.length == 1) {
        jwt.sign({ _id: result[0]._id }, config.JWTKey, (err, token) => {
          if (err) return res.status(501).json({ err });
          res.json({ msg: "You are logged in", token })
        })
      }
    })
}

exports.isAuth = (req,res) => {
  if (!req.session)
    return res.status(401).json({msg: "You are not logged in"});
  res.json({msg: "You are logged In"})
}