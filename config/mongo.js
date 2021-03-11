const mongoose = require('mongoose');
const users = require('../models/user.model')
const messages = require('../models/message.model')
const config = require('./config.json');


const db = mongoose.connection;
const url = process.env.mongoURL || config.mongoURL


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// connect to my database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    }
    else {
        console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
    }
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongo has reconnected');
})

mongoose.connection.on('reconnected', () => {
    console.log('Mongo connection is disconnected');
})



const user = mongoose.model('users', users);
const message = mongoose.model('messages', messages);


exports.user = user;
exports.message = message;