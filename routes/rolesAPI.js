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
      .catch(handleError);
  });

router
  .route('/createRole')
  .put((req, res) => {
    roleService
      .createRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch(handleError);
  });

router
  .route('/deleteRole')
  .post((req, res) => {
    roleService
      .deleteRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch(handleError);
  });

router
  .route('/saveRole')
  .post((req, res) => {
    roleService
      .saveRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch(handleError);
  });


module.exports = router;
