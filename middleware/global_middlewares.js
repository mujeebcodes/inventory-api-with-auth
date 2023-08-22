const express = require("express");

const checkBody = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      msg: "must provide body",
    });
  }
  next();
};

module.exports = { checkBody };
