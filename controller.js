//jshint esversion:6

class ChatController {
  async createNewMsg(session, params) {

    const savedMessage = await new Message(params).save();

    // session.publish()

    return savedMessage;
  }

  // async getAllMsg(session, params) {
  //   // session.publish()
  // }

}

exports.ChatController = ChatController;
exports.Chat = Chat;
