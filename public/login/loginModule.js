angular.module('loginModule', [])
  .controller('LoginController', ['$scope', '$http',
    function($scope, $http) {
      $scope.$emit('initialized', 'login');
      $scope.userName = undefined;
      $scope.password = undefined;

      $scope.handleSignIn = function(userName, password) {
        $http.post('/login/api/signin', {
            userName: userName,
            password: password
          })
          .then(function(){
            $scope.$emit('signin', userName);
          })
          .catch(console.log);
      };
    }
  ]);
