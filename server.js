require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
