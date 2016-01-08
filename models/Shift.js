var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Shift', (new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  scheduleDate: Date,
  starttime: Date,
  endtime: Date,
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
}))
.post('save', (shift) => {
  // console.log(shift); //TODO broadcaster
}));
