const mongoose = require("mongoose");

const claimSchema = mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: [true, "Add employee ID please"],
        },
        claimId: {
            type: Number,
            unique: true,
            required: [true, "Add claim ID please"],
        },
        insuranceId: {
            type: String,
            required: [true, "Add insurance ID please"],
        },
        name: {
            type: String,
            required: [true, "Add first name please"],
        },
        lastName: {
            type: String,
            required: [true, "Add last name please"],
        },
        expenseDate: {
            type: String,
            required: [true, "Add expense date please"],
        },
        amount: {
            type: Number,
            required: [true, "Add amount please"],
        },
        purpose: {
            type: String,
            required: [true, "Add purpose please"],
        },
        followUp: {
            type: Number,
            required: [true, "Add followUp please"],
            default: 0,
        },
        previousClaimId: {
            type: Number,
            required: [true, "Add previousClaimId please"],
            default: -1,
        },
        currentStatus: {
            type: String,
            required: [true, "Add previousClaimId please"],
            default: "Pending",
        },
        lastEditedClaimDate: {
            type: String,
            required: [true, "Add date please"],
            default: Date.now().toString(),
        }
    }
);

module.exports = mongoose.model('Claim', claimSchema)