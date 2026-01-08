import mongoose from "mongoose";

// Beskriver ett objekt movie
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    requires: false,
  },
  description: {
    type: String,
    required: false,
  },
});

// Skapar collection movies
export const movieModel = mongoose.model("movie", movieSchema);
