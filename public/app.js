var employeeApp = angular.module('employeeApp', [
    'ngRoute',    
    'scheduleModule',
    'messagesModule',
    'timeoffModule',
    'availabilityModule',
    'rolesModule',
    'employeesModule',
    'loginModule',
    'schedulerModule'
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
      when('/scheduler', {
        templateUrl: 'scheduler/scheduler.html',
        controller: 'SchedulerController'
      }).
      otherwise({
        redirectTo: '/schedule'
      });
    }
  ])
  .controller('AppController', function($scope, $http, $location) {
    $scope.username = undefined; // logged-in user
    $scope.messages = undefined; // message for current user

    $http.get('/init/api/init')
      .then(function(resp){
        $scope.username = resp.data.user.name;
        $scope.messages = resp.data.messages;
      });

    $scope.$on('initialized', function(event, navigationTarget) {
      $scope.currentNav = navigationTarget;
    });

    $scope.$on('signin', function(event, username) {
      $scope.username = username;
    });

    $scope.handleNavigation = function(event) {

    };
  });
