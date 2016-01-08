"use strict";

var employeeService = require('./EmployeeService');
var Message = require('../models/Message');

class MessageService {
  constructor() {}

  findOne(attr) {
    return Message.findOne(attr);
  }

  findById(id) {
    return Message.findById(id);
  }

  findForEmployee(employee) {
    return this.find({
      to: employee._id
    });
  }

  confirm(message) {
    message.confirmed = Date.now();
    return this.save(message);
  }

  find(attr) {
    return Message.find(attr);
  }

  create(message, fromEmployee) {
    message.from = fromEmployee._id;
    return Message.create(message);
  }

  save(message) {
    return Message.findOneAndUpdate({
      _id: message._id
    }, message);
  }

  delete(message) {
    return Message.findOneAndRemove(message);
  }

  removeSwapRequests(requestSwapEmployee, shiftId) {
    return Message.remove({
      from: requestSwapEmployee._id,
      actions: {
        $elemMatch: {
          type: 'swap',
          'data.shift._id': {
            $eq: shiftId
          }
        }
      }
    });

  }

}

module.exports = new MessageService();
