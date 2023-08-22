const express = require("express");
const app = express();

const usersRouter = require("./routes/users");

app.use(express.json());
app.use("/users", usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
