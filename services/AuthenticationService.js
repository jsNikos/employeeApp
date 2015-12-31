"use strict";

var employeeService = require('./EmployeeService');

class AuthenticationService {
  constructor() {}

  authenticate(username, password, done) {
    employeeService
      .findOne({
        name: username
      })
      .then((user) => {
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }
        if (!(user.password === password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      })
      .catch(done)
  }

}

module.exports = new AuthenticationService();
