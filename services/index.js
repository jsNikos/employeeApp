var ScheduleService = require('./ScheduleService');
var RoleService = require('./RoleService');
var EmployeeService = require('./EmployeeService');
var AuthenticationService = require('./AuthenticationService');

module.exports = {
  scheduleService: new ScheduleService(),
  roleService: new RoleService(),
  employeeService: new EmployeeService(),
  authenticationService: new AuthenticationService()
}
