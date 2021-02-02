const router = require("express").Router();

let Recipe = require("../models/recipe.js");

router.route("/").get((req, res) => {
  const cuisines = req.query.cuisine.split(",");
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
