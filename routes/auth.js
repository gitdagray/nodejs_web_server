import express from "express";
import { handleLogin as authController } from "../controllers/authController.js";

const router = express.Router();

router.post("/", authController);

export default router;
