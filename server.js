const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

// passportjs local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("RECIVED Cred", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) return done(null, false, { message: "Incorrect username" });
      const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());

// home path
app.get("/", passport.authenticate('local',{session:false}),function (req, res) {
  res.send("Hello World");
});

// import the person routes
const personRoutes = require("./routes/personRoutes");
app.use("/userData", personRoutes);

// import the menuItem routes
const menuItemRoutes = require("./routes/menuRoutes");
const Person = require("./models/Person");
app.use("/menuItem", menuItemRoutes);

const PORT = process.env.PORT || 3000;

// port listen on 3000
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
