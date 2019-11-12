const User = require('../models/user');
const Event=require('../models/event');

exports.cleanUpDatabase = async function() {
  await Promise.all([
      Event.deleteMany(),
    //User.deleteMany()
  ]);
};