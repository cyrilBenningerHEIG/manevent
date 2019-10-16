const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const eventSchema = new Schema({
  name: String,
  Date: Date,
  Adress: String,
  Time: String,
  Description: String,
  public: Boolean 
});
// Create the model from the schema and export it
module.exports = mongoose.model('Event', eventSchema);