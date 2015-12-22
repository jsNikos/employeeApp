angular.module('scheduleModule', [])
  .controller('ScheduleController', ['$scope', '$http',
    function($scope, $http) {
      $scope.model = undefined;
      $scope.showView = 'schedules'; // swapper, schedules

      $scope.selectedShift = undefined;
      $scope.swappers = undefined; // [Shift]
      $scope.selectedSwappers = undefined;

      $scope.$emit('initialized', 'schedule');

      $http.get('/init', {
          employee: 'niko'
        })
        .then(function(resp) {
          $scope.model = resp.data;
        })
        .catch(console.log);

      $scope.handleSelectShift = function(shift) {
        $http.get('/swappers', {
            shift: shift
          })
          .then(function(resp) {
            $scope.swappers = resp.data;
            $scope.selectedShift = shift;
            $scope.showView = 'swapper';
          })
          .catch(console.log);
      }

      $scope.handleCancelEdit = function() {
        resetSwapperView();
      }

      $scope.handleAskAll = function(selectedShift, swappers) {
        resetSwapperView();
      }

      $scope.handleAskSelected = function(selectedShift, selectedSwappers) {
        resetSwapperView();
      }

      function resetSwapperView() {
        $scope.showView = 'schedules';
        $scope.selectedShift = undefined;
        $scope.selectedSwappers = undefined;
      }
    }
  ]);
