var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

module.exports = mongoose.model('EmployeeRole', new Schema({
  employee: ObjectId,
  role: ObjectId
}));
