"use strict";

var Role = require('../models/Role');

class RoleService {
  constructor() {}

  findRoles() {
    return Role.find();
  }

  createRole(role) {
    return Role.create(role);
  }

  saveRole(role) {
    return Role.findOneAndUpdate({
      _id: role._id
    }, role);
  }

  deleteRole(role) {
    return Role.findOneAndRemove(role);
  }


}

module.exports = new RoleService();
