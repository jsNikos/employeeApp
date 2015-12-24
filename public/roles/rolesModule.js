angular.module('rolesModule', [])
  .controller('RolesController', ['$scope', '$http',
    function($scope, $http) {
      $scope.roles = undefined;
      $scope.editedRole = undefined;

      $scope.showView = undefined; // editor

      $scope.$emit('initialized', 'roles');

      $http.get('/roles/api/findRoles')
        .then(function(resp) {
          $scope.roles = resp.data;
        })
        .catch(console.log);

      $scope.handleShowRoleCreator = function() {
        $scope.editedRole = {
          name: ''
        };
        $scope.showView = 'editor';
      };

      $scope.handleCreateRole = function(role) {
        $http.put('/roles/api/createRole', role)
          .then(function(resp) {
            $scope.roles.push(resp.data);
          })
          .catch(console.log);
      };

    }
  ]);
