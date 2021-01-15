const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

	name: { type: String, required: true } ,
	email: { type: String, required: true, unique: true } ,
	password: { type: String, required: true }

});


// var userSchema = new Schema({
//     name: {
//         type: String,
//         required: 'Please enter your name',
//         trim: true
//     },
//     email: {
//         type: String,
//         unique:true,
//         required: 'Please enter your email',
//         trim: true,
//         lowercase:true,
        
//     },
//     password: {
//         type: String,
//         required: true
//     },
    
//     resetPasswordToken:String
// });

const User = mongoose.model('User', userSchema);

module.exports = User;