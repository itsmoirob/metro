angular.module('routes', [
  'ui.router',
  'ngAnimate'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('parent', {
        url:'',
        abstract: true
    })

    .state('parent.displaySummaryProject', {
      url:'/site/summary/:siteResult',
      views: {
        'display@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySite.tmpl.html'
        },
        'other@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySiteList.tmpl.html'
        }
      }
    })
    .state('parent.displayGenerationProject', {
      url:'/site/generation/:siteResult',
      views: {
        'display@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySiteGeneration.tmpl.html'
        },
        'other@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySiteList.tmpl.html'
        }
      }
    })
    .state('parent.displayFinanceProject', {
      url:'/site/finance/:siteResult',
      views: {
        'display@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySiteFinance.tmpl.html'
        },
        'other@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySiteList.tmpl.html'
        }
      }
    })
    .state('parent.displayAdminProject', {
      url:'/site/admin/:siteResult',
      views: {
        'display@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySiteAdmin.tmpl.html'
        },
        'other@': {
          controller: 'DisplayCtrl',
          templateUrl: 'pages/displaySiteList.tmpl.html'
        }
      }
    })
    ;

    $urlRouterProvider.otherwise('/');
    })
;
