const mongo = require('../config/mongo');


exports.getMessage = (req, res) => {
    // Get latest messages order by new messages
    mongo.message.find({}, (err,result) => {
        res.json(result);
    })
}