# API Manevent 

Manevent is a simple application written on [Node.js](https://nodejs.org/) with the use of [Express.js](https://expressjs.com/) framework based on [Mongo DB](https://www.mongodb.com/) which allows the following set of interactions : 

1. to add / modify / delete an event  
2. to add / modify / detele a user 
3. a real-time communication by an event between subscribed users 

## Requirements

* [Node.js][node] 12.x
* [MongoDB][mongo] 4.x

## Usage

```bash
git clone https://github.com/cyrilBenningerHEIG/manevent.git
npm install
npm start
```

The application started at the PORT:3000 of your localhost server : [http://localhost:3000](http://localhost:3000).

If you are a developer and you have an intention to change the code you should run the application in a developer mode. We are using a [Nodemon](https://nodemon.io/) utility for that. Use `npm run dev`  instead of `npm start` to watch for file changes and restart the server automatically.

## Documentation

The documentation can be found in the `/docs` folder of our application and the demo [here](https://manevent.herokuapp.com/).

## Real-time component 

We are using the [WAMP (Web Application Messaging Protocol)](https://en.wikipedia.org/wiki/Web_Application_Messaging_Protocol) to provide our users with a real-time communication by event. The chat is automatically activated at the moment of the creation of a new event so the subscribers can exchange messages. The events can have a **public** or a **private** status. In the case of a public event all the messages sent to the chat are visible for non authenticated users. When the event is private, the users can only see the basic information of an event, such as  
 its name, date, start time, location and the description. To join the chat, the user have to be authenticated. 
 
Following the latest rules of WAMP we based the structure of our chat feature on two different procedures and one topic, so users can get the notifications when the new message is added to the chat. 

* `createNewMsg()`  procedure takes the session id and the event id as a parameter and allows to create a new message in the chat   
* `getAllPreviousMsg() ` procedure takes the event id as a parameter and returns all the messages that have been written in the chat 

The controller `controller.js` manages both of the WAMP procedures in the class ChatController as well as a subsciption to a WAMP topic : 
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
The dispatcher `dispatcher.js` creates a new message and retrieves all the previous ones once the connection is opened : 
```js
connection.onopen = function (session) {
    session.register(`${namespace}.createMsg`, (args, params) => chat.createNewMsg(session, params));
    session.register(`${namespace}.AllPreviousMsg`, (args, params) => chat.getAllPreviousMsg(params));
  }
```

Our Model `models/messge.js` allows the user to compose a message from a **text**, an **image** and a **location** : 
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

