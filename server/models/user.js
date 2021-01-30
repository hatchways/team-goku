const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isChef: { type: Boolean, required: true, default: false },
  location: { type: String },
  aboutMe: String,
  favRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  picture: { type: String },
  favCuisines: { type: [String] },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
