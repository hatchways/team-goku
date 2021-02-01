const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");

let User = require("../models/user");

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    //Get token from array
    const bearerToken = bearer[1];

    //Set the Token
    req.token = bearerToken;

    //Next middleware
    next();
  } //if
  else {
    //Forbidden
    res.sendStatus(403);
  } //else
} //verifyToken

//HOME PAGE
router.route("/").get(verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    if (err) {
      console.log("ERROR: Could not connect to the home route");
      res.sendStatus(403);
    } //if
    else {
      //If token is successfully verified
      res.send("Welcome to the HOME PAGE");
    } //else
  });
});

//REGISTER
router.route("/register").post((req, res) => {
  const _id = new mongoose.Types.ObjectId();
  const name = req.body.name;
  let email = req.body.email;
  var password = req.body.password;
  //VALIDATION
  if (name.length == 0) {
    res.send("Invalid Name");
  }
  if (!validator.isEmail(email)) {
    res.send("Invalid Email");
  }
  if (password.length < 6) {
    res.send("Invalid Password");
  }
  //ENCRYPT PASSWORD
  password = bcrypt.hashSync(req.body.password, 10);
  //CREATE NEW USER
  const newUser = new User({ _id, name, email, password });
  //REGISTER NEW USER
  newUser
    .save()
    .then(() => res.status(201).json("User Created"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//LOGIN
router.route("/login").post((req, res) => {
  const email = req.body.email;
  //VALIDATE USER
  if (!validator.isEmail(email)) {
    res.status(401).send("Incorrect login");
  }
  //AUTENTICATE USER
  User.find({ email: req.body.email }, (err, data) => {
    if (err) {
      res.send(err);
    } //if
    //Check password
    if (bcrypt.compareSync(req.body.password, data[0]["password"])) {
      // PASSWORDS MATCH
      //Create JWT accessToken
      const user = { email: req.body.email };
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
      res
        .cookie("token", accessToken, {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //thirty days
          secure: false, // set to true if your using https
          httpOnly: true,
          sameSite: true,
        })
        .json({ user: email });
    } else {
      res.status(401).send("Incorrect login");
    }
  });
});

//Retrieve user info by id
router.route("/:id").get((req, res) => {
  const _id = req.params.id;
  User.findById(_id, "name isChef location aboutMe picture")
    .lean()
    .exec((err, user) => {
      if (err) {
        return res.send(err);
      }
      return res.end(JSON.stringify(user));
    });
});

//Update User
router.route("/update_user/:id").post((req, res) => {
  const _id = req.body.id;
  console.log("Request body" + req.body);
  Recipe.findByIdAndUpdate(_id, req.body, { new: true }).exec((err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });

//LOGOUT
router.route("/logout").get((req, res) => {
  console.log(req.cookies.token);
  res.clearCookie("token");
  res.status(200).send("Log out successful.");

});

module.exports = router;
