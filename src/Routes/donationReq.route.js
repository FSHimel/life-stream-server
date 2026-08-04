import express from "express";
import {
  getDonationReq,
  postDonationReq,
} from "../controllers/donationReq.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";
import verifyActiveUser from "../middleware/verifyActiveUser.js";
const router = express.Router();

router.get("/", verifyFBToken, getDonationReq);
router.post("/", verifyFBToken, verifyActiveUser, postDonationReq);

export default router;
