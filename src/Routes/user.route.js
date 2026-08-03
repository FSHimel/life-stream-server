import express from "express";
const router = express.Router();
import {
  getOneUser,
  getUser,
  postUser,
  updateUser,
} from "../controllers/user.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";

router.get("/", getUser);
router.get("/:email", verifyFBToken, getOneUser);
router.post("/", postUser);
router.patch("/:email", updateUser);

export default router;
