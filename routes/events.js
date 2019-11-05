//jshint esversion:6
var express = require('express');
const auth = require("../middleware/auth");
var router = express.Router();
const Event = require('../models/event');
const ObjectId = require('mongodb').ObjectID;

/* GET events listing. */
router.get('/', function(req, res, next) {

  let query = Event.find().sort('name');
    // Parse the "page" param (default to 1 if invalid)
  let page = parseInt(req.query.page, 10);
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  // Parse the "pageSize" param (default to 100 if invalid)
  let pageSize = parseInt(req.query.pageSize, 10);
  if (isNaN(pageSize) || pageSize < 0 || pageSize > 100) {
    pageSize = 100;
  }
  // Apply skip and limit to select the correct page of elements
  query = query.skip((page - 1) * pageSize).limit(pageSize);

  query.exec(function(err, events) {
    if (err) {
      return next(err);
    }
    res.send({
        page: page,
        pageSize: pageSize,
        //total: total,
        data: events
    });
  });
});

/* Filters */
router.get('/filter', function(req, res, next) {
  let query = Event.find();

  /* Filter events by name*/
  if (req.query.name) {
    query = query.where('name').equals(req.query.name);
  }

  /* Filter par param public */
  if(req.query.public){
    query = query.where('public').equals(req.query.public); //Boolean()
   }

   /* Filter events by adress*/
   if (req.query.adress){
     query = query.where('adress').equals(req.query.adress);
   }

  // Filter events by date
  if (req.query.date) {
    query = query.where('date').equals(req.query.date);
  }

  // Execute the query
  query.exec(function(err, events) {
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
  newEvent.save(function(err, savedEvent) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedEvent);
  });
});

router.post('/:_id/add', auth, function(req, res, next) {
  // If we reach this function, the previous authentication middleware
  // has done its job, i.e. a valid JWT was in the Authorization header.
  const currentUserId = req.currentUserId;
  let event = Event.findById(req.params._id);
  event.Member=[];
  event.Member.push(currentUserId).save(function(err,savedEvent){
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
    });
});

/* delete event */
router.delete('/:_id', function(req, res, next) {
  Event.findByIdAndDelete(
    req.params._id,
    (err,event));

});




module.exports = router;
