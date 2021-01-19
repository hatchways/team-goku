const router = require('express').Router();
const mongoose = require('mongoose');

let Recipe = require('../models/recipe.js')

//Create Recipe
router.route('/new_recipe').post((req, res) => {

	const _id = new mongoose.Types.ObjectId;
	const name = req.body.name;
	const ingredients = req.body.ingredients;
	const description = req.body.description;
  const chef_id = req.body.chef;
  const price = req.body.price;


	//Checks for
	if(name.length == 0){
		res.send("Recipe must have a name");
	}
	if(ingredients.length == 0){
		res.send("Must list ingredients")
	}
  if(description.length == 0){
    res.send("Recipe must have a description");
  }
  if(chef_id.length == 0){
		res.send("Must include chef_id");
	}
  if(price.length == 0){
    res.send("Recipe must have a price");
  }

	//Creates recipe
	const newRecipe = new Recipe( {_id, name, ingredients, description} );

	 //Saves recipe
	 newRecipe.save()
	.then( () => res.status(201).json('Recipe Created'))
	.catch(err => res.status(400).json('Error: '+ err));

});

//Retrieve Recipe by id
router.route('/get_recipe/:id').get((req, res) => {
	const _id = req.params.id;
	Recipe.findById( _id ).lean().exec((err, recipe) => {
    if(err) {return res.send(err)};
    return res.end(JSON.stringify(recipe))
  });
});

//Delete Recipe by id
router.route('/delete_recipe/:id').get((req, res) => {
	const _id = req.params.id;
	Recipe.findByIdAndDelete( _id, (err, result) => {
    if(err) {return res.send(err)};
    return res.send(result)
    });
});

//Update Recipe
router.route('/update_recipe/:id').post((req, res) => {
	Recipe.findByIdAndUpdate( req.params.id, req.body, (err, result) => {
    if(err) {return res.send(err)};
    return res.send(result)
  });
});

//Find recipes by chef
router.route('/get_recipes_by_chef/:chef_id').get((req, res) => {
	Recipe.find()
    .where('chef').equals(req.params.chef_id)
    .exec((err, result) => {
      if(err) {return res.send(err)};
      return res.end(JSON.stringify(recipe))
  });
});

module.exports = router;
