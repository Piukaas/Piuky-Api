const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  watchDate: { type: Date, required: true },
  review: { type: String, required: true }, // emoji
  rewatch: { type: Boolean, required: false, default: false },
});

module.exports = mongoose.model("Diary", diarySchema);
