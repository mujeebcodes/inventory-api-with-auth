const express = require("express");
const { checkBody } = require("../middleware/middlewares");
const { validateUserCreation } = require("../middleware/middlewares");
const { createUser } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/", checkBody, validateUserCreation, createUser);

module.exports = router;
