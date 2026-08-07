import express from "express";
const router = express.Router();
import {
  getOneUser,
  getUser,
  postUser,
  searchDonors,
  toggleUserStatus,
  updateUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";
import verifyAdmin from "../middleware/verifyActiveUser.js";

router.get("/", verifyFBToken, verifyAdmin, getUser);
router.get("/search", searchDonors);
router.get("/:email", verifyFBToken, getOneUser);
router.post("/", verifyFBToken, postUser);
router.patch("/:email", verifyFBToken, updateUser);
router.patch("/:id/status", verifyFBToken, verifyAdmin, toggleUserStatus);
router.patch("/:id/role", verifyFBToken, verifyAdmin, updateUserRole);

export default router;
