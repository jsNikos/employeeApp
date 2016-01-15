var employeeApp = angular.module('employeeApp', [
    'ngRoute',
    'scheduleModule',
    'messagesModule',
    'timeoffModule',
    'availabilityModule',
    'rolesModule',
    'employeesModule',
    'loginModule',
    'schedulerModule',
    'websocketServiceModule'
  ])
  .config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {

      $httpProvider.interceptors.push(function($q, $location) {
        return {
          'responseError': function(rejection) {
            if(rejection.status == 401){
              $location.path('/login');
            }
            return $q.reject(rejection);
          }
        };
      });

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
  .controller('AppController', function($scope, $http, $location, websocketService) {
    $scope.user = undefined; // logged-in user
    $scope.messages = undefined; // message for current user

    $http.get('/init/api/init')
      .then(function(resp) {
        $scope.user = resp.data.user;
        $scope.username = resp.data.user.name;
        $scope.messages = resp.data.messages;
        websocketService.subscribe(websocketService.createTopic('message/change', $scope.user._id), $scope.handleMessageChange);
      });

    $scope.handleMessageChange = function(broadcastMsg) {
      var incMessage = broadcastMsg.data;
      if (broadcastMsg.details === 'save') {
        if (_.find($scope.messages, {
            _id: incMessage._id
          }) == null) {
          $scope.messages.push(incMessage);
        }
      } else if (broadcastMsg.details === 'remove') {
        _.remove($scope.messages, {
          _id: incMessage._id
        });
      }
    };

    $scope.$on('initialized', function(event, navigationTarget) {
      $scope.currentNav = navigationTarget;
    });

    $scope.$on('signin', function(event, username) {
      $scope.username = username;
      $location.path('/');
    });

    $scope.handleNavigation = function(event) {

    };
  });
