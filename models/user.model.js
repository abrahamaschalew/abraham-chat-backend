const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        username: {
            desc: "Username",
            trim: true,
            type: String,
            index: true,
            unique: false,
            required: true,
        },
        email: {
            desc: "E-mail address it can be fake address.",
            trim: true,
            type: String,
            index: true,
            unique: false,
            required: true,
        },
        password: {
            desc: "Password for this account",
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