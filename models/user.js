const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

	id: mongoose.Schema.Types.ObjectId,
	ingredients: { type:[String], required: true },
	description: { type: String, required: true},
	
});

const userSchema = new Schema({

	id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true } ,
	email: { type: String, required: true, unique: true } ,
	password: { type: String, required: true },
	isChef: { type: Boolean, required: true },
	fav_recipes: [recipeSchema],
	chef_recipes: [recipeSchema],


});

const User = mongoose.model('User', userSchema);
module.exports = User;
