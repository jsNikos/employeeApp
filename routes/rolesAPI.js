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
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/createRole')
  .put((req, res) => {
    roleService
      .createRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/deleteRole')
  .post((req, res) => {
    roleService
      .deleteRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/saveRole')
  .post((req, res) => {
    roleService
      .saveRole(req.body)
      .then((role) => {
        res.json(role);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });


module.exports = router;
