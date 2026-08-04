import express from "express";
const router = express.Router();
import {
  getOneUser,
  getUser,
  postUser,
  updateUser,
} from "../controllers/user.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";

router.get("/", verifyFBToken, getUser);
router.get("/:email", verifyFBToken, getOneUser);
router.post("/", verifyFBToken, postUser);
router.patch("/:email", verifyFBToken, updateUser);

export default router;
