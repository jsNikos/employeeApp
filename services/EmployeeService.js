"use strict";

var Employee = require('../models/Employee');

class EmployeeService {
  constructor() {}

  findEmployees() {
    return Employee.find();
  }

  createEmployee(employee) {
    return Employee.create(employee);
  }

  saveEmployee(employee) {
    return Employee.findOneAndUpdate({
      _id: employee._id
    }, employee);
  }

  deleteEmployee(employee) {
    return Employee.findOneAndRemove(employee);
  }


}

module.exports = EmployeeService;
