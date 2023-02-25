const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: [true, "Add employee ID please"],
        },
        name: {
            type: String,
            required: [true, "Add name please"],
        },
        lastName: {
            type: String,
            required: [true, "Add last name please"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Add email please"],
        },
        password: {
            type: String,
            required: [true, "Add password please"],
        }
    }
);

module.exports = mongoose.model('User', userSchema)
