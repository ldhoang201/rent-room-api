const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes/index");
require("dotenv").config();

const app = express();
const PORT = process.env.APP_LOCAL_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
