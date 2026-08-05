import express from "express";
import {
  deletDonationReq,
  getDonationReq,
  postDonationReq,
  updateStatusCanceled,
  updateStatusDone,
} from "../controllers/donationReq.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";
import verifyActiveUser from "../middleware/verifyActiveUser.js";
const router = express.Router();

router.get("/:email", verifyFBToken, getDonationReq);
router.post("/", verifyFBToken, verifyActiveUser, postDonationReq);
router.patch("/:id/done", verifyFBToken, verifyActiveUser, updateStatusDone);
router.patch(
  "/:id/cancel",
  verifyFBToken,
  verifyActiveUser,
  updateStatusCanceled,
);

router.delete("/:id", verifyFBToken, verifyActiveUser, deletDonationReq);
export default router;
