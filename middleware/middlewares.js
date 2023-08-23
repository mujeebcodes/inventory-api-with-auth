const fs = require("fs");
const path = require("path");
const dbDir = path.join(__dirname, "../db/users.json");
const users = JSON.parse(fs.readFileSync(dbDir, "utf8"));

const checkBody = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      msg: "must provide body",
    });
  }
  next();
};

const validateUserCreation = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({ msg: "must provide username" });
  }
  const found = users.find((user) => user.username === req.body.username);
  if (found !== undefined) {
    return res.status(409).json({
      msg: "user already exists",
    });
  }
  next();
};

const apiKeyAuth = (req, res, next) => {
  const api_key = req.headers.api_key;
  if (!api_key) {
    return res.status(403).json({ msg: "must provide an API key" });
  }
  const existingUser = users.filter((user) => user.api_key === api_key);
  if (existingUser.length === 0) {
    return res.status(403).json({ msg: "You are not authorized" });
  }
  next();
};

const checkAdmin = (req, res, next) => {
  const api_key = req.headers.api_key;
  const existingUser = users.find((user) => user.api_key === api_key);
  if (existingUser.user_type !== "admin") {
    return res.status(403).json({
      msg: "Not authorized. Admin only route",
    });
  }
  next();
};

module.exports = { checkBody, validateUserCreation, apiKeyAuth, checkAdmin };
