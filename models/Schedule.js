var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Schedule', new Schema({
  scheduleDate: Date,
  shifts: [{
    type: Schema.Types.ObjectId,
    ref: 'Shift'
  }]
}));
