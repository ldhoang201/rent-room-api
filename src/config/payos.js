require("dotenv").config();
// module.exports = {
//   vnp_TmnCode: process.env.VNP_TMNCODE,
//   vnp_HashSecret: process.env.VNP_HASHSECRET,
//   vnp_Url: process.env.VNP_URL,
//   vnp_ReturnUrl: process.env.VNP_RETURNURL,
// };

module.exports = {
  client_id: process.env.CLIENT_ID,
  api_key_payos: process.env.API_KEY_PAYOS,
  check_sum: process.env.CHECK_SUM,
  returnURL: process.env.RETURN_URL,
  cancelURL: process.env.RETURN_URL,
};
