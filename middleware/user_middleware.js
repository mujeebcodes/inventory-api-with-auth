const fs = require("fs");

const validateUser = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({ msg: "must provide username" });
  }
  if (!req.body.password) {
    return res.status(400).json({ msg: "must provide password" });
  }

  next();
};

module.exports = { validateUser };
