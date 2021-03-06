"use strict";

var express = require('express');
var router = express.Router();
var services = require('../services');

router
  .route('/init')
  .get(function(req, res) {
    let authenticatedUser = services.authenticationService.findAuthenticatedUser(req);
    services.messageService
     .findForEmployee(authenticatedUser)
     .populate('from to')
     .then((messages) => {
       res.json({
         user: authenticatedUser,
         messages: messages
       });
     })
     .catch(handleError);
  });

module.exports = router;
