const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

	id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
	ingredients: { type: String, required: true },
	description: { type: String, required: true},
  chef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: String, required: true },

});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
