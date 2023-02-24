const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Add name please"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Add email please"],
        },
        password: {
            type: String,
            required: [true, "Add password please"],
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema)
