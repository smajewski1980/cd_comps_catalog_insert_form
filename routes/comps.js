const express = require("express");
const router = express.Router();
const pool = require("../db_connect");

router.get("/", (req, res, next) => {
  pool.query("select * from cd_compilations", (err, result) => {
    res.status(200).send(result.rows);
  });
});

module.exports = router;
