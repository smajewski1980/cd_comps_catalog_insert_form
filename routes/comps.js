const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("endpoint is working");
  res.status(200).send("this is sent from the server");
});

module.exports = router;
