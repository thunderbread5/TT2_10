const mongoose = require("mongoose");

const policySchema = mongoose.Schema(
    {
        insuranceId: {
            type: Number,
            required: [true, "Add insurance ID please"],
        },
        employeeId: {
            type: Number,
            required: [true, "Add employee ID please"],
        },
        insuranceType: {
            type: String,
            required: [true, "Add insurance type please"],
        },
        policyStartDate: {
            type: String,
            required: [true, "Add policy start date please"],
        },
        policyTerm: {
            type: String,
            required: [true, "Add policy term please"],
        },
        policyEndDate: {
            type: String,
            required: [true, "Add policy end date please"],
        },
        claimLimit: {
            type: Number,
            required: [true, "Add claim limit please"],
        },
        remainingClaimLimit: {
            type: Number,
            required: [true, "Add remaining claim limit please"],
        }

    }
);

module.exports = mongoose.model('Policy', policySchema)
