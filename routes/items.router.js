const express = require("express");
const router = express.Router();
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemsControllers");
const { checkAdmin } = require("../middleware/middlewares");

router.get("/", getAllItems);
router.get("/:id", getItem);
router.post("/", checkAdmin, createItem);
router.patch("/:id", checkAdmin, updateItem);
router.delete("/:id", checkAdmin, deleteItem);

module.exports = router;
