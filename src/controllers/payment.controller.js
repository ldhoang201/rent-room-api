const { save } = require("../services/transaction.service");
const { updateBalance } = require("../services/user.service");
const PayOS = require("@payos/node");
const payosConfig = require("../config/payos");

const payos = new PayOS(
  payosConfig.client_id,
  payosConfig.api_key_payos,
  payosConfig.check_sum
);

function getRandomOrderCode(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createPaymentLink = async (req, res, next) => {
  try {
    const { amount, description } = req.body;

    const order = {
      amount: amount,
      description: description,
      orderCode: getRandomOrderCode(1000, 99999),
      returnUrl: payosConfig.returnURL,
      cancelUrl: payosConfig.cancelURL,
    };

    const paymentLink = await payos.createPaymentLink(order);

    res.json({ checkoutUrl: paymentLink.checkoutUrl });
  } catch (error) {
    console.error("Error creating payment link:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the payment link.",
    });
  }
};

const payOsReturn = async (req, res, next) => {
  try {
    const payload = req.body;

    const order = await payos.getPaymentLinkInformation(payload.transaction_id);

    const saveData = {
      user_id: payload.user_id,
      amount: order.amount,
      order_code: order.orderCode,
      description:
        order.transactions.length > 0 ? order.transactions[0].description : "",
      status: order.status,
    };

    if (payload.status === "PAID") {
      await updateBalance(payload.user_id, order.amount);
    }

    await save(saveData);

    res.status(200).json({
      success: true,
      message: "Transaction data has been saved successfully.",
    });
  } catch (error) {
    console.error("Error saving transaction data:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while saving transaction data.",
    });
  }
};
module.exports = {
  createPaymentLink,
  payOsReturn,
};
