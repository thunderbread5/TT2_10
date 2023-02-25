const express = require("express");
const {
    registerUser,
    loginUser,
    getMe,
    addPolicy,
    getPolicies,
    addClaim,
    getClaims, deleteClaim, updateClaim,
} = require("../controllers/userController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/policies", addPolicy);
router.get("/policies", protect, getPolicies);
router.post("/claims", protect, addClaim);
router.post("/claims/getAll", protect, getClaims);
router.post("/claims/delete", protect, deleteClaim);
router.put("/claims/update", protect, updateClaim);


module.exports = router;
