const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const cityControllers = require("./controllers/cityControllers");
const reviewControllers = require("./controllers/reviewControllers");
const ratingControllers = require("./controllers/ratingControllers");
const validators = require("./services/validators");

router.post("/login", validators.checkUser, userControllers.validateUser);

router.get("/cities", cityControllers.browse);
router.get("/cities/:id", cityControllers.read);

router.get("/cityReviews/:id", reviewControllers.browse);
router.post("/review", reviewControllers.add);

router.get("/ratings/:id", ratingControllers.browse);

module.exports = router;
