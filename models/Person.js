const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {jwtAuthMiddleware,generateToken}=require('../jwt')
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    emun: ["eng", "doctor", "chef"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  {
    try {
      // hash Password generation
      const salt = await bcrypt.genSalt(10);
      // hashes password generation
      const hashedPassword = await bcrypt.hash(person.password, salt);

      // override the plain password with the hashed one
      person.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  }
});
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
// create person model

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
