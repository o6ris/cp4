const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const cityControllers = require("./controllers/cityControllers");
const validators = require("./services/validators");

router.post("/login", validators.checkUser, userControllers.validateUser);

router.get("/cities", cityControllers.browse);

module.exports = router;
