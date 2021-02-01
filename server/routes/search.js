const router = require("express").Router();
const mongoose = require("mongoose");

let User = require("../models/user");
let Recipe = require("../models/recipe.js");

router.route("/").get((req, res) => {
    const cuisine = req.query.cuisine;
    const query = Recipe.find({"cuisine": { $regex: cuisine, $options: 'i' }});
    query.lean()
    .exec(function (err, recipe) {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    });

});

module.exports = router;
