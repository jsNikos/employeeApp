"use strict";

var employeeService = require('./index').employeeService;

class AuthenticationService {
  constructor() {}

  authenticate(req) {
    return new Promise(function(resolve, reject){
        resolve();
    });
  }


}

module.exports = AuthenticationService;
