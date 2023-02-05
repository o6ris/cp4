const models = require("../models");

const datePost = () => {
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

const browse = (req, res) => {
  models.reviews
    .findAllByCity(req.params.id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseAvgScore = (req, res) => {
  models.reviews
    .getAvgScores(req.params.id)
    .then(([rows]) => {
      res.status(200).send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const review = req.body;
  review.dateReview = datePost();
  models.reviews
    .findOneByUser(review.id_city, req.auth.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        models.reviews
          .insert(review, req.auth.id)
          .then(([result]) => {
            res.location(`/items/${result.insertId}`).sendStatus(201);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      } else {
        res.status(401).send("You have already posted a review!");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseAvgScore,
  add,
};
