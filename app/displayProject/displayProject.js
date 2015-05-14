angular.module('displayProject', [
  'ui.router',
  'ngAnimate',
  'listSites'
])

.config(function($stateProvider){
  $stateProvider
    .state('parent.displayProject', {
      url:'/site/',
      views: {
        'display@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/display.tmpl.html'
        },
        'other@': {

        }
      }
    });
})

.controller('DisplayCtrl', ['$scope', '$stateParams', '$http', '$log', function($scope,$stateParams,$http,$log){

  $scope.hello = "display controller";


}])

;
