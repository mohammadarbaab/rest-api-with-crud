const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport=require('./auth')

const bodyParser = require("body-parser");

app.use(bodyParser.json());

// middleware work console date and time user click which url
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

// home path
app.get("/", localAuthMiddleware, function (req, res) {
  res.send("Hello Guys This is Mein Bca Wala");
});

// import the person routes
const personRoutes = require("./routes/personRoutes");
app.use("/userData", personRoutes);

// import the menuItem routes
const menuItemRoutes = require("./routes/menuRoutes");

app.use("/menuItem", menuItemRoutes);


const PORT = process.env.PORT || 3000;

// port listen on 3000
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
