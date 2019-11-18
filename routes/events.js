//jshint esversion:6

var express = require('express');
const auth = require("../middleware/auth");
var router = express.Router();
const Event = require('../models/event');
const mongoose = require('mongoose');

/**
 * DOCUMENTATION API
 * @api {get} /events Request all events' informations
 * @apiName RetrieveEvents
 * @apiGroup Event
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a paginated list of events ordered by title (in alphabetical order).
 *
 *  * @apiExample Example
 *     GET manevent.herokuapp.com/events HTTP/1.1
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *     Location: https://manevent.herokuapp.com/events
 *
 *     [
 {
  "member": [
  
  ],
  "_id": "5dc2d57714b81bd6f50ea8aa",
  "name": "Code la fin API",
  "date": "2019-11-18",
  "adress": "Yverdon",
  "time": "22h10",
  "description": "",
  "public": true,
  "__v": 0
}
 {
  "member": [

  ],
  "_id": "5dc2d57714b81bd6f50ea8aa",
  "name": "Marché de Noel de Clos Fleuri",
  "date": "2019-11-30",
  "adress": "Prilly",
  "time": "11h00",
  "description": "Venez boire une tasse avec nous et faire vos emplettes pour vos cadeaux de Noël!",
  "public": true,
  "__v": 0
}
 *     ]
 *
 * @apiUse ServerError
 */

/* GET events listing. */
router.get('/', function (req, res, next) {

  let query = Event.find().sort('name');

  /**
   *
   * @api {get} /filter/events?param= Filter events 
   * @apiName FilterEvents
   * @apiGroup Event
   * @apiVersion 1.0.0
   * @apiDescription Retrieves a paginated list of events matching the filter parameter (in alphabetical order).
   * @apiUse EventInResponseBody
   * 
   * @apiParam {String} [name] name of the event
   * @apiParam {String} [date] date of the event
   * @apiParam {String} [adress] adress of the event
   * @apiParam {boolean} [public] defines if the event is public or not
   *  * @apiExample Example
   *     GET manevent.herokuapp.com/events/filter?adress=Lausanne HTTP/1.1
   *  * @apiSuccessExample 200 OK
   *     HTTP/1.1 200 OK
   *     Content-Type: application/json
   *     Location: https://manevent.herokuapp.com/events/filter?=Lausanne;;
   *
   *     [
   *{
   * "member": [
   *   
   * ],
   * "_id": "5dc2d57714b81bd6f50ea8aa",
   * "name": "Marché de Noel de Clos Fleuri",
   * "date": "2019-11-30",
   * "adress": "Lausanne",
   * "time": "11h00",
   * "description": "Venez boire une tasse avec nous et faire vos emplettes pour vos cadeaux de Noël!",
   * "public": true,
   * "__v": 0
  *}

    *     [
   *{
   * "member": [
   *   
   * ],
   * "_id": "5dc2d57714b81bd6f50ea8aa",
   * "name": "Boogie Dance",
   * "date": "2019-10-30",
   * "adress": "Lausanne",
   * "time": "21h00",
   * "description": "Boogie Wonderland!",
   * "public": true,
   * "__v": 0
  *}
   *     ]
   * @apiUse ServerError
  */

  // Add filter if exist
  /* Filter events by name*/
  if (req.query.name) {
    query = query.where('name').equals(req.query.name);
  }

  /* Filter par param public */
  if (req.query.public) {
    query = query.where('public').equals(req.query.public); //Boolean()
  }

  /* Filter events by adress*/
  if (req.query.adress) {
    query = query.where('adress').equals(req.query.adress);
  }

  // Filter events by date
  if (req.query.date) {
    query = query.where('date').equals(req.query.date);
  }
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

  query.exec(function (err, events) {
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


/**
 * @api {get} /events/:_id Request an event's informations
 * @apiName RetrieveEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 * @apiDescription Retrieves one event.
 *
 * @apiUse EventIdInUrlPath
 * @apiExample Example
 *     GET manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     [
 *{
 * "member": [
 *
 * ],
 * "_id": "5dc2d57714b81bd6f50ea8aa",
 * "name": "Marché de Noel de Clos Fleuri",
 * "date": "2019-11-30",
 * "adress": "Prilly",
 * "time": "11h00",
 * "description": "Venez boire une tasse avec nous et faire vos emplettes pour vos cadeaux de Noël!",
 * "public": true,
 * "__v": 0
*}
 *     ]
 * @apiUse EventNotFoundError
 * @apiUse EventIdNotValid
 * @apiUse ServerError
 */

/* GET event listing. */
router.get('/:_id', function (req, res, next) {
  if (checkID(req.params._id)) return res.status(404).send("This ID is not valid");
  Event.findById(req.params._id).exec(function (err, events) {
    if (err) {
      return next(err);
    }
    if (checkEmpty(events)) return res.status(404).send("The event doesn't exist");
    res.send(events);
  });

});

/**
 * @api {post} /events Create an event
 * @apiName CreateEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 * @apiDescription Registers a new event.
 * @apiUse EventInRequestBody
 * @apiUse EventInResponseBody
 *
 * @apiExample Example
 *     POST manevent.herokuapp.com/events HTTP/1.1
 *     Content-Type: application/json
 *
 *     { "name": "Caprices Festival 2020",
 *           "date": "2020-04-16",
*          "adress": "Crans-Montana",
*           "time": "19h00",
 *           "description": "Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland",
  *          "public": true,
*            "member": []
*}
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
*{
*    "member": [],
*    "_id": "5dc3f1ed87ca9ddf9882f5b3",
*    "name": "Caprices Festival 2020",
*    "date": "2020-04-16",
*    "adress": "Crans-Montana",
*    "time": "19h00",
*    "description": "Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland",
*    "public": true,
*    "__v": 0
*}
 */

/* post a new event. */
router.post('/', auth, function (req, res, next) {
  const currentUserId = req.currentUserId;
  // Create a new document from the JSON in the request body
  let newEvent = new Event(req.body);
  newEvent.admin = currentUserId;
  // Save that document
  newEvent.save(function (err, savedEvent) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedEvent);
  });
});

router.post('/:_id/member', auth, function (req, res, next) {
  // If we reach this function, the previous authentication middleware
  // has done its job, i.e. a valid JWT was in the Authorization header.
  const currentUserId = req.currentUserId;
  if (checkID(req.params._id)) return res.status(404).send("This ID is not valid");
  Event.findById(req.params._id, function (err, event) {
    if (checkEmpty(event)) return res.status(404).send("The event doesn't exist");
    event.member.push(currentUserId);
    event.save(function (err, savedEvent) {
      if (err) {
        return next(err);
      }
      // Send the saved document in the response
      res.send(savedEvent);
    });
  });
});

/**
 * @api {patch} /event/:_id Update an event's informations
 * @apiName UpdateEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 * @apiDescription Partially updates an event's data (only the properties found in the request body will be updated).
 * All properties are optional.
 *
 * @apiUse EventIdInUrlPath
 * @apiUse EventInRequestBody
 * @apiUse EventInResponseBody
 * @apiExample Example
 *     PATCH manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1
 * Content-Type: application/json
 * { 
 * "name": "Caprices Festival 2021"
 * }
* @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 * {
*    "member": [],
*    "_id": "5dc3f1ed87ca9ddf9882f5b3",
*    "name": "Caprices Festival 2021",
*    "date": "2020-04-16",
*    "adress": "Crans-Montana",
*    "time": "19h00",
*    "description": "Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland",
*    "public": true,
*    "__v": 0
*}
 * @apiError {Object} 403/Unauthorized The user is not allowed to update an event
 *
 * @apiErrorExample {json} 403 Unauthorized
 *     HTTP/1.1 403 Unauthorized
 *     Content-Type: text/plain
 *
 *     "Only admin user can update" 
 * 
 * @apiUse EventIdNotValid
 * @apiUse EventNotFoundError
 * @apiUse ServerError
 */

/* update event. */
router.patch('/:_id', auth,function (req, res, next) {
  if (checkID(req.params._id)) return res.status(404).send("This ID is not valid");
  const currentUserId = req.currentUserId;
  //if (checkEmpty(currentUserId)) return res.status(403).send();
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
      if (checkEmpty(event)) return res.status(404).send("The event doesn't exist");

      if(event.admin!=currentUserId) return res.status(503).send("Only admin user can update");
      return res.status(200).send(event);
    });
});

/**
 * @api {delete} /events/:_id Delete an event
 * @apiName DeleteEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 * @apiDescription Permanently deletes an event.
 *
 * @apiParam (URL path parameters) {Number} _id The unique identifier of the event to retrieve
 * @apiExample Example
 *     DELETE manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1
  * @apiSuccessExample 200 OK
 *     HTTP/1.1 200
 *     Content-Type: text/plain 
 * 
 *     "The event has been deleted"
 *  @apiError {Object} 403/Unauthorized The user is not allowed to delete an event
 *  @apiErrorExample {json} 403 Unauthorized
 *     HTTP/1.1 403 Unauthorized
 *     Content-Type: text/plain
 *
 *     "Only admin user can delete an event" 
 * @apiUse EventIdNotValid
 * @apiUse EventNotFoundError
 * @apiUse ServerError
 */

/* delete event */
router.delete('/:_id',auth, function (req, res, next) {
  const currentUserId = req.currentUserId;
  if (checkID(req.params._id)) return res.status(404).send("This ID is not valid");
  Event.findByIdAndDelete(
    req.params._id,
    (err, event) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      if (checkEmpty(event)) return res.status(404).send("The event doesn't exist");
      if(event.admin!=currentUserId) return res.status(503).send("Only admin user can delete an event");
      return res.status(200).send('The event has been deleted');
    });
  // effacer tous les messages

});

function checkID(id) {
  return !mongoose.Types.ObjectId.isValid(id);

}
function checkEmpty(event) {
  return event === null;
}

module.exports = router;

/**
 * @apiDefine EventInRequestBody
 * @apiParam (Request body) {String} name name of the event
 * @apiParam (Request body) {String} date date of the event
 * @apiParam (Request body) {String} adress adress of the event
 * @apiParam (Request body) {String} time planned hour of the event
 * @apiParam (Request body) {String} description description of the event
 * @apiParam (Request body) {array} member list of the participants of the event
 * @apiParam (Request body) {boolean} public defines if the event is public or not
 */
/**
 * @apiDefine EventInResponseBody
 * @apiParam (Response body) {String} name name of the event
 * @apiParam (Response body) {String} date date of the event. Date will be automatically formated to the EU standards
 * @apiParam (Response body) {String} adress adress of the event
 * @apiParam (Response body) {String} time planned hour of the event
 * @apiParam (Response body) {String} description description of the event
 * @apiParam (Response body) {array} member list of the participants of the event
 * @apiParam (Response body) {boolean} public defines if the event is public or not
 * @apiParam (Response body) {Number} __v The versionKey is a property set on each document when first created by Mongoose
 */
/**
* @apiDefine EventIdInUrlPath
* @apiParam (URL path parameters) {Number} _id The unique identifier of the event to retrieve
*/
/**
* @apiDefine EventNotFoundError
* @apiError {Object} 404/NotFound No event found with that ID
* @apiErrorExample {json} 404 Not Found
*     HTTP/1.1 404 Not Found
*     Content-Type: text/plain
*
*     "The event doesn't exist"
*/
/**
* @apiDefine EventIdNotValid
* @apiError {Object} 404/InvalidID Event ID is not valid
* @apiErrorExample {json} 404 Invalid ID
*     HTTP/1.1 404 Invalid ID
*     Content-Type: text/plain
*
*     "This ID is not valid"
*/
/**
* @apiDefine ServerError
* @apiError {Object} 500/InternalServerError Server unable to answer
*
*/
