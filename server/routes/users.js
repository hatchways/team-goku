const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");

let User = require("../models/user");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}

router.route("/").get(verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    if (err) {
      console.log("ERROR: Could not connect to the home route");
      res.sendStatus(403);
    } else {
      res.send("Welcome to the HOME PAGE");
    }
  });
});

router.route("/register").post((req, res) => {
  const _id = new mongoose.Types.ObjectId();

  const { name, location, email, password } = req.body;

  if (!name || !location || !email || !password) {
    res.send("All fields are required");
  }

  if (password.length < 6) {
    res.send("Invalid Credentials");
  }

  password = bcrypt.hashSync(req.body.password, 10);

  const newUser = new User({ _id, name, email, password });

  newUser
    .save()
    .then(() => res.status(201).json("User Created"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  const email = req.body.email;

  if (!validator.isEmail(email)) {
    res.send("Invalid Email");
  }

  User.find({ email }, (err, data) => {
    if (err) {
      res.send(err);
    }

    if (bcrypt.compareSync(req.body.password, data[0]["password"])) {
      const user = { email };
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
      res.cookie("jwt_token", accessToken, { maxAge: 900000 });
      res.send("Login Success");
    } else {
      res.send("Password don't match");
    }
  });
});

router.route("/:id").get((req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .lean()
    .exec((err, user) => {
      if (err) {
        return res.send(err);
      }
      return res.end(JSON.stringify(user));
    });
});

module.exports = router;
