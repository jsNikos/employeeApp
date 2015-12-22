"use strict";

var express = require('express');
var router = express.Router();
var scheduleService = require('../services').scheduleService;

router
  .route('/init')
  .get((req, res) => {
    let model = {
      weekOf: 'Monday 2015-15-21'
    };
    model.schedules = scheduleService.findSchedules(req.body.employee);
    res.json(model);
  });

router
  .route('/swappers')
  .get((req, res) => {
    let result = scheduleService.findSwappers(req.body.shift);
    res.json(result);
  });




module.exports = router;
