import express from "express";
const router = express.Router();
import { getUser, postUser } from "../controllers/user.controller.js";

router.get("/", getUser);
router.post("/", postUser);

export default router;
