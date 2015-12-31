angular.module('loginModule', [])
  .controller('LoginController', ['$scope', '$http',
    function($scope, $http) {
      $scope.$emit('initialized', 'login');
      $scope.username = undefined;
      $scope.password = undefined;

      $scope.handleSignIn = function(username, password) {
        $http.post('/login/api/signin', {
            username: username,
            password: password
          })
          .then(function(){
            $scope.$emit('signin', username);
          })
          .catch(console.log);
      };
    }
  ]);
