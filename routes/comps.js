const express = require("express");
const router = express.Router();
const pool = require("../db_connect");

router.get("/", (req, res, next) => {
  pool.query("select * from cd_compilations", (err, result) => {
    res.status(200).send(result.rows);
  });
});

router.post("/", (req, res, next) => {
  console.log("the client is hittin this");
  const { title, year, location, tracks } = req.body;
  if (!title || !year || !location || tracks.length === 0) {
    const err = new Error("there is an empty field");
    err.status = 400;
    next(err);
  } else if (isNaN(year)) {
    const err = new Error("year field must be a number");
    err.status = 400;
    next(err);
  } else {
    pool.query(
      "insert into cd_compilations(title, year, location) values ($1, $2, $3) returning *",
      [title, year, location],
      (err, result) => {
        if (err) {
          console.log(err);
          const error = new Error("problem inserting title info into database");
          next(error);
        }
        console.log(result.rows[0].title_id);
        console.log(tracks);

        const sqlArray = [];

        const titleId = result.rows[0].title_id;
        // have to construct an sql string dynamically since we never know how many tracks are on a disc
        let sqlString =
          "insert into cd_compilations_tracks(artist, track_name, title_id) values";
        // this counter keeps track of the $1, $2 etc in the loop
        let variableCounter = 1;
        for (let i = 0; i < tracks.length; i++) {
          sqlString += `($${variableCounter}, $${variableCounter + 1}, $${
            variableCounter + 2
          })`;
          // using variables 3 at a time
          variableCounter += 3;
          // push the corresponding data to the data array to match the variables
          sqlArray.push(tracks[i].artist, tracks[i].track_name, titleId);
          if (i !== tracks.length - 1) {
            sqlString += ",";
          }
        }
        // send that shit yo...
        pool.query(sqlString, sqlArray, (err, result) => {
          if (err) {
            const error = new Error(err);
            next(error);
          }
        });
        return res.status(201).send();
      }
    );
  }
});

module.exports = router;
