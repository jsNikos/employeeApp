var employeeApp = angular.module('employeeApp', [
    'ngRoute',
    'scheduleModule',
    'messagesModule',
    'timeoffModule',
    'availabilityModule',
    'rolesModule',
    'employeesModule',
    'loginModule'
  ])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/schedule', {
        templateUrl: 'schedule/schedule.html',
        controller: 'ScheduleController'
      }).
      when('/messages', {
        templateUrl: 'messages/messages.html',
        controller: 'MessagesController'
      }).
      when('/availability', {
        templateUrl: 'availability/availability.html',
        controller: 'AvailabilityController'
      }).
      when('/timeoff', {
        templateUrl: 'timeoff/timeoff.html',
        controller: 'TimeoffController'
      }).
      when('/roles', {
        templateUrl: 'roles/roles.html',
        controller: 'RolesController'
      }).
      when('/employees', {
        templateUrl: 'employees/employees.html',
        controller: 'EmployeesController'
      }).
      when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController'
      }).
      otherwise({
        redirectTo: '/schedule'
      });
    }
  ])
  .controller('AppController', function($scope, $http, $location) {
    $scope.username = undefined; // logged-in user

    $scope.$on('initialized', function(event, navigationTarget) {
      $scope.currentNav = navigationTarget;
    });

    $scope.$on('signin', function(event, username) {
      $scope.username = username;
    });

    $scope.handleNavigation = function(event) {

    };
  });
