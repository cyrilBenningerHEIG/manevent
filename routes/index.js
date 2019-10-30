var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretKey = process.env.SECRET_KEY || 'changeme';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  // Find the user by name.
  User.findOne({ name: req.body.name }).exec(function(err, user) {
    if (err) { return next(err); }
    else if (!user) { return res.sendStatus(401); }
    // Validate the password.
    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      if (err) { return next(err); }
      else if (!valid) { return res.sendStatus(401); }
      // Generate a valid JWT which expires in 7 days.
      const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
      const claims = { sub: user._id.toString(), exp: exp };
      jwt.sign(claims, secretKey, function(err, token) {
        if (err) { return next(err); }
        res.send({ token: token }); // Send the token to the client.
      });
    });
  })
});

module.exports = router;
