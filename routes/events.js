var express = require('express');
var router = express.Router();
const Event = require('../models/event');


/* GET events listing. */
router.get('/', function(req, res, next) {
  Event.find().sort('name').exec(function(err, events) {
    if (err) {
      return next(err);
    }
    res.send(events);
  });
});

/* GET event listing. */
router.get('/:_id', function(req, res, next) {
  Event.findById(req.params._id).exec(function(err, events) {
    if (err) {
      return next(err);
    }
    res.send(events);
  });
});

/* post a new event. */
router.post('/', function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newEvent = new Event(req.body);
  // Save that document
  newEvent.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedEvent);
  });
});

/* update event. */
router.put('/:_id', function(req, res, next) {
  Event.findByIdAndUpdate(
    // the id of the item to find
    req.params._id,
    
    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body,
    
    // the callback function
    (err, event) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(event);
    })
});

/* delete event. */
router.delete('/:_id', function(req, res, next) {
  Event.findByIdAndDelete(
    req.params._id,
    (err,event));

});


module.exports = router;