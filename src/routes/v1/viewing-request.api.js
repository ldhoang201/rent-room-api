const express = require("express");
const router = express.Router();
const {
  getRequestByPost,
  getAllRequestForLandlord,
  createRequest,
  updateRequest,
  deleteRequest,
} = require("../../controllers/viewing-request");

router.post("/view-request", createRequest);
router.post("/view-request/by-post", getRequestByPost);
router.put("/view-request/:id", updateRequest);
router.put("/view-request/:id", updateRequest);
router.delete("/view-request/:id", deleteRequest);
router.post("/view-request/for-landlord", getAllRequestForLandlord);
module.exports = router;
