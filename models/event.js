const mongoose = require('mongoose');
const User=require("./user");
const Schema = mongoose.Schema;
// Define the schema for users
const eventSchema = new Schema({
  name: String,
  Date: Date,
  Adress: String,
  Time: String,
  Description: String,
  Member:[{types:Schema.Types.ObjectId, ref:User}],
  public: Boolean 
});
// Create the model from the schema and export it
module.exports = mongoose.model('Event', eventSchema);