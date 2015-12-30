"use strict";

var express = require('express');
var router = express.Router();
var authenticationService = require('../services').authenticationService;

router
  .route('/signin')
  .post((req, res) => {
    authenticationService
      .authenticate(req)
      .then(() => {
        res.json({});
      })
      .catch(console.log);
  });

module.exports = router;
