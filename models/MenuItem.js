const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  taste: {
    type: String,
    enum: ["sweet", "sour", "spicy"],
    default: "sweet",
    required: true,
  },
  is_drunk: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
// Export the model
module.exports = MenuItem;
