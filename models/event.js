//jshint esversion:6
const mongoose = require('mongoose'), Schema = mongoose.Schema;
const User=require("../models/user");

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Define the schema for events
const eventSchema = new Schema({
  name: {
    type: String,
    required:true,
    min:3,
    max : 255
  },
  date: {
    type: String,
    required:true,
    set: date => formatDate(date)
  },
  adress: String,
  time: String,
  description: String,
  member:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  public: Boolean
});
// Create the model from the schema and export it
module.exports = mongoose.model('Event', eventSchema);
