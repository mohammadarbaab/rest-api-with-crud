const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

// passportjs local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // console.log("RECIVED Cred", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) return done(null, false, { message: "Incorrect username" });
      // const isPasswordMatch = user.password === password ? true : false;
      const isPasswordMatch =await user.comparePassword(password);
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
module.exports = passport;
