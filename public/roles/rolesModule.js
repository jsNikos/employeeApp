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

      $scope.isNewRole = function(role) {
        return role._id == undefined;
      }

      $scope.handleSelectRole = function(role) {
        $scope.editedRole = role;
      };

      $scope.handleShowRoleCreator = function() {
        $scope.editedRole = {
          name: ''
        };
        $scope.showView = 'editor';
      };

      $scope.handleShowRoleEditor = function(role) {
        $scope.showView = 'editor';
      }

      $scope.handleDeleteRole = function(role) {
        $http.post('/roles/api/deleteRole', role)
          .then(function(resp) {
            $scope.editedRole = undefined;
            _.remove($scope.roles, function(elem) {
              return elem._id === role._id;
            });
          })
          .catch(console.log);
      };

      $scope.handleSaveRole = function(role){
        if($scope.isNewRole(role)){
            createRole(role);
        } else{
          saveRole(role);
        }
      };

      function saveRole(role) {
        $http.post('/roles/api/saveRole', role)
          .then(function(resp) {
            $scope.showView = undefined;
            $scope.editedRole = undefined;
          })
          .catch(console.log);
      }

      function createRole(role) {
        $http.put('/roles/api/createRole', role)
          .then(function(resp) {
            $scope.roles.push(resp.data);
            $scope.showView = undefined;
            $scope.editedRole = undefined;
          })
          .catch(console.log);
      }

      $scope.handleCancelEdit = function() {
        $scope.showView = undefined;
        $scope.editedRole = undefined;
      }

    }
  ]);
