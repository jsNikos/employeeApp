angular.module('messagesModule', [])
  .controller('MessagesController', ['$scope', '$http',
    function($scope, $http) {
      $scope.$emit('initialized', 'messages');
    }
  ]);
