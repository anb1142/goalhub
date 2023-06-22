const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

// router.route("/").get(getGoals).post(registerUser);
// router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
