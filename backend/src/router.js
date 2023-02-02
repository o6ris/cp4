const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const validators = require("./services/validators");

router.post("/login", validators.checkUser, userControllers.validateUser);

module.exports = router;
