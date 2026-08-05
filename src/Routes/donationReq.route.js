import express from "express";
import {
  deletDonationReq,
  getDonationReq,
  getOneDonationReq,
  postDonationReq,
  updateOneRequest,
  updateStatusCanceled,
  updateStatusDone,
} from "../controllers/donationReq.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";
import verifyActiveUser from "../middleware/verifyActiveUser.js";
const router = express.Router();

router.get("/:email", verifyFBToken, getDonationReq);
router.get("/single/:id", verifyFBToken, getOneDonationReq);
router.post("/", verifyFBToken, verifyActiveUser, postDonationReq);
router.patch("/:id", verifyFBToken, verifyActiveUser, updateOneRequest);
router.patch("/:id/done", verifyFBToken, verifyActiveUser, updateStatusDone);
router.patch(
  "/:id/cancel",
  verifyFBToken,
  verifyActiveUser,
  updateStatusCanceled,
);

router.delete("/:id", verifyFBToken, verifyActiveUser, deletDonationReq);
export default router;
