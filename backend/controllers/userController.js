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
    const { employeeId, name, password, lastName, age} = req.body;
    if (!name || !password || !lastName || !age) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    // Find if user already exists
    const userExists = await User.findOne({ employeeId });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        employeeId,
        name,
        lastName,
        password: hashedPassword,
        age: age
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            employeeId: user.employeeId,
            name: user.name,
            lastName: user.lastName,
            age: user.age,
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
    const { employeeId, password } = req.body;
    const user = await User.findOne({ employeeId });

    // check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            employeeId: user.employeeId,
            name: user.name,
            lastName: user.lastName,
            age: user.age,
            token: generateToken(user.employeeId),
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
        employeeId: req.user.employeeId,
        name: req.user.name,
        password: req.user.password,
    };
    res.status(200).json(user);
});

const generateToken = (id) => {
    return jwt.sign({ id }, config.secret, {
        expiresIn: "30d",
    });
};

const addClaim = asyncHandler(async (req, res) => {
    const { employeeId, insuranceId, expenseDate, amount, purpose,
        followUp, previousClaimId, currentStatus, lastEditedClaimDate } = req.body;
    if (!employeeId || !insuranceId) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    // Find if user exists
    const userExists = await User.findOne({ employeeId });
    if (!userExists) {
        res.status(400);
        throw new Error("User not found");
    }

    // Create claim
    const claim = await Claim.create({
        employeeId: employeeId,
        insuranceId: insuranceId,
        name: userExists.name,
        lastName: userExists.lastName,
        expenseDate: expenseDate,
        amount: amount,
        purpose: purpose,
        followUp: followUp,
        previousClaimId: previousClaimId,
        currentStatus: currentStatus,
        lastEditedClaimDate: lastEditedClaimDate,
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




module.exports = {
    registerUser,
    loginUser,
    getMe,
    addClaim,
    getClaims,
    deleteClaim,
};
