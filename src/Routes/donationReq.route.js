import express from "express";
import {
  deletDonationReq,
  getDonationReqs,
  getOneDonationReqByEmail,
  getOneDonationReqById,
  postDonationReq,
  updateOneRequest,
  updateStatusCanceled,
  updateStatusDone,
} from "../controllers/donationReq.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";
import verifyActiveUser from "../middleware/verifyActiveUser.js";
const router = express.Router();

router.get("/", verifyFBToken, getDonationReqs);
router.get("/:email", verifyFBToken, getOneDonationReqByEmail);
router.get("/single/:id", verifyFBToken, getOneDonationReqById);
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
