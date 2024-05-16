const knex = require("../config/knex");
const { retrieveServiceNameById } = require("../services/services.service");

const retrieveAll = async () => {
  try {
    const purchaseHistory = await knex.select("*").from("purchase_history");
    return purchaseHistory;
  } catch (error) {
    throw error;
  }
};

const retrieveByUser = async (userId) => {
  try {
    const purchaseHistory = await knex
      .select("service_id", "purchase_date", "service_expiry_date")
      .from("purchase_history")
      .where({ user_id: userId })
      .orderBy("purchase_date", "desc");
    const result = await Promise.all(
      purchaseHistory.map(async (row) => {
        const serviceName = await retrieveServiceNameById(row.service_id);
        return {
          service_name: serviceName.service_name,
          purchase_date: row.purchase_date,
          service_expiry_date: row.service_expiry_date,
        };
      })
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const save = async (userId, serviceId, serviceExpiryDate) => {
  try {
    await knex("purchase_history").insert({
      user_id: userId,
      service_id: serviceId,
      service_expiry_date: serviceExpiryDate,
    });
  } catch (error) {
    throw error;
  }
};

const retrievePurchaseCountInRange = async (startDate, endDate) => {
  try {
    const purchaseCounts = await knex("purchase_history")
      .select("service_id")
      .count("service_id as purchase_count")
      .whereBetween("purchase_date", [startDate, endDate])
      .groupBy("service_id");

    const result = await Promise.all(
      purchaseCounts.map(async (row) => {
        const serviceName = await retrieveServiceNameById(row.service_id);
        return {
          serviceName: serviceName.service_name,
          purchaseCount: row.purchase_count,
        };
      })
    );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveAll,
  retrieveByUser,
  retrievePurchaseCountInRange,
  save,
};
