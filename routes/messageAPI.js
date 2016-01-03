"use strict";

var express = require('express');
var router = express.Router();
var passport = require('passport');
var services = require('../services');

router
  .route('/find')
  .get((req, res) => {
    let employee = services.authenticationService.findAuthenticatedUser(req);
    services.messageService
      .findForEmployee(employee)
      .populate('from to')
      .then((messages) => {
        res.json(messages);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/create')
  .put((req, res) => {
    let authenticatedUser = services.authenticationService.findAuthenticatedUser(req);
    services.messageService
      .create(req.body, authenticatedUser)
      .then((message) => {
        res.json(message);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

router
  .route('/confirm')
  .post((req, res) => {
    let authenticatedUser = services.authenticationService.findAuthenticatedUser(req);
    let message = req.body;
    if (authenticatedUser._id !== message.to._id) {
      res.send(403);
      return;
    }
    services.messageService
      .confirm(message)
      .then((message) => {
        res.json(message);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });


module.exports = router;
