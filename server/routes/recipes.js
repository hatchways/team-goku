const router = require('express').Router();
const mongoose = require('mongoose');

let Recipe = require('../models/recipe.js')

router.route('/').get((req, res) => {
  return res.send('test');
});

//Create Recipe
router.route('/').post((req, res) => {

  const _id = new mongoose.Types.ObjectId;
  const name = req.body.name;
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const price = req.body.price;
  const chef = req.body.chef;
  const servingSize = req.body.servingSize;
  const requiredStuff = req.body.requiredStuff;
  const picture = req.body.picture;


  //Checks for
  if(!name){
  	res.send("Recipe must have a name");
  }
  if(!ingredients){
  	res.send("Must list ingredients")
  }
  if(!description){
    res.send("Recipe must have a description");
  }
  if(!price){
    res.send("Recipe must have a price");
  }

  //Creates recipe
  const newRecipe = new Recipe( {_id, name, ingredients, description, price, chef, servingSize, requiredStuff, picture} );

   //Saves recipe
   newRecipe.save()
  .then( () => res.status(201).json('Recipe Created'))
  .catch(err => res.status(400).json('Error: '+ err));

});

//Retrieve Recipe by id
router.route('/:id').get((req, res) => {
	const _id = req.params.id;
	Recipe.findById( _id ).lean().exec((err, recipe) => {
    if(err) {return res.send(err)};
    return res.end(JSON.stringify(recipe))
  });
});

//Delete Recipe by id
router.route('/').delete((req, res) => {
  console.log('Request body' + req.body);
	const _id = req.body.id;
	Recipe.findByIdAndDelete( _id, (err, result) => {
    if(err) {return res.send(err)};
    return res.send(result)
    });
});

//Update Recipe
router.route('/update_recipe/:id').post((req, res) => {
  const _id = req.body.id;
  console.log('Request body' + req.body);
	Recipe.findByIdAndUpdate( _id, req.body, { 'new': true })
    .exec((err, result) => {
    if(err) {return res.send(err)};
    return res.send(result)
  });
});

//Find recipes by chef
router.route('/chef/:chef_id').get((req, res) => {
	Recipe.find()
    .where('chef').equals(req.params.chef_id)
    .exec((err, result) => {
      if(err) {return res.send(err)};
      return res.end(JSON.stringify(recipe))
  });
});

module.exports = router;
