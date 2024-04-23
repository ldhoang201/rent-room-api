const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
} = require("../../controllers/contact.controller");

router.post("/contacts", createContact);
router.get("/contacts", getAllContacts);

module.exports = router;
