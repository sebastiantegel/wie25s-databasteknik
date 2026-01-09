import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { movieModel } from "./models/Movie.js";

configDotenv();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not set in .env");
}

try {
  await mongoose.connect(mongoUri);
  console.log("Connected to mongo db");
} catch (err) {
  console.error("Error connecting to mongo db", err);
}
