var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Door = new Schema({
  open: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Door", Door, "Door");
