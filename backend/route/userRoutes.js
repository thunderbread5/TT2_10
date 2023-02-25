const express = require("express");
const {
    registerUser,
    loginUser,
    getMe,
    addClaim,
} = require("../controllers/userController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/claims", protect, addClaim);

module.exports = router;
