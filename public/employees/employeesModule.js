angular.module('employeesModule', [])
  .controller('EmployeesController', ['$scope', '$http',
    function($scope, $http) {
      $scope.model = undefined;

      $scope.$emit('initialized', 'employees');

    /*  $http.get('/roles')
        .then(function(resp) {
          $scope.model = resp.data;
        })
        .catch(console.log);
*/
    }
  ]);
