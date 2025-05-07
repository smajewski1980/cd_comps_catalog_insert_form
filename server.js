require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const comps = require("./routes/comps");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/comps", comps);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
