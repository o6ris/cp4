const jwt = require("jsonwebtoken");
const models = require("../models");
const { verifyHash } = require("../services/auth");

const validateUser = (req, res) => {
  models.users
    .findOne(req.body)
    .then(async ([user]) => {
      if (user[0]) {
        if (await verifyHash(user[0].hashedpassword, req.body.password)) {
          const myUser = { ...user[0] };
          delete myUser.hashedpassword;
          const token = jwt.sign(myUser, process.env.JWT_AUTH_SECRET, {
            expiresIn: "24h",
          });

          res
            .status(201)
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .json(myUser);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  validateUser,
};
