import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not set in .env");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to mongo db"))
  .catch((err) => console.error("Error connecting to mongo db", err));
