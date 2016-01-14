"use strict";

var _ = require('lodash');
var employeeService = require('./EmployeeService');
var Message = require('../models/Message');
var broadcasterService = require('./BroadcasterService');

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

  removeSwapRequests(requestSwapEmployeeId, shiftId) {
    return Message.find({
        from: requestSwapEmployeeId,
        actions: {
          $elemMatch: {
            type: 'swap',
            'data.shift._id': {
              $eq: shiftId.toString()
            }
          }
        }
      })
      .then((messages) => {
        messages.forEach((message) => {
          console.log(message.id);
          message.remove().then(null, handleError);
          // this.delete({_id: message._id})

        })});

        // console.log(messages);
        // return Promise.all(_.map(messages, (message) => {
        //   return this.delete(message);
        // }));
      // });
  }

  broadcastMessageRemoved(message) {
    this.sendBroadcast(message, 'remove');
  }

  broadcastMessageSaved(message) {
    this.sendBroadcast(message, 'save');
  }

  sendBroadcast(message, changeType) {
    return message.populate('from to')
      .execPopulate()
      .then((message) => {
        let topic = broadcasterService.createTopic('message/change', message.to.id);
        broadcasterService.broadcast({
          data: message,
          details: changeType
        }, topic);
      })
      .catch(handleError);
  }

}

module.exports = new MessageService();
