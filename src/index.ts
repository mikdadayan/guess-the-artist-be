import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/api";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

process.env.MONGODB_URI &&
  mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
