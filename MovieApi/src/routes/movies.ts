import express, { type Request, type Response } from "express";
import { movieModel } from "../models/Movie.js";

// Hit kommer vi om vår url innehåller /movies
// Syftet med denna fil är att hantera CRUD-operation för filmer

// CRUD = Create Read Update Delete

export const moviesRouter = express.Router();

// cRud
// Endpoint "/movies"
moviesRouter.get("/", async (_: Request, res: Response) => {
  // Hittar alla object i vår kollektion
  const movies = await movieModel.find();

  res.json(movies);
});

// Crud
// POST - http://localhost:3000/movies/create
moviesRouter.post("/create", async (req: Request, res: Response) => {
  console.log("Creating new movie in database");

  const movieToAdd = new movieModel({
    title: "Test",
    length: 123,
    description: "Lorem ipsum",
  });

  // Försök att spara movieToAdd till databasen (kollektionen movies).
  try {
    const savedMovie = await movieToAdd.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});
