const express = require("express");
const router = express.Router();

const movieRoutes = require("./movieRoutes");
const userRoutes = require("./userRoutes");

router.use("/movies", movieRoutes);
router.use("/users", userRoutes);

module.exports = router;
