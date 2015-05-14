angular.module('metro', [
  'ui.router',
  'ngAnimate',
  'listSites',
  'displayProject'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('parent', {
        url:'',
        abstract: true
    })
  ;

  $urlRouterProvider.otherwise('/');
})


;
