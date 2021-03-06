var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Employee', new Schema({
  name: String,
  password: String,
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
}));
