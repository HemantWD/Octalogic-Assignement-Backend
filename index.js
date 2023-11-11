import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

const app = express();

// config env
dotenv.config();

// connecting database
db();

// middelwares
app.use(express.json());

// REST
app.get("/", (req, res) => {
  res.send("<h1>Server is Up and Running</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
