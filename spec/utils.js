const User = require('../models/user');
const Event=require('../models/event');

exports.cleanUpUserDatabase = async function() {
  await Promise.all([
    User.deleteMany()
  ]);
};

exports.cleanUpEventDatabase = async function() {
  await Promise.all([
      Event.deleteMany(),
  ]);
};