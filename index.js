const express = require('express');
const bodyParser = require('body-parser');
const ws = require('ws');
const morgan = require('morgan');
const app = express();
const mongo = require('./mongo');
const jwt = require('./middlewares/jwt.middlewares');


// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => {
    wsServer.clients.forEach(function each(client) {
        if (client !== socket && client.readyState === ws.OPEN) {
          client.send(message);
        }
      });
  });
});





// ROUTES
const userRoute = require('./routes/user.routes');
const messageRoute = require('./routes/message.routes');

app.use(morgan('dev'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// Json Web Token Middle ware
app.use(jwt);



app.use('/', userRoute);
app.use('/', messageRoute)

/** catch 404 and forward to error handler */
app.use('*', (req,res) => {
    return res.status(404).json({
        msg: "API endpoint doesn't exist"
    })
})


const port = process.env.PORT ||  5000;


// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});