"use strict";

var express = require('express');
var router = express.Router();
var employeeService = require('../services').employeeService;
var Employee = require('../models/Employee');

router
  .route('/findEmployees')
  .get((req, res) => {
    employeeService
      .findEmployees()
      .populate('roles')
      .then((employees) => {
        res.json(employees);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/createEmployee')
  .put((req, res) => {
    employeeService
      .createEmployee(req.body)
      .then((employee) => {
        return Employee.populate(employee, {
          path: 'roles'
        });
      })
      .then((employee) => {
        res.json(employee);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/deleteEmployee')
  .post((req, res) => {
    employeeService
      .deleteEmployee(req.body)
      .then((employee) => {
        res.json(employee);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/saveEmployee')
  .post((req, res) => {
    employeeService
      .saveEmployee(req.body)
      .then((employee) => {
        res.json(employee);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });


module.exports = router;
