"use strict";

var _ = require('lodash');
var employeeService = require('./EmployeeService');

class BroadcasterService {
  constructor() {
    this.wsConnections = [];
    this.topicNames = {
      'message/change': 'message/change',
      'schedule/change': 'schedule/change'
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
      topics: [],
        hasTopic(topic) {
          return _.find(this.topics, topic);
        }
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
      this.handleMessage(message, connection);
    });
    this.wsConnections.push(wsConnection);
  }

  handleMessage(message, connection) {
    let data = JSON.parse(message.utf8Data);
    switch (data.type) {
      case 'SUBSCRIBE':
        this.subscribe(data.topic, connection);
        break;
      case 'UNSUBSCRIBE':
        this.unsubscribe(data.topic, connection);
        break;
      default:
        throw new Error('Not supported message-type for websocket ' + data.type);
    }
  }

  subscribe(topic, connection) {
    let wsConnection = _.find(this.wsConnections, {
      connection
    });
    if (_.find(wsConnection.topics, topic) == null) {
      wsConnection.topics.push(topic);
    }
  }

  unsubscribe(topic, connection) {
    let wsConnection = _.find(this.wsConnections, {
      connection
    });
    _.remove(wsConnection.topics, topic);
  }

  send(message, wsConnection) {
    wsConnection.connection.send(JSON.stringify(message));
  }

  // message: {data: Object, details: Mixed, topic: Topic}
  broadcast(message, topic) {
    message.topic = topic;
    _.chain(this.wsConnections)
      .filter((wsConnection) => {
        return wsConnection.hasTopic(topic)
      })
      .forEach((wsConnection) => {
        this.send(message, wsConnection);
      })
      .value();
  }

}

module.exports = new BroadcasterService();
