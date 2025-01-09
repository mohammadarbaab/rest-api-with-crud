const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// post method for menuItem data
router.post("/", async (req, res) => {
  try {
    const menuData = req.body;
    const newMenuItem = new MenuItem(menuData);
    const savedMenuItem = await newMenuItem.save();
    console.log("menuItem saved succesfully", savedMenuItem);
    res.status(200).json(savedMenuItem);
    console.log("data saved succesfully", savedMenuItem);
  } catch (err) {
    res.status(400).send(err);
    console.log("data can not be sent");
  }
});

// get method for menuitem
router.get("/", async (req, res) => {
  try {
    const menuFetchData = await MenuItem.find();
    console.log("data fetch sucsessfuly");
    res.status(200).json(menuFetchData);
  } catch (error) {
    console.log("data can not be fetch");
    res.status(400).send(error);
  }
});

// get method with params filter with end point
router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (
      tasteType === "sweet" ||
      tasteType === "sour" ||
      tasteType === "spicy"
    ) {
      const tasteData = await MenuItem.find({ taste: tasteType });
      console.log("data fetch sucsessfuly");
      res.status(200).json(tasteData);
    } else {
      res.status(400).json({ error: "invalid work type" });
    }
  } catch (err) {
    console.log("data can not be fetch");
    res.status(400).send(err);
  }
});

module.exports = router;
