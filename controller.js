//jshint esversion:6
const Message = require('./models/message');
require('dotenv').config();
const namespace = process.env.MANEVENT_NAMESPACE || 'com.herokuapp.manevent';

class ChatController {
  async createNewMsg(session, params) {

    const savedMessage = await new Message(params).save();

    session.publish(`${namespace}.1`, [], { savedMessage });

    return savedMessage;
  }

async getAllMsg(params) {
    //let PreviousMessage = await Message.find({ eventId: "1"}).sort('name').exec();
    return  params;
  }

}

exports.ChatController = ChatController;

