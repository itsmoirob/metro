angular.module('metro', [
  'ui.router',
  'ngAnimate',
  'listSites',
  'displayProject',
  'uiGmapgoogle-maps'
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
