const express = require("express");
const { checkBody } = require("../middleware/global_middlewares");
const { validateUser } = require("../middleware/user_middleware");
const { createUser } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/", checkBody, validateUser, createUser);

module.exports = router;
