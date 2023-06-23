const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tuserschema = new Schema({
  username: {
    type: String,
    required: true,
  },
  registerfor: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eventemail: {
    type: String,
    required: true,
  },
  eventlink: {
    type: String,
    required: true,
  },
  eventid: {
    type: String,
    required: true,
  },
  eventtime: {
    type: String,
    required: true,
  },
  eventdate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tusers", Tuserschema);
