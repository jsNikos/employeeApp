var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Shift', new Schema({
  employee: String,
  scheduleDate: Date,
  starttime: Date,
  endtime: Date,
  role: String
}));
