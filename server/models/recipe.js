const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "User", required: true },
  servingSize: { type: String, required: true },
  requiredStuff: { type: String, required: true },
  picture: { type: String },
  cuisine: {
    type: String,
    enum: [
      "British",
      "American",
      "Caribbean",
      "Chinese",
      "French",
      "Greek",
      "Italian",
      "Mediterranean",
      "Mexican",
      "Morrocan",
      "Japanese",
      "Spanish",
      "Thai",
      "Turkish",
      "Vietnamese",
    ],
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
