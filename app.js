const express = require("express");
const myknex = require("./src/config/knex");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.APP_LOCAL_PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

myknex
  .raw("SELECT 1")
  .then(() => {
    console.log("Knex connection successful");
  })
  .catch((err) => {
    console.error("Error connecting to Knex:", err);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
