const models = require("../models");

const browse = (req, res) => {
  models.rating
    .findAllByReview(req.params.id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const rating = req.body;
  models.rating
    .findOneByReview(rating.id_review, req.auth.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        models.rating
          .insert(req.auth.id, rating)
          .then(([result]) => {
            res.location(`/items/${result.insertId}`).sendStatus(201);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      } else {
        res.send("You're already agree!");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  add,
};
