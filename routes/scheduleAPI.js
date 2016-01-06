"use strict";

var express = require('express');
var router = express.Router();
var services = require('../services');
var schedulerService = services.schedulerService;

router
  .route('/init')
  .get((req, res) => {
    let dateInWeek = Date.now();
    let employee = services.authenticationService.findAuthenticatedUser(req);
    schedulerService
      .findSchedules(dateInWeek, employee)
      .populate({
        path: 'shifts',
        match: {employee: employee},
        populate: {
          path: 'role employee'
        }
      })
      .then((schedules) => {
        res.json({
          weekOf: dateInWeek,
          schedules: schedules
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/findPossibleSwappers')
  .post((req, res) => {
    schedulerService
      .findPossibleSwappers(req.body)
      .populate('role employee')
      .then((swappers) => {
        res.json(swappers);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/requestSwap')
  .put((req, resp) => {
    schedulerService
      .requestSwap(req.body.shift, req.body.swappers)
      .then(() => {
        res.json({});
      })
      .catch((err) => {
        throw new Error(err);
      });
  });




module.exports = router;
