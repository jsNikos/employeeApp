angular.module('websocketServiceModule', [])
.factory('websocketService', ['$q', function($q){
  return new WebsocketService();

  function WebsocketService(){
    this.send = function(message){
      console.log(message);
    };
  }
}]);
