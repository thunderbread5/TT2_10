const mongoose = require("mongoose");

const policySchema = mongoose.Schema(
    {
        InsuranceID: {
            type: Number,
            required: [true, "Add insurance ID please"],
        },
        EmployeeID: {
            type: Number,
            required: [true, "Add employee ID please"],
        },
        InsuranceType: {
            type: String,
            required: [true, "Add insurance type please"],
        },
        PolicyStartDate: {
            type: String,
            required: [true, "Add policy start date please"],
        },
        PolicyTerm: {
            type: String,
            required: [true, "Add policy term please"],
        },
        PolicyEndDate: {
            type: String,
            required: [true, "Add policy end date please"],
        },
        ClaimLimit: {
            type: Number,
            required: [true, "Add claim limit please"],
        },
        RemainingClaimLimit: {
            type: Number,
            required: [true, "Add remaining claim limit please"],
        }

    }
);

module.exports = mongoose.model('Policy', policySchema)
