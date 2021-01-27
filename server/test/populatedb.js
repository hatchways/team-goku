#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var User = require("../models/user.js");
var Recipe = require("../models/recipe.js");

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://teamgoku:12345@cluster0.czhfm.mongodb.net/chefdb?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var users = [];
var recipes = [];

function userCreate(
  name,
  email,
  password,
  isChef,
  location,
  aboutMe,
  favRecipes,
  cb
) {
  userDetails = {
    name: name,
    email: email,
    password: password,
    isChef: isChef,
    location: location,
    aboutMe: aboutMe,
    favRecipes: favRecipes,
  };

  var user = new User(userDetails);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function recipeCreate(
  name,
  ingredients,
  description,
  price,
  chef,
  servingSize,
  requiredStuff,
  picture,
  cb
) {
  recipeDetails = {
    name: name,
    ingredients: ingredients,
    description: description,
    price: price,
    chef: chef,
    servingSize: servingSize,
    requiredStuff: requiredStuff,
    picture: picture,
  };

  var recipe = new Recipe(recipeDetails);

  recipe.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Recipe: " + recipe);
    recipes.push(recipes);
    cb(null, recipe);
  });
}

function createUsers(cb) {
  async.parallel(
    [
      function (callback) {
        userCreate(
          "Atsushi Mikazuki",
          "am@email.com",
          "ampassword",
          true,
          "Toronto,Canada",
          "this is me",
          [],
          callback
        );
      },
    ],
    cb
  );
}

//Have to call after creating users
function createRecipes(cb) {
  async.parallel(
    [
      function (callback) {
        recipeCreate(
          "Dynamite Rolls",
          "Shrimp Tempura, Roe, Cucumber",
          "Delicious Dynamite Rolls",
          20.0,
          users[0],
          "4",
          "Plates, knives",
          "https://gokuchefsmenu.s3.us-east-2.amazonaws.com/6e2b6f7627198ff966790ecae3644cb4c5ff69c9.png",
          callback
        );
      },
      function (callback) {
        recipeCreate(
          "4 Salmon Rolls",
          "Salmon, Seaweed, Rice",
          "Fresh Salmon",
          20.0,
          users[0],
          "3",
          "Plates, knives",
          "https://gokuchefsmenu.s3.us-east-2.amazonaws.com/7924652b235b36f5f5dcef31621daa62480ce67d.png",
          callback
        );
      },
      function (callback) {
        recipeCreate(
          "Sashimi",
          "Raw Tuna",
          "Raw Fish",
          20.0,
          users[0],
          "2",
          "Plates, knives",
          "https://gokuchefsmenu.s3.us-east-2.amazonaws.com/8e9be840c3490c329fd7790e8eb889b93dfa45a9.png",
          callback
        );
      },
      function (callback) {
        recipeCreate(
          "Shrimp Tempura",
          "Shrimp in Tempura Batter",
          "Salty",
          20.0,
          users[0],
          "1",
          "Plates, knives",
          "https://gokuchefsmenu.s3.us-east-2.amazonaws.com/5644952c731e9c37e11b2d22f1aac39f8623025b.png",
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createUsers, createRecipes],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Finished!");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
