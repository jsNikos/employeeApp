angular.module('websocketServiceModule', ['ngWebSocket'])
  .factory('websocketService', ['$websocket', function($websocket) {
    return new WebsocketService();

    function WebsocketService() {
      var scope = this;
      var protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      var subscribtions = [];
      var wasOpen = false;

      var dataStream = $websocket(protocol + '://' + window.location.host + '/ws/register');
      dataStream.onOpen(function() {
        console.log('opened websocket');
        if (wasOpen) {
          subscribtions.forEach(function(topic) {
            console.log('found former subsribtions');
            scope.subscribe(topic);
          });
        }
      });
      dataStream.onClose(function(){
        wasOpen = true;
      });
      dataStream.onError(console.log);
      dataStream.onMessage(function(message) {
        //TODO
        console.log(JSON.parse(message.data));
      });

      this.subscribe = function(topic) {
        console.log('subscribing to topic ' + JSON.stringify(topic));
        dataStream.send({
          type: 'SUBSCRIBE',
          topic: topic
        });
        if (_.find(subscribtions, topic) == null) {
          subscribtions.push(topic);
        }
      };

      this.unsubscribe = function(topic) {
        console.log('unsubscribing to topic ' + JSON.stringify(topic));
        dataStream.send({
          type: 'UNSUBSCRIBE',
          topic: topic
        });
        _.remove(subscribtions, topic);
      };

      this.createTopic = function(name, employeeId) {
        return {
          name: name,
          employeeId: employeeId
        };
      };

    }
  }]);
