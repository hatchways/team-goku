const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

	id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true } ,
	email: { type: String, required: true, unique: true } ,
	password: { type: String, required: true },
	isChef: { type: Boolean, required: true },
	about_me: String,
	fav_recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
	chef_recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],


});

const User = mongoose.model('User', userSchema);
module.exports = User;
