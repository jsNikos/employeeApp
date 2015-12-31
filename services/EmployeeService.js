"use strict";

var Employee = require('../models/Employee');

class EmployeeService {
  constructor() {}

  findOne(attr){
    return Employee.findOne(attr);
  }

  findById(id){
    return Employee.findById(id);
  }

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

module.exports = new EmployeeService();
