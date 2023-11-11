import express from "express";
import dotenv from "dotenv";

const app = express();

// config env
dotenv.config();

// middelwares
app.use(express.json);

// REST
app.get("/", (req, res) => {
  res.send("Server is Up and Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
