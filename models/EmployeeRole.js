var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('EmployeeRole', new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
  role: { type: Schema.Types.ObjectId, ref: 'Role' }
}));
