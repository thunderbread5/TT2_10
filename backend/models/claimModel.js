const mongoose = require("mongoose");

const claimSchema = mongoose.Schema(
    {
        EmployeeID: {
            type: String,
            required: [true, "Add employee ID please"],
        },
        ClaimID: {
            type: Number,
            unique: true,
            required: [true, "Add claim ID please"],
        },
        InsuranceID: {
            type: String,
            required: [true, "Add insurance ID please"],
        },
        FirstName: {
            type: String,
            required: [true, "Add first name please"],
        },
        LastName: {
            type: String,
            required: [true, "Add last name please"],
        },
        ExpenseDate: {
            type: String,
            required: [true, "Add expense date please"],
        },
        Amount: {
            type: Number,
            required: [true, "Add amount please"],
        },
        Purpose: {
            type: String,
            required: [true, "Add purpose please"],
        },
        FollowUp: {
            type: Number,
            required: [true, "Add followUp please"],
            default: 0,
        },
        PreviousClaimID: {
            type: Number,
            required: [true, "Add previousClaimId please"],
            default: -1,
        },
        Status: {
            type: String,
            required: [true, "Add status please"],
            default: "Pending",
        },
        LastEditedClaimDate: {
            type: String,
            required: [true, "Add last edited claim date please"],
            default: Date.now().toString(),
        }
    }
);

module.exports = mongoose.model('Claim', claimSchema)