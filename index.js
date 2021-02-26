const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongo = require('./mongo');
const jwt = require('./middlewares/jwt.middlewares');

// ROUTES
const userRoute = require('./routes/user.routes');

app.use(morgan('dev'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// Json Web Token Middle ware
app.use(jwt);

app.use('/', userRoute);

const port = process.env.PORT ||  5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
































// //initialize a simple http server
// const server = http.createServer(app);

// //initialize the WebSocket server instance
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {

//     //connection is up, let's add a simple simple event
//     ws.on('message', (message) => {

//         //log the received message and send it back to the client
//         console.log('received: %s', message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });

//     //send immediatly a feedback to the incoming connection    
//     ws.send('Websocket connection is established');
// });

// //start our server
// server.listen(process.env.PORT || 8999, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });