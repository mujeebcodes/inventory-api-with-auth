const express = require("express");
const app = express();

const usersRouter = require("./routes/users.router");
const itemsRouter = require("./routes/items.router");
const { apiKeyAuth } = require("./middleware/middlewares");

app.use(express.json());
app.use("/users", usersRouter);
app.use("/items", apiKeyAuth, itemsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
