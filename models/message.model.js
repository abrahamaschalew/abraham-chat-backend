const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        sender: {
            desc: "Sender Address.",
            trim: true,
            type: String,
            index: true,
            unique: false,
            required: true,
        },
        type: {
            desc: "The type of message.",
            trim: true,
            type: String,
            index: true,
            unique: false,
            required: true,
        },
        message: {
            desc: "The message it self",
            trim: true,
            type: String,
            index: true,
            unique: false,
            required: true,
        }
    },
    {
        strict: true,
        versionKey: false,
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);



module.exports = schema;