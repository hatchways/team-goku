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
var Recipe = require ('../models/recipe.js');



var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://teamgoku:12345@cluster0.czhfm.mongodb.net/chefdb?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var users=[];
var recipes=[];


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
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

function recipeCreate(name, ingredients,description, chef, serving_size, price, cb) {
  recipeDetails = {
    name: name,
    ingredients: ingredients,
    description: description,
    chef: chef,
    serving_size: serving_size,
    price: price,
  }

  var recipe = new Recipe(recipeDetails);

  recipe.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Recipe: ' + recipe);
    recipes.push(recipes)
    cb(null, recipe)
  }  );
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate('John Smith', 'js@email.com', 'jspassword', true, "this is me", [], [], callback);
        },
        function(callback) {
          userCreate('Atsushi Mikazuki', 'am@email.com', 'ampassword', true, "this is me", [], [], callback);
        },
        function(callback) {
          userCreate('Akira Ryuichi', 'ar@email.com', 'arpassword', true, "this is me", [], [], callback);
        },
        function(callback) {
          userCreate('Satoshi Shinichi', 'ss@email.com', 'sspassword', true, "this is me", [], [], callback);
        }
      ],
      cb
    );
}

//Have to call after creating users
function createRecipes(cb) {
    async.parallel([
        function(callback) {
          recipeCreate('Dynamite Rolls', 'Shrimp Tempura, Roe, Cucumber', 'Delicious Dynamite Rolls', users[0], "4", '$20', callback);
        },
        function(callback) {
          recipeCreate('4 Salmon Rolls', 'Salmon, Seaweed, Rice', 'Fresh Salmon', users[1], "4", '$20', callback);
        },
        function(callback) {
          recipeCreate('Sashimi', 'Raw Tuna', 'Raw Fish', users[2], "4", '$20', callback);
        },
        function(callback) {
          recipeCreate('Shrimp Tempura', 'Shrimp in Tempura Batter', 'Salty', users[3], "4", '$20', callback);
        },
      ],
      cb
    );
}

async.series([
    createUsers,
    createRecipes
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
