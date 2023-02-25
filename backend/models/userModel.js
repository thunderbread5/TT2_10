const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        EmployeeID: {
            type: String,
            required: [true, "Add employee ID please"],
        },
        FirstName: {
            type: String,
            required: [true, "Add first name please"],
        },
        LastName: {
            type: String,
            required: [true, "Add last name please"],
        },
        Password: {
            type: String,
            required: [true, "Add password please"],
        },
        Age: {
            type: Number,
            required: [true, "Add age please"],
            default: 100
        }
    }
);

module.exports = mongoose.model('User', userSchema)
