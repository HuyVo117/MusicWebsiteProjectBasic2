import express from "express";
import { User } from "../model/user.js";
import { Song, validate } from "../model/song.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validObjectId from "../middleware/validObjectId.js";

const router = express.Router();

// Create song
router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const song = await Song(req.body).save();
  res.status(201).send({ data: song, message: "Song created successfully" });
});

// Get all songs
router.get("/", async (req, res) => {
  try {
    // Retrieve all songs from the database
    const songs = await Song.find();

    // Send a successful response with the songs data
    res.status(200).send({ data: songs });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res
      .status(500)
      .send({ message: "An error occurred while retrieving songs" });
  }
});

// Update song
router.put("/:id", [validObjectId, admin], async (req, res) => {
  const song = await Song.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!song) {
    return res.status(404).send({ message: "Song not found" });
  }

  res.status(200).send({ data: song, message: "Song updated successfully" });
});