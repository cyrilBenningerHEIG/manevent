//jshint esversion:6
/* eslint-disable */
const controller = require('./controller');
const ChatController = controller.ChatController;
require('dotenv').config();
//const Msg = require('../models/msg');

exports.createBackendDispatcher = function() {

const chat = new ChatController();

const namespace = process.env.MANEVENT_NAMESPACE || 'com.herokuapp.manevent';
const secret = process.env.MANEVENT_SECRET || '';

// backend's communications with Web Application Messaging Protocol (WAMP)
const autobahn = require('autobahn');
const connection = new autobahn.Connection({
  url: 'wss://wamp.archidep.media/ws',
  realm: 'manevent',
  authid: 'manevent',
  authmethods: ['ticket'],
  onchallenge: function() {
    return secret;
  }
});

connection.onopen = function(session) {
  console.log('Connection to WAMP router established');
  //session.call(`${namespace}.AllMsg`,[],chat.getAllMsg(eventId));
  session.register(`${namespace}.createMsg`, (args, params) => chat.createNewMsg(session,params));
  // Subscribe to an event
  session.register(`${namespace}.AllMsg`, (args, params) => chat.getAllMsg(params));
  // controleur "created at", "userId", "eventId"

};

connection.open();


};
