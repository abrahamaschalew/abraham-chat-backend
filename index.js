const express = require('express');
const bodyParser = require('body-parser');
const ws = require('ws');
const morgan = require('morgan');
const cors = require('cors');

const jwt = require('./middlewares/jwt.middlewares');
const WebSocket = require('./utils/webSocket');


const app = express();

app.use(cors());


// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket, request, client) => {
  socket.id = Math.round(Math.random() * 5000);
  socket.send(JSON.stringify({ id: socket.id, type: "register" }));

  socket.on('message', message => {
    let webSocketMessage = new WebSocket(wsServer.clients, socket, message);
  });

  socket.on('close', (reasonCode, description) => {
    let onlineUsers = [];
    wsServer.clients.forEach(function each(client) {
      if (client.username != undefined)
        onlineUsers.push(client.username)
    })
    wsServer.clients.forEach(function each(client) {
      if (client.username != undefined) {
        client.send(JSON.stringify({ type: "onlineUsers", users: onlineUsers }))
      }
    })
  })
});



// ROUTES
const userRoute = require('./routes/user.routes');
const messageRoute = require('./routes/message.routes');

app.use(morgan('dev'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Json Web Token Middle ware
app.use(jwt);

app.use('/', userRoute);
app.use('/', messageRoute)

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    msg: "API endpoint doesn't exist"
  })
})


const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});