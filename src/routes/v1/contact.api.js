const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
} = require("../../controllers/contact.controller");

const { verifyToken } = require("../../middlewares/permisson");

router.post("/contacts", createContact);
router.get("/contacts", verifyToken, getAllContacts);

module.exports = router;
