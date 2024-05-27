const express = require("express");
const router = express.Router();
const {
  getRequestByPost,
  getRequestByUser,
  getAllRequestForLandlord,
  createRequest,
  updateRequest,
  deleteRequest,
  sendMailConfirmRequest,
  sendMailAcceptedRequest,
  sendMailRefusedRequest,
} = require("../../controllers/viewing-request");

router.post("/view-request", createRequest);
router.post("/view-request/send-confirm", sendMailConfirmRequest);
router.post("/view-request/send-accepted", sendMailAcceptedRequest);
router.post("/view-request/send-refused", sendMailRefusedRequest);
router.post("/view-request/by-post", getRequestByPost);
router.post("/view-request/by-user", getRequestByUser);
router.post("/view-request/for-landlord", getAllRequestForLandlord);
router.put("/view-request/:id", updateRequest);
// router.put("/view-request/:id", updateRequest);
router.delete("/view-request/:id", deleteRequest);
module.exports = router;
