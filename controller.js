//jshint esversion:6
const Message = require('./models/message');

class ChatController {
  async createNewMsg(session, params) {

    const savedMessage = await new Message(params).save();

    session.publish(savedMessage);

    return savedMessage;
  }

  // async getAllMsg(session, params) {
  //   // session.publish()
  // }

}

exports.ChatController = ChatController;

