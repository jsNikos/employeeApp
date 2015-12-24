angular.module('timeoffModule', [])
  .controller('TimeoffController', ['$scope', '$http',
    function($scope, $http) {
      $scope.$emit('initialized', 'timeoff');
    }
  ]);
