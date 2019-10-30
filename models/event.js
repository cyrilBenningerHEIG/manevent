const mongoose = require('mongoose'), Schema = mongoose.Schema;
const User=require("../models/user");

// Define the schema for users
const eventSchema = new Schema({
  name: String,
  Date: Date,
  Adress: String,
  Time: String,
  Description: String,
  Member:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  public: Boolean 
});
// Create the model from the schema and export it
module.exports = mongoose.model('Event', eventSchema);