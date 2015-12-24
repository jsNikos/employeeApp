"use strict";

var Role = require('../models/Role');

class RoleService {
  constructor() {
  }

  findRoles(){
    return Role.find();
  }

  createRole(role){
    return Role.create(role);
  }


}

module.exports = RoleService;