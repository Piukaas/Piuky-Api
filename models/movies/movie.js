const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  tagline: { type: String, required: false, default: "" },
  overview: { type: String, required: true },
  releaseDate: { type: String, required: true },
  runTime: { type: Number, required: true },
  status: { type: String, required: true },
  watchStatus: { type: String, required: true },
  discVersion: { type: String, required: false, default: "" },
  voteAverage: { type: Number, required: true },
  posterPath: { type: String, required: true },
  backdropPath: { type: String, required: false, default: "" },
  trailerUrl: { type: String, required: false, default: "" },
  mediaType: { type: String, required: true }, // movie, tv
  genres: [{ type: String, required: true }],
});

module.exports = mongoose.model("Movie", movieSchema);
