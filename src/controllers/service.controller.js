const { retrieveAll, update } = require("../services/services.service");
const purchaseHistoryService = require("../services/purchase-history.service");

const getAllServices = async (req, res) => {
  try {
    const services = await retrieveAll();
    return res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching room types:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await update(id, payload);
    return res.status(200).json({ message: "Update service successfully!" });
  } catch (error) {
    console.error("Error fetching room types:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPurchaseHistory = async (req, res, next) => {
  try {
    const purchaseHistory = await purchaseHistoryService.retrieveAll();
    res.json(purchaseHistory);
  } catch (error) {
    next(error);
  }
};

const getPurchaseHistoryByUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const purchaseHistory = await purchaseHistoryService.retrieveByUser(id);
    res.json(purchaseHistory);
  } catch (error) {
    next(error);
  }
};

const savePurchaseHistory = async (req, res, next) => {
  const { user_id, service_id, service_expiry_date } = req.body;
  try {
    await purchaseHistoryService.save(user_id, service_id, service_expiry_date);
    res.status(201).json("Purchase history saved successfully");
  } catch (error) {
    next(error);
  }
};

const getPurchaseCountInRange = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  try {
    const purchaseCounts =
      await purchaseHistoryService.retrievePurchaseCountInRange(
        startDate,
        endDate
      );
    res.json(purchaseCounts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllServices,
  updateService,
  getAllPurchaseHistory,
  getPurchaseHistoryByUser,
  getPurchaseCountInRange,
  savePurchaseHistory,
};
