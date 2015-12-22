var employeeApp = angular.module('employeeApp', [
    'ngRoute',
    'scheduleModule',
    'messagesModule',
    'timeoffModule',
    'availabilityModule'
  ])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/schedule', {
        templateUrl: 'schedule.html',
        controller: 'ScheduleController'
      }).
      when('/messages', {
        templateUrl: 'messages.html',
        controller: 'MessagesController'
      }).
      when('/availability', {
        templateUrl: 'availability.html',
        controller: 'AvailabilityController'
      }).
      when('/timeoff', {
        templateUrl: 'timeoff.html',
        controller: 'TimeoffController'
      }).
      otherwise({
        redirectTo: '/schedule'
      });
    }
  ])
  .controller('AppController', function($scope, $http, $location) {
      $scope.currentNav = 'timeoff';

      $scope.$on('initialized', function(event, navigationTarget){
        $scope.currentNav = navigationTarget;
      });

      $scope.handleNavigation = function(event) {

      };
    });
