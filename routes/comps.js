const express = require("express");
const router = express.Router();
const pool = require("../db_connect");

router.get("/", (req, res, next) => {
  pool.query("select * from cd_compilations", (err, result) => {
    res.status(200).send(result.rows);
  });
});

router.post("/", (req, res, next) => {
  const { title, year, location, tracks } = req.body;
  pool.query(
    "insert into cd_compilations(title, year, location) values ($1, $2, $3) returning *",
    [title, year, location],
    (err, result) => {
      if (err) {
        const err = new Error("problem inserting title info into database");
        next(err);
      }
      console.log(result.rows[0].title_id);
      console.log(tracks);

      const titleId = result.rows[0].title_id;

      // going to try looping and banging in one insert after another to see if that works
      for (let i = 0; i < tracks.length; i++) {
        const artist = tracks[i].artist;
        const trackName = tracks[i].track_name;
        pool.query(
          "insert into cd_compilations_tracks(artist, track_name, title_id) values($1, $2, $3)",
          [artist, trackName, titleId],
          (err, result) => {
            if (err) {
              const err = new Error(err);
              next(err);
            }
          }
        );
        if (i === tracks.length - 1)
          return res.status(200).send("thanks for the data");
      }
    }
  );
});

module.exports = router;
