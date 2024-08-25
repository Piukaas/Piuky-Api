const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  codeUrl: { type: String, required: true },
  liveUrl: { type: String, required: false, default: "" },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  applications: [applicationSchema],
});

module.exports = mongoose.model("User", userSchema);
