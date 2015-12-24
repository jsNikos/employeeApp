var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('EmployeeRole', new Schema({
  employee: String,
  role: String
}));
