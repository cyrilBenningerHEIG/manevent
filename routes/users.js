//jshint esversion:6
var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const User = require('../models/user');
const Event = require('../models/event');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/* GET all Users. (à contrôler + doc à ajouter) */
router.get('/', function (req, res, next) {

  User.find().sort('name').exec(function (err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

/** 
 * @api {get} /users/:_id Request an user's informations
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Retrieves one user.
 *
 * @apiParam {Number} _id Unique identifier of the user
 * @apiExample Example
 *     GET manevent.herokuapp.com/users/5dc2d57714b81bd6f50ea8aa HTTP/1.1
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *     Link: &lt;https://manevent.herokuapp.com/users/5dc2d57714b81bd6f50ea8aa;;
 * @apiUse UserInResponseBody
 * @apiUse UserNotFoundError
 */

/* GET User listing. */
router.get('/:_id', function (req, res, next) {
  if (checkID(req.params._id)) return res.status(404).send("This ID is not valid");
  User.findById(req.params._id).exec(function (err, Users) {
    if (err) {
      return next(err);
    }
    if (checkEmpty(Users)) return res.status(404).send("The user doesn't exist");
    Event.aggregate([
      {
        $match: {
          "member": Users._id
        }
      },
      {
        $count: "isMember"
      },
      {
        $addFields: {
          Users
        }
      }], function (err, user) {
        if (err) {
          return next(err);
        }
        if(user.length===0)return res.send(Users);
        res.send(user);
      });


  });
});
/** 
 * @api {post} /users Create an user
 * @apiName CreateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Registers a new user.
 * @apiUse UserInRequestBody
 * @apiUse UserInResponseBody
 * 
 * @apiExample Example
 *     POST manevent.herokuapp.com/users HTTP/1.1
 *     Content-Type: application/json
 *{
 *   "name": "Alvaro Baptista",
 *   "email": "alvaro.baptista@heig-vd.ch",
 *   "password": "test1"
 * }
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *     Location: https://evening-meadow-25867.herokuapp.com/api/movies/58b2926f5e1def0123e97281
 * {
 *   "_id": "5dc4121df5c89ef55cf2eca0",
  *  "name": "Alvaro Baptista",
  *  "email": "alvaro.baptista@heig-vd.ch",
  *  "password": "$2b$10$UJS1AkggeB7NOhc1mQ5bhezQArqRLQvtjTiHyQVVSI3FQ9irOCNCu",
  *  "__v": 0
}
 */

/* post a new User. */
router.post('/', function (req, res, next) {
  const plainPassword = req.body.password;
  const saltRounds = 10;
  bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
    if (err) {
      return next(err);
    }
    // Create a new document from the JSON in the request body
    const newUser = new User(req.body);
    newUser.password = hashedPassword;
    // Save that document
    newUser.save(function (err, savedUser) {
      if (err) {
        return next(err);
      }
      // Send the saved document in the response
      res.send(savedUser);
    });
  });
});

/** 
 * @api {patch} /event/:_id Update an user's informations
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Partially updates an user's data (only the properties found in the request body will be updated).
 * All properties are optional.
 *
 * @apiParam {Number} _id Unique identifier of the user
 * @apiUse UserInRequestBody
 * @apiUse UserInResponseBody
 * @apiExample Example
 *     PUT manevent.herokuapp.com/users/5dc4121df5c89ef55cf2eca0 HTTP/1.1
 * Content-Type: application/json
 * { 
 * "password": "test2"
*}
* @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
{
    "_id": "5dc4121df5c89ef55cf2eca0",
    "name": "Alvaro Baptista",
    "email": "alvaro.baptista@heig-vd.ch",
    "password": "$2b$10$UJS1AkggeB7NOhc1mQ5bhezQArqRLQvtjTiHyQVVSI3FQ9irOCNCu",
    "__v": 0
}
@apiUse UserNotFoundError
 */

/* update User. */
router.patch('/:_id', auth, function (req, res, next) {
  if (checkID(req.params._id)) return res.status(404).send("This ID is not valid");
  const currentUserId = req.currentUserId;
  if (!(req.body.password===undefined)) {
    const plainPassword = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      req.body.password=hashedPassword;
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
          if (checkEmpty(Users)) return res.status(404).send("The user doesn't exist");
          if (Users._id != currentUserId) return res.status(503).send("You can't update this user");
          return res.send(Users);
        });        
    });
    
  }
  else{
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
      if (checkEmpty(Users)) return res.status(404).send("The user doesn't exist");
      if (Users._id != currentUserId) return res.status(503).send("You can't update this user");
      return res.send(Users);
    });
  }

});

/** 
 * @api {delete} /users/:_id Delete an user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Permanently deletes an user.
 *
 * @apiParam (URL path parameters) {Number} _id The unique identifier of the user to retrieve
 * @apiExample Example
 *     DELETE manevent.herokuapp.com/userss/5dc4121df5c89ef55cf2eca0 HTTP/1.1
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 The user has been deleted
 * @apiUse UserNotFoundError
 */

/* delete User. */
router.delete('/:_id', auth, function (req, res, next) {
  const currentUserId = req.currentUserId;
  if (checkID(req.params._id)) return res.status(404).send("This ID is not valid");
  User.findByIdAndDelete(
    req.params._id,
    (err, Users) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      if (checkEmpty(Users)) return res.status(404).send("The user doesn't exist");
      if (Users._id != currentUserId) return res.status(403).send("You can't delete this user");
      return res.status(200).send('The user has been deleted');
    });
});

function checkID(id) {
  return !mongoose.Types.ObjectId.isValid(id);

}
function checkEmpty(event) {
  return event === null;
}

module.exports = router;

/**
 * @apiDefine UserInRequestBody
 * @apiParam (Request body) {String} name name of the user
 * @apiParam (Request body) {String} email email of the user
 * @apiParam (Request body) {String} password password of the user.
 */
/**
 * @apiDefine UserInResponseBody
 * @apiParam (Response body) {String} name name of the user
 * @apiParam (Response body) {String} email email of the user
 * @apiParam (Response body) {String} password password of the user. Password will be automatically hashed
 */
/**
 * @apiDefine UserNotFoundError
 *
 * @apiError {Object} 404/NotFound No user was found corresponding to the ID in the URL path
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No user found with ID 58b2926f5e1def0123e97281
 */
