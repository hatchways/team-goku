#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('../models/user.js');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function userCreate(name, email, password, isChef, about_me, fav_recipes, chef_recipes, cb) {
  userDetails = {
    name: name,
    email: email,
    password: password,
    isChef: isChef,
    about_me: about_me,
    fav_recipes: fav_recipes,
    chef_recipes: chef_recipes
  }

  var user = new User(userDetails);

  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Recipe: ' + user);
    cb(null, user)
  }  );
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate('John Smith', 'js@email.com', 'jspassword', true, "this is me", [], [], callback);
        }
      ],
      cb
    );
}

async.series([
    createUsers
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Finished!');

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
