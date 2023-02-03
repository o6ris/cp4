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

module.exports = {
  browse,
};
