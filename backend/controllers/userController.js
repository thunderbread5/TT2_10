const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Policy = require("../models/policyModel")
const Claim = require("../models/claimModel");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { EmployeeID, FirstName, Password, LastName, Age} = req.body;
    if (!FirstName || !Password || !LastName || !Age) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    // Find if user already exists
    const userExists = await User.findOne({ EmployeeID });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create user
    const user = await User.create({
        EmployeeID,
        FirstName,
        LastName,
        Password: hashedPassword,
        Age: Age
    });

    if (user) {
        res.status(201).json({
            EmployeeID: user.EmployeeID,
            Password: user.Password,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Age: user.Age,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { EmployeeID, Password } = req.body;
    const user = await User.findOne({ EmployeeID });

    // check user and password match
    if (user && (await bcrypt.compare(Password, user.Password))) {
        res.status(200).json({
            EmployeeID: user.EmployeeID,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Age: user.Age,
            token: generateToken(user.EmployeeID),
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        EmployeeID: req.user.EmployeeID,
        FirstName: req.user.FirstName,
        Password: req.user.Password,
    };
    res.status(200).json(user);
});

const generateToken = (id) => {
    return jwt.sign({ id }, config.secret, {
        expiresIn: "30d",
    });
};

const addPolicy = asyncHandler(async (req, res) => {
    const { InsuranceID, EmployeeID, InsuranceType, PolicyStartDate, PolicyTerm, 
        PolicyEndDate, ClaimLimit, RemainingClaimLimit } = req.body;
        if (!InsuranceID || !EmployeeID || !InsuranceType ) {
            res.status(400);
            throw new Error("Please include all fields");
        }
    const user = await User.findOne({ EmployeeID })
    if (!user) {
        res.status(400);
        throw new Error("Employee not found");
    }
    const policy = await Policy.create({
        InsuranceID,
        EmployeeID,
        InsuranceType, 
        PolicyStartDate, 
        PolicyTerm, 
        PolicyEndDate, 
        ClaimLimit, 
        RemainingClaimLimit
    })
    if (policy) {
        res.status(201).json({
            InsuranceID: policy.InsuranceID,
            EmployeeID: policy.EmployeeID,
            InsuranceType: policy.InsuranceType,
            PolicyStartDate: policy.PolicyStartDate,
            PolicyTerm: policy.PolicyTerm,
            PolicyEndDate: policy.PolicyEndDate,
            ClaimLimit: policy.ClaimLimit,
            RemainingClaimLimit: policy.RemainingClaimLimit,
        });
    } else {
        res.status(400);
        throw new Error("Invalid policy data");
    }
})

const getMyPolicies = asyncHandler(async (req, res) => {
    employee_id = req.user.EmployeeID
    const policies = await Policy.find({ "EmployeeID": employee_id })
    if (policies.length > 0) {
        res.status(200).json(policies);
    } else {
        res.status(404);
        throw new Error("Employee has no policies");
    }
    });

const addClaim = asyncHandler(async (req, res) => {
    const { EmployeeID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose,
        FollowUp, PreviousClaimID, Status, LastEditedClaimDate } = req.body;
    if (!EmployeeID || !InsuranceID) {
        res.status(400);
        throw new Error("Please include all fields");
    }
    const insuranceExists = await Policy.findOne({ "InsuranceID": InsuranceID });
    if (!insuranceExists) {
        res.status(400);
        throw new Error("Policy not found");
    }

    // Find if user exists
    const userExists = await User.findOne({ EmployeeID });
    if (!userExists) {
        res.status(400);
        throw new Error("User not found");
    }

    // Create claim
    const claim = await Claim.create({
        EmployeeID: EmployeeID,
        InsuranceID: InsuranceID,
        FirstName: userExists.FirstName,
        LastName: userExists.LastName,
        ExpenseDate: ExpenseDate,
        Amount: Amount,
        Purpose: Purpose,
        FollowUp: FollowUp,
        PreviousClaimID: PreviousClaimID,
        Status: Status,
        LastEditedClaimDate: LastEditedClaimDate,
    });
    if (claim) {
        res.status(201).json({ claim });
    } else {
        res.status(400);
        throw new Error("Invalid claim data");
    }
});

const getClaims = asyncHandler(async (req, res) => {
    const { employeeId } = req.body;
    if (!employeeId) {
        res.status(400);
        throw new Error("Please include employeeId");
    }

    // Find if user exists
    const userExists = await User.findOne({ employeeId });
    if (!userExists) {
        res.status(400);
        throw new Error("User not found");
    }

    // get all claims
    let claims;
    claims = await Claim.find({employeeId: employeeId});
    return res.status(200).json({ claims });
});

const deleteClaim = asyncHandler(async (req, res) => {
    const { claimId } = req.body;
    if (!claimId) {
        res.status(400);
        throw new Error("Please include claimId");
    }

    // Find if claim exists
    const claim = await Claim.findOne({ claimId });
    if (!claim) {
        res.status(400);
        throw new Error("Claim not found");
    }
    claim.remove({claimId: claimId});
    return res.status(200).json({ message: "Successful delete of claimId:" +  claimId});

    // get all claims

});

const updateClaim = asyncHandler(async (req, res) => {
    const { id_, InsuranceID, ExpenseDate, Amount, Purpose,
        FollowUp, PreviousClaimID, Status, LastEditedClaimDate } = req.body;

    if (!id_) {
        res.status(400);
        throw new Error("Please include claimId");
    }

    let claim;
    // Find if claim exists

    claim = await Claim.findByIdAndUpdate(id_, {InsuranceID: InsuranceID, ExpenseDate: ExpenseDate,
        Amount: Amount, Purpose: Purpose, FollowUp: FollowUp, PreviousClaimID: PreviousClaimID,
        Status: Status, LastEditedClaimDate: LastEditedClaimDate});
    if (!claim) {
        return res.status(500).json({message: "Unable to save user"});
    }
    return res.status(200).json({message: "Updated Success"});

    // get all claims

});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    addPolicy,
    addClaim,
    getClaims,
    deleteClaim,
    updateClaim
};
