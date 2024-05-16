const { handleChat, retrieveByUserQuery } = require("../services/gpt.service");

const chatController = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message);

    const response = await handleChat(message);
    let data;
    if (response.query) {
      data = await retrieveByUserQuery(response.query);
    } else {
      data = response.normal_message;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  chatController,
};
