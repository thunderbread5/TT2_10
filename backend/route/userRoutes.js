const express = require("express");
const {
    registerUser,
    loginUser,
    getMe,
    addClaim,
    getClaims, deleteClaim,
} = require("../controllers/userController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/claims", protect, addClaim);
router.get("/claims", protect, getClaims);
router.post("/claims/delete", protect, deleteClaim);


module.exports = router;
