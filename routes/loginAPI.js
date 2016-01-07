"use strict";

var express = require('express');
var router = express.Router();
var passport = require('passport');

router
  .route('/signin')
  .post(passport.authenticate('local'),
    function(req, res) {
      res.json({});
    });

module.exports = router;
