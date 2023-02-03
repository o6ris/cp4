const models = require("../models");

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

module.exports = {
  browse,
};
