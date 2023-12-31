import express from "express";
import {
  bookVehicle,
  getVehicles,
  vechileType,
  wheelerType,
} from "../controllers/vechilesController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// METHOD: GET || To retrieve the type of vehicle (2-wheeler or 4-wheeler)
router.get("/category", requireSignIn, wheelerType);

// METHOD: GET || To get the subcategories of vehicles based on the number of wheels (e.g., 2 or 4)
router.get("/sub-category/:wheeler", requireSignIn, getVehicles);

// METHOD: GET || To get the vechile type
router.get("/vechiles-list/:type", requireSignIn, vechileType);

// METHOD: POST || To save the booked vechiles in db
router.post("/booking", requireSignIn, bookVehicle);

export default router;
