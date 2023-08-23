const fs = require("fs");
const path = require("path");
const dbDir = path.join(__dirname, "../db/users.json");
const { v4: uuidv4 } = require("uuid");

const users = JSON.parse(fs.readFileSync(dbDir, "utf8"));

const createUser = async (req, res) => {
  const user = req.body;
  user.api_key = uuidv4();
  if (user.username === "mujeeb") {
    user.user_type = "admin";
  } else {
    user.user_type = "user";
  }
  users.push(user);
  fs.writeFile(dbDir, JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({
        msg: "unable to create user",
      });
    }
    res.status(200).json({
      msg: "user created successfully",
      data: user,
    });
  });
};

module.exports = { createUser };
