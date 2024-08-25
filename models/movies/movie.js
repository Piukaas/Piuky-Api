const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seasonNumber: { type: Number, required: true },
  airDate: { type: String, required: false, default: "" },
  overview: { type: String, required: false, default: "" },
  voteAverage: { type: Number, required: false, default: 0 },
  episodes: [
    {
      episodeNumber: { type: Number, required: true },
      watched: { type: Boolean, required: false, default: false },
    },
  ],
  discVersion: { type: String, required: false, default: "" },
});

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  tagline: { type: String, required: false, default: "" },
  overview: { type: String, required: false, default: "" },
  releaseDate: { type: String, required: false, default: "" },
  endDate: { type: String, required: false, default: "" },
  runtime: { type: Number, required: false, default: 0 },
  status: { type: String, required: true },
  watchStatus: { type: String, required: false, default: "" },
  discVersion: { type: String, required: false, default: "" },
  voteAverage: { type: Number, required: false, default: 0 },
  posterPath: { type: String, required: false, default: "https://i.imgur.com/42uQxSx.png" },
  logoPath: { type: String, required: false, default: "" },
  trailerUrl: { type: String, required: false, default: "" },
  mediaType: { type: String, required: true },
  genres: [{ type: String, required: true }],
  seasons: [seasonSchema],
});

module.exports = mongoose.model("Movie", movieSchema);
