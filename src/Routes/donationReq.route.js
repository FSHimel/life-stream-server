import express from "express";
import {
  deletDonationReq,
  getDonationReqs,
  getDonationReqByEmail,
  getOneDonationReqById,
  postDonationReq,
  updateOneRequest,
  updateStatusCanceled,
  updateStatusDone,
  getPendingDonationReqs,
  updateDonationInProgress,
} from "../controllers/donationReq.controller.js";
import verifyFBToken from "../middleware/verifyFBToken.js";
import verifyActiveUser from "../middleware/verifyActiveUser.js";
import verifyAdminAndVolunteer from "../middleware/verifyAdminAndVolunteer.js";
const router = express.Router();

router.get("/", verifyFBToken, verifyAdminAndVolunteer, getDonationReqs);
router.get("/pending", getPendingDonationReqs);
router.get("/single/:id", verifyFBToken, getOneDonationReqById);
router.get("/:email", verifyFBToken, getDonationReqByEmail);
router.post("/", verifyFBToken, verifyActiveUser, postDonationReq);
router.patch("/:id", verifyFBToken, verifyActiveUser, updateOneRequest);
router.patch("/:id/done", verifyFBToken, verifyActiveUser, updateStatusDone);
router.patch(
  "/:id/cancel",
  verifyFBToken,
  verifyActiveUser,
  updateStatusCanceled,
);
router.patch(
  "/:id/inprogress",
  verifyFBToken,
  verifyActiveUser,
  updateDonationInProgress,
);

router.delete("/:id", verifyFBToken, verifyActiveUser, deletDonationReq);
export default router;
