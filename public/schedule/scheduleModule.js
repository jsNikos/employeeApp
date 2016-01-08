angular.module('scheduleModule', [])
  .controller('ScheduleController', ['$scope', '$http',
    function($scope, $http) {
      $scope.model = undefined;
      $scope.showView = 'schedules'; // swapper, schedules

      $scope.selectedShift = undefined;
      $scope.swappers = undefined; // [Shift]
      $scope.selectedSwappers = []; // Shift

      $scope.$emit('initialized', 'schedule');

      $http.get('/schedule/api/init')
        .then(function(resp) {
          $scope.model = resp.data;
        })
        .catch(console.log);

      $scope.handleSelectShift = function(shift) {
        $http.post('/schedule/api/findPossibleSwappers', shift)
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
        requestSwap(selectedShift, swappers);
        resetSwapperView();
      }

      $scope.handleAskSelected = function(shift, swappers) {
        requestSwap(shift, swappers);
        resetSwapperView();
      }

      function requestSwap(selectedShift, swappers) {
        $http.put('/schedule/api/requestSwap', {
            shift: selectedShift,
            swappers: swappers
          })
          .then(resetSwapperView)
          .catch(console.log);
      }

      function resetSwapperView() {
        $scope.showView = 'schedules';
        $scope.selectedShift = undefined;
        $scope.selectedSwappers = undefined;
      }
    }
  ])
  .filter('swapperFilter', ['$filter', function($filter){
    return function(swapper){
      return  swapper.employee.name + ' ' + swapper.role.name + ' ' +
        $filter('date')(swapper.scheduleDate, 'EEEE d MMM yyyy') + ' ' +
        $filter('date')(swapper.starttime, 'h:mm a') + ' - ' +
        $filter('date')(swapper.endtime, 'h:mm a');
    };
  }]);
