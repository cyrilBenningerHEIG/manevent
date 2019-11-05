//jshint esversion:6
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


/* GET User listing. */
router.get('/:_id', function(req, res, next) {
  User.findById(req.params._id).exec(function(err, Users) {
    if (err) {
      return next(err);
    }
    res.send(Users);
  });
});

/* post a new User. */
router.post('/', function(req, res, next) {
  const plainPassword = req.body.password;
  const saltRounds = 10;
  bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword){
    if (err) {
      return next(err);
    }
  // Create a new document from the JSON in the request body
  const newUser = new User(req.body);
  newUser.password = hashedPassword;
  // Save that document
  newUser.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedUser);
  });
  });
});

/* update User. */
router.put('/:_id', function(req, res, next) {
  User.findByIdAndUpdate(
    // the id of the item to find
    req.params._id,

    // the change to be made. Mongoose will smartly combine your existing
    // document with this change, which allows for partial updates too
    req.body,

    // the callback function
    (err, Users) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(Users);
    });
});

/* delete User. */
router.delete('/:_id', function(req, res, next) {
  User.findByIdAndDelete(
    req.params._id,
    (err,Users));

});

module.exports = router;
