const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  if (!user.isActive) {
    return res.status(403).send("User is not active");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
      res.json({ user: user, token: token, expiresIn: 24 * 60 * 60 });
    } else {
      res.status(400).send("Cannot find user");
    }
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
