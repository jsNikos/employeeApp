"use strict";

var express = require('express');
var router = express.Router();
var services = require('../services');

router
  .route('/createShift')
  .put(function(req, res) {
    services.schedulerService
      .createShift(req.body)
      .then((shift) => {
        res.json(shift);
      })
      .catch((err) => {
        console.log(err);
          console.log(err.stack);
        throw new Error(err);
      });
  });

module.exports = router;
