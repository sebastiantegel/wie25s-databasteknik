import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import express, { type Request, type Response } from "express";
import { moviesRouter } from "./routes/movies.js";

configDotenv();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not set in .env");
}

// Skapa api
const app = express();

// Endpoint "/"
app.get("/", (_: Request, res: Response) => {
  console.log("Handling request for http://localhost:3000/");
  res.json({ message: "Hello world!" });
});

// Skicka alla anrop som innehåller /movies till moviesRouter (routes/movies.ts)
app.use("/movies", moviesRouter);

try {
  await mongoose.connect(mongoUri);
  console.log("Connected to mongo db");
} catch (err) {
  console.error("Error connecting to mongo db", err);
}

// Startar api:t och lyssnar efter anrop på port 3000 (http://localhost:3000)
app.listen(3000, () => {
  console.log("Api running on port 3000 >");
});
