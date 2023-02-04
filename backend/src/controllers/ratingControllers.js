const models = require("../models");

const displayAll = (req, res) => {
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

const read = (req, res) => {
  models.rating
    .findOneByReview(req.params.id, req.auth.id)
    .then(([rows]) => {
      res.status(200).send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browse = (req, res) => {
  models.rating
    .findWhoAgreesByReview(req.params.id, req.query.isAgree)
    .then(([rows]) => {
      res.status(200).send(rows[0]);
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
          .addReview(req.auth.id, rating)
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

const edit = (req, res) => {
  models.rating
    .editReview(req.body, req.params.id, req.auth.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.rating
    .delete(req.params.id, req.auth.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
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
  edit,
  destroy,
  displayAll,
  read,
};
