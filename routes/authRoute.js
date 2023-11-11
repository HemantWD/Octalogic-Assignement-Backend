import express from "express";
import { loginController } from "../controllers/authController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// login route
router.post("/login", loginController);

// test API
router.get("/test", requireSignIn, (req, res) => {
  res.status(200).send({
    message: "Test Successfull",
  });
});

export default router;
