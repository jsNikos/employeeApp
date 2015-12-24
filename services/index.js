var ScheduleService = require('./ScheduleService');
var RoleService = require('./RoleService');

module.exports = {
  scheduleService: new ScheduleService(),
  roleService: new RoleService()
}
