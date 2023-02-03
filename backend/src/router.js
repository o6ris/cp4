const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const cityControllers = require("./controllers/cityControllers");
const reviewControllers = require("./controllers/reviewControllers");
const ratingControllers = require("./controllers/ratingControllers");
const validators = require("./services/validators");
const checkAuth = require("./middleware/checkAuth");

router.post("/login", validators.checkUser, userControllers.validateUser);

router.use(checkAuth);

router.get("/cities", cityControllers.browse);
router.get("/cities/:id", cityControllers.read);

router.get("/cityReviews/:id", reviewControllers.browse);
router.post("/review", reviewControllers.add);

// -- Route just to displayed all rating for DEV
router.get("/allRatings/:id", ratingControllers.displayAll);

router.get("/rating/:id", ratingControllers.browse);
router.post("/rating", ratingControllers.add);
router.put("/rating/:id", ratingControllers.edit);
router.delete("/rating/:id", ratingControllers.destroy);

module.exports = router;
