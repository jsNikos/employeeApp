"use strict";

var _ = require('lodash');
var employeeService = require('./EmployeeService');

class BroadcasterService {
  constructor() {
    this.wsConnections = [];
    this.topicNames = {
      messagesChanged: 'message/change',
      scheduleChanged: 'schedule/change'
    }
  }

  createTopic(name, employeeId) {
    if (!this.topicNames[name]) {
      throw new Error('This name is not registered in BroadcasterService.topicNames ' + name);
    }
    return {
      name,
      employeeId: employeeId && employeeId.toString()
    };
  }

  registerConnection(req) {
    let connection = req.accept(req.origin, []);
    let wsConnection = {
      connection,
      topics: []
    };
    connection.on('close', () => {
      _.remove(this.wsConnections, (elem) => {
        return elem === connection;
      });
    });
    connection.on('error', () => {
      _.remove(this.wsConnections, (elem) => {
        return elem === connection;
      });
    });
    connection.on('message', (message) => {
      this.handleMessage(message);
    });
    this.wsConnections.push(wsConnection);
  }

  handleMessage(message) {
    console.log(message);
    //TODO
  }

  subscribe(topic, connection) {
    let wsConnection = _.find(wsConnections, {
      connection
    });
    if (_.find(wsConnection.topics, topic) == null) {
      wsConnection.topics.push(topic);
    }
  }

  unsubscribe(topic) {
    let wsConnection = _.find(wsConnections, {
      connection: connection
    });
    _.remove(wsConnection.topics, topic);
  }

  send(message, wsConnection) {
    wsConnection.connection.send(message);
  }

  broadcast(message, topic) {
    //TODO
  }

}

module.exports = new BroadcasterService();
