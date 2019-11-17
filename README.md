# Manevent api
Manevent is a simple application written on [Node.js](https://nodejs.org/) with the use of [Express.js](https://expressjs.com/) framework based in [Mongo DB](https://www.mongodb.com/) which allows users the following set of interactions : 

1. to add / modify / delete an event 
2. to add / modify / detele a user
3. a real-time communication by an event between subscribed users 

The documentation of the 1st and the 2nd points can be found in the `/docs` folder of our application. The 3rd point is explained below.  

We are using the [WAMP (Web Application Messaging Protocol)](https://en.wikipedia.org/wiki/Web_Application_Messaging_Protocol) to provide our users a real-time communication by event. The chat is automatically activated at the moment of the creation of a new event so the subscribers can exchange messages. The events can have a **public** or a **private** status. In the case of a public event all the messages sent to the chat are visible for non authenticated users. When an event is private, the users can only see the basic information of an event : 
 its name, date, start time, location and the descrition. To join the chat, the user have to be authenticated. 
 
Following the latested rules of WAMP we based the structure of our chat feature on two different procedures and one topic, so users can get the notifications when the new message is added to the chat. 

* `createNewMsg()`  procedure takes the session id and the event id as a parameter and it allows to create a new message in the chat   
* `getAllPreviousMsg() ` procedure takes the event id as a parameter and returns all the messages that have been written in the chat 

The controller `controller.js` manage both of the WAMP procedures in the class ChatController as well as a subsciption to a WAMP topic : 
```js
class ChatController {
  async createNewMsg(session, params) {
    const savedMessage = await new Message(params).save();
    session.publish(`${namespace}.1`, [], { savedMessage });
    return savedMessage;
  }
  async getAllPreviousMsg(params) {
    let PreviousMessage = await Message.find({ eventId: params.eventId 	}).sort('createdAt').exec();
    return PreviousMessage;
  }
}
```
The dispatcher `dispatcher.js` creates the new message and retrieves all previous ones once the connection is opened : 
```js
connection.onopen = function (session) {
    session.register(`${namespace}.createMsg`, (args, params) => chat.createNewMsg(session, params));
    session.register(`${namespace}.AllPreviousMsg`, (args, params) => chat.getAllPreviousMsg(params));
  }
```

Our Model `models/messge.js` allows user to compose a message from a **text**, an **image** and a **location** : 
```js
const MsgSchema = new Schema({
    text: String,
    image: String,
    location: {
        type: {
            type: String,
            required: true,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: validateGeoJsonCoordinates,
                message: '{VALUE} is not a valid longitude/latitude(/altitude) coordinates array'
            }
        }
    },
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    event:{ type: Schema.Types.ObjectId, ref: 'Event' },
    createdAt: new Date()
})
```
