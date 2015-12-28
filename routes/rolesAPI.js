"use strict";

var express = require('express');
var router = express.Router();
var roleService = require('../services').roleService;

router
  .route('/findRoles')
  .get((req, res) => {
    roleService
      .findRoles()
      .then((roles) => {
        res.json(roles);
      })
      .catch(console.log);
  });

router
  .route('/createRole')
  .put((req, res) => {
    roleService
      .createRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch(console.log);
  });

router
  .route('/deleteRole')
  .post((req, res) => {
    roleService
      .deleteRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch(console.log);
  });

  router
    .route('/saveRole')
    .post((req, res) => {
      roleService
        .saveRole(req.body)
        .then((role) => {
          res.json(role);
        })
        .catch(console.log);
    });


module.exports = router;
