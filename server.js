require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const comps = require("./routes/comps");

app.use(bodyParser.json());
app.use("/comps", comps);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
