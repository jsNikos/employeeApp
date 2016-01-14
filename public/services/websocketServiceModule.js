angular.module('websocketServiceModule', ['ngWebSocket'])
  .factory('websocketService', ['$websocket', function($websocket) {
    return new WebsocketService();

    function WebsocketService() {
      var scope = this;
      var protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      var subscribtions = []; // {topic: Topic, onMessage: function}
      var wasOpen = false;

      var dataStream = $websocket(protocol + '://' + window.location.host + '/ws/register');
      dataStream.onOpen(function() {
        console.log('opened websocket');
        if (wasOpen) {
          console.log('trying resubscribe');
          subscribtions.forEach(function(subscribtion) {
            scope.subscribe(subscribtion.topic, subscribtion.onMessage);
          });
        }
      });
      dataStream.onClose(function() {
        wasOpen = true;
      });
      dataStream.onError(console.log);
      dataStream.onMessage(function(resp) {
        console.log('received broadcast message:');
        console.log(resp);
        var message = JSON.parse(resp.data);
        console.log(message);
        var subsribtion = _.find(subscribtions, {topic: message.topic});
        if(subsribtion != null){
          subsribtion.onMessage(message);
        }
      });

      this.subscribe = function(topic, onMessage) {
        console.log('subscribing to topic ' + JSON.stringify(topic));
        dataStream.send({
          type: 'SUBSCRIBE',
          topic: topic
        });
        var subsribtion = {
          topic: topic,
          onMessage: onMessage
        };
        if (_.find(subscribtions, subsribtion) == null) {
          subscribtions.push(subsribtion);
        }
      };

      this.unsubscribe = function(topic) {
        console.log('unsubscribing to topic ' + JSON.stringify(topic));
        dataStream.send({
          type: 'UNSUBSCRIBE',
          topic: topic
        });
        _.remove(subscribtions, {
          topic: topic
        });
      };

      this.createTopic = function(name, employeeId) {
        return {
          name: name,
          employeeId: employeeId
        };
      };

    }
  }]);
