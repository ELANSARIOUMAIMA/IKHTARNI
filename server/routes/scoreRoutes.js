import express from "express";
import { postScore } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/", postScore);

export default router;
