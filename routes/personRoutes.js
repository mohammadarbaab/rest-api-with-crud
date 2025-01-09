const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// post method for person data
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const savedPerson = await newPerson.save();
    console.log("responnse done", savedPerson);
    res.status(200).json(savedPerson);
    console.log("data saved succesfully", savedPerson);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get method for person data
router.get("/", async (req, res) => {
  try {
    const psData = await Person.find();
    console.log("fetch data");
    res.status(200).json(psData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get method with params filter with end point
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const personData = await Person.find({ work: workType });
      console.log("data fetch sucsessfuly");
      res.status(200).json(personData);
    } else {
      res.status(400).json({ error: "invalid work type" });
    }
  } catch (err) {
    console.log("data can not be fetch");
    res.status(400).send(err);
  }
});

// put method for update any user data
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log("data can not be updated");
    res.status(500).json({ error: error.message });
  }
});

// delete method for delete person for any user
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "person not found" });
    } else {
      console.log("data deleted");
    }
  } catch (err) {
    console.log("data can not be deleted");
  }
});

module.exports = router;
