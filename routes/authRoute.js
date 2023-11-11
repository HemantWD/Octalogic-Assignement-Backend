import express from "express";
import { loginController } from "../controllers/authController.js";

const router = express.Router();

// login route
router.post("/login", loginController);

export default router;
