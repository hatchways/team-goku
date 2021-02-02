const router = require("express").Router();

let Recipe = require("../models/recipe.js");

router.route("/").get((req, res) => {
  // expected route 
  // multiple cuisine types .../search?cuisines=american,british, ...
  // or a single cusine type .../search?cuisines=american
  const cuisines = req.query.cuisines.split(",");
  if (cuisines.length < 1) {
    // If no cuisines in cuisine query
    res.status(400).send("Incorrect input. No cuisine types in request query.");
  }
  const cuisinesTransformed = cuisines.map((cuisine) => {
    // Remove white space
    cuisine = cuisine.trim();
    // Capitallize first letter
    return cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
  });
  const query = Recipe.find({ cuisine: { $in: cuisinesTransformed } });
  query.lean().exec(function (err, recipe) {
    if (err) {
      res.status(500).send(err);
    }
    res.json(recipe);
  });
});

module.exports = router;
