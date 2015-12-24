var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Role', new Schema({
  name: String
}));
