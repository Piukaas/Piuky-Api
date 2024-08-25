const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  overview: { type: String, required: true },
  posterPath: { type: String, required: true },
  backdropPath: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = mongoose.model("Franchise", franchiseSchema);
