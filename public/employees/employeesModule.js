angular.module('employeesModule', ['localytics.directives'])
  .controller('EmployeesController', ['$scope', '$http',
    function($scope, $http) {
      $scope.employees = undefined;
      $scope.editedEmployee = undefined;
      $scope.availableRoles = undefined;

      $scope.showView = undefined; // editor

      $scope.$emit('initialized', 'employees');

      $http.get('/employees/api/findEmployees')
        .then(function(resp) {
          $scope.employees = resp.data;
        })
        .catch(console.log);

      $scope.isNewEmployee = function(employee) {
        return employee._id == undefined;
      }

      $scope.handleSelectEmployee = function(employee) {
        $scope.editedEmployee = employee;
      };

      $scope.handleShowEmployeeCreator = function() {
        $scope.editedEmployee = {
          name: ''
        };
        $scope.showView = 'editor';
        $http.get('roles/api/findRoles')
          .then(function(resp) {
            $scope.availableRoles = resp.data;
          })
          .catch(console.log);
      };

      $scope.handleShowEmployeeEditor = function(role) {
        $scope.showView = 'editor';
        $http.get('roles/api/findRoles')
          .then(function(resp) {
            $scope.availableRoles = resp.data;
          })
          .catch(console.log);
      }

      $scope.handleDeleteEmployee = function(employee) {
        $http.post('/employees/api/deleteEmployee', employee)
          .then(function(resp) {
            $scope.editedEmployee = undefined;
            _.remove($scope.employees, function(elem) {
              return elem._id === employee._id;
            });
          })
          .catch(console.log);
      };

      $scope.handleSaveEmployee = function(employee) {
        if ($scope.isNewEmployee(employee)) {
          createEmployee(employee);
        } else {
          saveEmployee(employee);
        }
      };

      function saveEmployee(employee) {
        $http.post('/employees/api/saveEmployee', employee)
          .then(function(resp) {
            $scope.showView = undefined;
            $scope.editedEmployee = undefined;
          })
          .catch(console.log);
      }

      function createEmployee(employee) {
        $http.put('/employees/api/createEmployee', employee)
          .then(function(resp) {
            $scope.employees.push(resp.data);
            $scope.showView = undefined;
            $scope.editedEmployee = undefined;
          })
          .catch(console.log);
      }

      $scope.handleCancelEdit = function() {
        $scope.showView = undefined;
        $scope.editedEmployee = undefined;
      }

    }
  ]);
