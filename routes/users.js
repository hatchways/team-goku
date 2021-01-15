const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let User = require('../models/user');

//HOME PAGE
router.route('/').get(authenticateToken, (req, res) => {

	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
	res.json(User.find(user => user.email = req.body.email));
});

//REGISTER
router.route('/register').post((req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = bcrypt.hashSync(req.body.password, 10);
	//CREATE NEW USER
	const newUser = new User({name, email, password});
	 //REGISTER NEW USER
	 newUser.save()
	.then( () => res.status(201).json('User added!'))
	.catch(err => res.status(400).json('Error: '+ err));	
});


//LOGIN
router.route('/login').post((req, res) => {
	//AUTENTICATE USER
	const email = req.body.email;
	User.find( { email : req.body.email }, (err, data) => {

		try
		{		
			if(bcrypt.compareSync(req.body.password, data[0]['password'])) 
			{
				// PASSWORDS MATCH
				const user = { email: req.body.email } ;
				const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
				res.json({ accessToken : accessToken });
				res.send('Success');
			}//if
			else 
			{
				// PASSWORDS DON'T MATCH
				res.send("Password don't match");
			}//else
		}//try
		catch
		{
			//CANNOT FIND USER
			res.send('Cannot find user');
		}//catch
	});
});

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = router;