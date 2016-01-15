angular.module('loginModule', [])
  .controller('LoginController', ['$scope', '$http',
    function($scope, $http) {
      $scope.$emit('initialized', 'login');
      $scope.username = undefined;
      $scope.password = undefined;
      $scope.failReason = undefined;

      $scope.handleSignIn = function(username, password) {
        $scope.failReason = undefined;
        $http.post('/login/api/signin', {
            username: username,
            password: password
          })
          .then(function(){
            $scope.$emit('signin', username);
          })
          .catch(function(err){          
            if(err.status === 401){
              $scope.failReason = 'Wrong User Name or Password';
            } else{
              $scope.failReason = 'Sign-in failed';
              console.log(err);
            }
          });
      };
    }
  ]);
