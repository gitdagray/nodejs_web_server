import express from "express";
import { handleNewUser as registerController } from "../controllers/registerController.js";

const router = express.Router();

router.post("/", registerController);

export default router;
