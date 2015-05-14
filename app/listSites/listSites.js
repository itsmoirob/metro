angular.module('listSites', [
  'ui.router',
  'ngAnimate'
])

.config(function($stateProvider){
  $stateProvider
    .state('parent.listSites', {
      url:'/',
      views: {
        'display@': {
          controller: 'MainCtrl',
          templateUrl: 'pages/select.tmpl.html'
        },
        'other@': {

        }
      }
    });
})

.controller('MainCtrl', ['$scope', '$stateParams', '$http', '$log', function($scope,$stateParams,$http,$log){

  $scope.hello = "hello";

  $http
    .get('php/pickUp.php')
    .success(function(result,status) {
      $scope.introSites = result;
    });

}])

;
