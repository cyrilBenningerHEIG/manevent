//jshint esversion:6
/* eslint-disable */

require('dotenv').config();
//const Msg = require('../models/msg');
/**
 * Creates the backend's dispatcher.
 */
exports.createBackendDispatcher = function() {


  // MSG MANAGEMENT
  // =================
  function createMsg(args,kwargs) {

    return "hello" + ' ' + args[0] + ' ' + kwargs.key1 ;


  }

  // COMMUNICATIONS
  // ==============
  /**¨
   * Get namespace
   */
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
    session.register(`${namespace}.createMsg`, (args, kwargs) => createMsg(args, kwargs));


  };

  connection.open();


};
