var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Message', new Schema({
  content: {
    title: String,
    body: String
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  send: {
    type: Date,
    default: Date.now
  },
  received: Date,
  confirmed: Date,
  actions: [{
    name: String,
    url: String,
    performed: Date
  }]
}));
