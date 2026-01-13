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

// cRud
// Endpoint /movies/:id
// Exempel: /movies/6966012ded12f5d8f6899d8a
moviesRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("Id:", id);

  const foundMovie = await movieModel.findById(id);

  if (foundMovie) {
    res.status(200).json(foundMovie);
  } else {
    res.status(400).json({ message: "No movie found for id:" + id });
  }
});

// Crud
// POST - http://localhost:3000/movies/create
moviesRouter.post("/create", async (req: Request, res: Response) => {
  console.log("Creating new movie in database");

  // Hämta ut egenskaperna title, length och description från bodyn.
  const { title, length, description } = req.body;

  console.log(req.body);

  const movieToAdd = new movieModel({
    title,
    length,
    description,
  });

  // Försök att spara movieToAdd till databasen (kollektionen movies).
  try {
    const savedMovie = await movieToAdd.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// cruD
// DELETE - http://localhost:3000/movies/:id
moviesRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("Id:", id);

  const foundMovie = await movieModel.findByIdAndDelete(id);

  if (foundMovie) {
    res.status(203).json();
  } else {
    res.status(400).json({ message: "No movie found for id:" + id });
  }
});
