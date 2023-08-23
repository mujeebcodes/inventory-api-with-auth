const fs = require("fs");
const path = require("path");
const dbDir = path.join(__dirname, "../db/items.json");

const items = JSON.parse(fs.readFileSync(dbDir, "utf8"));

const getAllItems = (req, res) => {
  const result = JSON.parse(items);
  return res.status(200).json({
    msg: "success",
    hits: result.length,
    data: result,
  });
};

const getItem = (req, res) => {
  const id = Number(req.params.id);
  if (id > items.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  const itemRequested = items.filter((item) => item.id === id);
  res.status(200).json({
    status: "success",
    data: {
      item: itemRequested,
    },
  });
};

const createItem = (req, res) => {
  const newItem = { ...req.body, id: items.length + 1 };
  items.push(newItem);
  fs.writeFile(dbDir, JSON.stringify(items), (err) => {
    if (err) {
      res.status(501).json({
        status: "fail",
        message: "Unable to add new item",
      });
    }
    res.status(200).json({ status: "success", data: { item: newItem } });
  });
};

const updateItem = (req, res) => {
  const id = Number(req.params.id);
  const detailsToUpdate = req.body;
  let item = items.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  item = { ...item, ...detailsToUpdate };
  items[id - 1] = item;
  fs.writeFile(dbDir, JSON.stringify(items), (err) => {
    if (err) {
      res.status(501).json({
        status: "fail",
        message: "Unable to update item",
      });
    }
    res.status(200).json({ status: "success", data: { item } });
  });
};
const deleteItem = (req, res) => {
  if (Number(req.params.id) > items.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  const index = Number(req.params.id) - 1;
  items.splice(index, 1);
  fs.writeFile(dbDir, JSON.stringify(items), (err) => {
    if (err) {
      res.status(501).json({
        status: "fail",
        message: "Unable to update item",
      });
    }
    res.status(200).json({ status: "success", data: null });
  });
};

module.exports = { getAllItems, getItem, createItem, updateItem, deleteItem };
