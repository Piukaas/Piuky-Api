const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const authenticateToken = require("./authMiddleware");

// Search for movies/tv-shows on TMDB
router.get("/tmdb", authenticateToken, async (req, res) => {
  const title = req.query.title;
  const searchType = req.query.searchType;

  if (searchType !== "movie" && searchType !== "tv") {
    return res.status(400).json({ error: "Invalid search term. Only 'movie' or 'tv' are allowed." });
  }

  try {
    const response = await fetch(`${process.env.TMDB_API_URL}/search/${searchType}?query=${title}&include_adult=true`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    const results = await response.json();
    res.json(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get movie/tv-show details from TMDB
router.get("/tmdb/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const searchType = req.query.searchType;

  if (searchType !== "movie" && searchType !== "tv") {
    return res.status(400).json({ error: "Invalid search term. Only 'movie' or 'tv' are allowed." });
  }

  try {
    const response = await fetch(`${process.env.TMDB_API_URL}/${searchType}/${id}?append_to_response=videos,images`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all movies for a user
// router.get("/", async (req, res) => {
//   const searchTerm = req.query.search || "";
//   try {
//     const query = { name: { $regex: new RegExp(searchTerm, "i") } };
//     const movies = await Movie.find(query).sort({ title: 1 }); // Sort movies by name in ascending order
//     res.send(movies);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// Get artworks for a movie
// router.post("/artworks", async (req, res) => {
//   const movieName = req.body.movieName;
//   const headers = {
//     Authorization: `Bearer ${process.env.AUTHORIZATION}`,
//     "Client-ID": process.env.CLIENT_ID,
//     "Content-Type": "application/json",
//   };

//   const body = `fields name, artworks.url, cover.url; where category = 0; search "${movieName}"; limit 3;`;

//   try {
//     const response = await fetch(`${process.env.IGBD_API_URL}/movies`, {
//       method: "POST",
//       headers: headers,
//       body: body,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch artworks");
//     }

//     const artworks = await response.json();
//     res.json(artworks);
//   } catch (error) {
//     console.error("Error fetching artworks:", error);
//     res.status(500).send("Failed to load artworks. Please try again later.");
//   }
// });

// Get a specified number of random movies
// router.get("/random/:amount", async (req, res) => {
//   try {
//     const amount = parseInt(req.params.amount, 10);
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).send({ message: "Amount must be a positive integer." });
//     }
//     const movies = await Movie.aggregate([{ $sample: { size: amount } }]);
//     res.send(movies);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// Get a movie by id
// router.get("/:id", async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) {
//       return res.status(404).send();
//     }
//     res.send(movie);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// Update a movie by id
// router.patch("/:id", authenticateToken, async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!movie) {
//       return res.status(404).send();
//     }
//     res.send(movie);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// Delete a movie by id
// router.delete("/:id", authenticateToken, async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndDelete(req.params.id);
//     if (!movie) {
//       return res.status(404).send();
//     }
//     res.send(movie);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
