const jwt = require('jsonwebtoken');
const config = require('../config/config.json');


module.exports = (req, res, next) => {
    // Get auth header value
    const barerHeader = req.headers['authorization'];
    // Check if bearer is undefined

    if (typeof barerHeader == 'undefined') {
        req.session = { data: false };
        next();
        return;
    }

    // Split at space
    const bearer = barerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;

    jwt.verify(req.token, config.JWTKey, (err, authData) => {
        if (err) return res.sendStatus(401);
        if (authData._id)
            req.session = {
                data: {
                    _id: authData._id
                }
            };
        else req.session = { data: false };
        next();
    })
}
