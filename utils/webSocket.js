const jwt = require('jsonwebtoken');
const mongo = require('../config/mongo');
const config = require('../config/config.json');


/**
 * @param {Object} message
 */
module.exports = class WebSocket {
  constructor(clients, socket, message) {
    this.clients = clients;
    this.socket = socket;
    this.message = message;
    try {
      this.message = JSON.parse(message);
      this.messageType();
    } catch (e) {
      return;
    }

  }

  messageType() {
    if (!this.message.type)
      return;

    // if the message has type
    if (this.message.type == "typing") {
      this.clients.forEach(function each(client) {
        client.send(message);
      });
      return;
    }

    // if the message type is different from typing
    if (this.message.type == "message")
      return this.saveMessage();
  }


  // check the token is valid
  // grap username from mongodb using decrypted token id
  // insert all info about the message to messages mongodb collection
  // finaly notify to all connected clients
  saveMessage() {
    if (!this.message.token || !this.message.message)
      return;

    verifyToken(this.message.token, (id) => {
      if (id === undefined) return;
      const newMessage = new mongo.message({
        sender: id,
        type: "Sent Message",
        message: this.message.message
      })

      newMessage.save((err, result) => {
        if (err) return console.log(err);
        mongo.user.find({ _id: id }, (err, result) => {
          if (err) return console.log(err);
          if (result.length == 0) return;
          const message = this.message;
          message.user = result[0].username;
          message.token = "";
          this.clients.forEach(function each(client) {
            client.send(JSON.stringify(message));
          });
        })
      })
    })
  }
}


function verifyToken(token, callback) {
  // Split at space
  const bearer = token.split(' ');
  // Get token from array
  const bearerToken = bearer[1];
  // Set the token
  realToken = bearerToken;

  jwt.verify(realToken, config.JWTKey, (err, authData) => {
    if (err) return console.log(err);
    if (authData._id)
      return callback(authData._id)
    else return callback(undefined);
  })
}