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

      $scope.handleSelectRole = function(role) {
        $scope.editedRole = role;
      };

      $scope.handleShowRoleCreator = function() {
        $scope.editedRole = {
          name: ''
        };
        $scope.showView = 'editor';
      };

      $scope.handleDeleteRole = function(role){
        $http.post('/roles/api/deleteRole', role)
          .then(function(resp){
            $scope.editedRole = undefined;
            _.remove($scope.roles, function(elem){
              return elem._id === role._id;
            });
          })
          .catch(console.log);
      };

      $scope.handleCreateRole = function(role) {
        $http.put('/roles/api/createRole', role)
          .then(function(resp) {
            $scope.roles.push(resp.data);
            $scope.showView = undefined;
            $scope.editedRole = undefined;
          })
          .catch(console.log);
      };

      $scope.handleCancelEdit = function() {
        $scope.showView = undefined;
        $scope.editedRole = undefined;
      }

    }
  ]);
