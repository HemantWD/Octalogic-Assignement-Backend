import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoute from "./routes/authRoute.js";

const app = express();

// config env
dotenv.config();

// connecting database
db();

// middelwares
app.use(express.json());

// routes
app.use("/api", authRoute);

// REST
app.get("/", (req, res) => {
  res.send("<h1>Server is Up and Running</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
