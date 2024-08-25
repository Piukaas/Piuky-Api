const mongoose = require("mongoose");

const wishlistSchema = new Schema({
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
