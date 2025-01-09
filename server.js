const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

// home path
app.get("/", function (req, res) {
  res.send("Hello World");
});

// import the person routes
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// import the menuItem routes
const menuItemRoutes = require("./routes/menuRoutes");
app.use("/menuItem", menuItemRoutes);

const PORT=process.env.PORT || 3000

// port listen on 3000
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
