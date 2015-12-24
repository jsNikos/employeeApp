angular.module('availabilityModule', [])
  .controller('AvailabilityController', ['$scope', '$http',
    function($scope, $http) {
      $scope.$emit('initialized', 'availability');
    }
  ]);
