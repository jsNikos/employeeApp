angular.module('messagesModule', [])
  .controller('MessagesController', ['$scope', '$http',
    function($scope, $http) {
      $scope.roles = undefined;
      $scope.selectedMessage = undefined;
      $scope.newMessage = undefined;
      $scope.availableReceipients = undefined;

      $scope.showView = undefined; // editor

      $scope.$emit('initialized', 'messages');

      $scope.handleSelectMessage = function(message) {
        $scope.selectedMessage = message;
      };

      $scope.handleShowMessageCreator = function() {
        $scope.newMessage = {
          content: {
            title: null,
            body: null
          },
          to: undefined
        };
        $http.get('/employees/api/findEmployees')
          .then(function(resp) {
            $scope.availableReceipients = resp.data;
          })
          .catch(console.log);
        $scope.showView = 'editor';
      };

      $scope.handleSendMessage = function(message){
        $http.put('/message/api/create', message)
          .then(function(resp) {
            $scope.showView = undefined;
            $scope.newMessage = undefined;
          })
          .catch(console.log);
      }

      $scope.handleCancelCreate = function() {
        $scope.showView = undefined;
        $scope.newMessage = undefined;
      }

    }
  ]);
