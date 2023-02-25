const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
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
            _id: user._id,
            EmployeeID: user.EmployeeID,
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
            _id: user._id,
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

const addClaim = asyncHandler(async (req, res) => {
    const { EmployeeID, ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose,
        FollowUp, PreviousClaimID, Status, LastEditedClaimDate } = req.body;
    if (!EmployeeID || !ClaimID || !InsuranceID) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    // Find if user exists
    const userExists = await User.findOne({ EmployeeID });
    if (!userExists) {
        res.status(400);
        throw new Error("User not found");
    }

    // Create claim
    const claim = await Claim.create({
        EmployeeID,
        ClaimID,
        InsuranceID,
        FirstName,
        LastName,
        ExpenseDate,
        Amount,
        Purpose,
        FollowUp,
        PreviousClaimID,
        Status,
        LastEditedClaimDate,
    });
    if (claim) {
        res.status(201).json({
            EmployeeID: claim.EmployeeID,
            ClaimID: claim.ClaimID,
            InsuranceID: claim.InsuranceID,
            FirstName: claim.FirstName,
            LastName: claim.LastName,
            ExpenseDate: claim.ExpenseDate,
            Amount: claim.Amount,
            Purpose: claim.Purpose,
            FollowUp: claim.FollowUp,
            PreviousClaimID: claim.PreviousClaimID,
            Status: claim.Status,
            LastEditedClaimDate: claim.LastEditedClaimDate,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});




module.exports = {
    registerUser,
    loginUser,
    getMe,
    addClaim,
};
