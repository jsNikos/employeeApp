"use strict";

var express = require('express');
var router = express.Router();
var employeeService = require('../services').employeeService;

router
  .route('/findEmployees')
  .get((req, res) => {
    employeeService
      .findEmployees()
      .populate('roles')
      .then((employees) => {
        res.json(employees);
      })
      .catch(console.log);
  });

router
  .route('/createEmployee')
  .put((req, res) => {
    employeeService
      .createEmployee(req.body)      
      .then((employee) => {
        res.json(employee);
      })
      .catch(console.log);
  });

router
  .route('/deleteEmployee')
  .post((req, res) => {
    employeeService
      .deleteEmployee(req.body)
      .then((employee) => {
        res.json(employee);
      })
      .catch(console.log);
  });

  router
    .route('/saveEmployee')
    .post((req, res) => {
      employeeService
        .saveEmployee(req.body)
        .then((employee) => {
          res.json(employee);
        })
        .catch(console.log);
    });


module.exports = router;
