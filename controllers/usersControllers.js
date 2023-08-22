const fs = require("fs");
const path = require("path");
const dbDir = path.join(__dirname, "../db/users.json");

const users = fs.readFileSync(dbDir, "utf8");

const createUser = async (req, res) => {
  const user = req.body;
  user.api_key = `${user.username}_${user.password}`;
  if (user.username === "mujeeb") {
    user.user_type = "admin";
  } else {
    user.user_type = "user";
  }
  const updatedUsers = [...users, user];
  fs.writeFile(dbDir, JSON.stringify(updatedUsers), "utf8", (err) => {
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
