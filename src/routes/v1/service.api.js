const express = require("express");
const {
  getAllServices,
  updateService,
  getAllPurchaseHistory,
  getPurchaseCountInRange,
  getPurchaseHistoryByUser,
  savePurchaseHistory,
} = require("../../controllers/service.controller");

const router = express.Router();

router.get("/services", getAllServices);
router.get("/services/purchase-history", getAllPurchaseHistory);
router.get("/services/purchase-history/:id", getPurchaseHistoryByUser);
router.post(
  "/services/purchase-history/count-in-range",
  getPurchaseCountInRange
);
router.post("/services/purchase-history", savePurchaseHistory);

router.put("/services/:id", updateService);

module.exports = router;
