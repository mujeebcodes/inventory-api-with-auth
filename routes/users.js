const express = require("express");
const router = express.Router();

router.post("/", () => {
  console.log("working");
});

module.exports = router;
