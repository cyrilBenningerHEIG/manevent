//jshint esversion:6
/* eslint-disable */
// This file handles backend communication with frontend clients.
// @exports app/backend/dispatcher
// const GameManager = require('../class/game-manager.class');
// const { createLogger, namespace, secret } = require('./config');
// const GameController = require('./controller/game.controller');
// const PlayerController = require('./controller/player.controller');

require ('dotenv').config();

/**
 * Creates the backend's dispatcher.
 */
exports.createBackendDispatcher = function() {

  // SETUP
  // =====

  // const gameManager = new GameManager();
  // const gameController = new GameController(gameManager);
  // const logger = createLogger('dispatcher');
  // const playerController = new PlayerController(gameManager);

  // TODO: declare variables and generic functions if you need them

  /**
   * Example: declare state
   *
   *     const clients = {};
   */

  /**
   * Example: log a message
   *
   *     logger.debug('Detailed debug message');
   *     logger.info('Informational message');
   *     logger.warn('Warning message');
   *     logger.error('Error message');
   */

  // GAME MANAGEMENT
  // ===============

  // TODO: write game management functions if you need them

  /**
   * create a new chat
   *
   *     try {
   *       const newGame = gameController.createNewGame(playerId);
   *       // The game has been created.
   *     } catch (err) {
   *       switch (err.code) {
   *         case 'tictactoe.playerNotFound':
   *           // The player does not exist.
   *           break;
   *         default:
   *           // An unexpected error occurred.
   *       }
   *     }
   */

  /**
   * do something for all participants
   *
   *     gameManager.players.forEach(player => {
   *       // Do something with player...
   *     });
   */

  /**
   * Example: do something for a specific game's players
   *
   *     game.players.forEach(player => {
   *       // Do something with player...
   *     });
   */


  /**
   * participant join a chat
   *
   *     try {
   *       const result = gameController.joinGame(gameId, playerId);
   *       // The player has successfully joined the game.
   *     } catch (err) {
   *       switch (err.code) {
   *         case 'tictactoe.gameNotFound':
   *           // The game does not exist.
   *           break;
   *         case 'tictactoe.playerNotFound':
   *           // The player does not exist.
   *           break;
   *         case 'tictactoe.gameFull':
   *           // The game is full.
   *           break;
   *         default:
   *           // An unexpected error occurred.
   *       }
   *     }
   */

  /**
   * participant leave a chat
   *
   *     try {
   *       const result = gameController.leaveGame(gameId, playerId);
   *       // The player has left the game.
   *     } catch(err) {
   *       switch (err.code) {
   *         case 'tictactoe.gameNotFound':
   *           // The game does not exist.
   *           break;
   *         case 'tictactoe.playerNotInGame':
   *           // The player is not in that game.
   *           break;
   *         default:
   *           // An unexpected error occurred.
   *       }
   *     }
   */

  // MSG MANAGEMENT
  // =================
  function initChat() {

  logger.info(`It worked Yay !`);
  console.log('hello!');

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
      session.register(`${namespace}.initChat`, () => initChat()).catch(onRegistrationFailure);


    };

    connection.open();

};
