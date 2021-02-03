const router = require("express").Router();

let Recipe = require("../models/recipe.js");

router.route("/:cuisines").get((req, res) => {
  // expected route
  // multiple cuisine types .../search?cuisines=american,british, ...
  // or a single cusine type .../search?cuisines=american
  let cuisines = req.params.cuisines.split(",");
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
  console.log(cuisinesTransformed);
  const query = Recipe.find({ cuisine: { $in: cuisinesTransformed } });
  query.lean().exec(function (err, recipe) {
    if (err) {
      res.status(500).send(err);
    }
    res.json(recipe);
  });
});

module.exports = router;
