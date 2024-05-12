const { save, retrieveAll } = require("../services/contact.service");

const createContact = async (req, res) => {
  const { fullName, email, phone, message } = req.body;
  try {
    await save(fullName, email, phone, message);
    res
      .status(201)
      .json({ success: true, message: "Save contact successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await retrieveAll();
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
