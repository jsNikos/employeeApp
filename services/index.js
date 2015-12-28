var ScheduleService = require('./ScheduleService');
var RoleService = require('./RoleService');
var EmployeeService = require('./EmployeeService');

module.exports = {
  scheduleService: new ScheduleService(),
  roleService: new RoleService(),
  employeeService: new EmployeeService()
}
