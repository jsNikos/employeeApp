angular.module('schedulerModule', ['ui.bootstrap'])
  .controller('SchedulerController', ['$scope', '$http',
    function($scope, $http) {
      $scope.newShift = createNewShift();
      $scope.availableEmployees = undefined; // employees

      $scope.showView = undefined; // editor
      $scope.scheduleDatePicker = {
        open: false
      };

      $scope.$emit('initialized', 'scheduler');

      $http.get('employees/api/findEmployees')
        .then(function(resp) {
          $scope.availableEmployees = resp.data;
        })
        .catch(console.log);

      function createNewShift() {
        var now = Date.now();
        return {
          scheduleDate: now,
          starttime: now,
          endtime: now,
        }
      }

      $scope.openScheduleDatePicker = function() {
        $scope.scheduleDatePicker.open = true;
      };

      $scope.handleSave = function(shift) {
        console.log(shift);
        $http.put('/scheduler/api/createShift', shift)
          .then(function(resp) {})
          .catch(console.log);
      };

    }
  ]);
