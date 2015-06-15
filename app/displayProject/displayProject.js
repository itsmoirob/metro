angular.module('displayProject', [
  'ui.router',
  'ngAnimate',
  'listSites',
  'uiGmapgoogle-maps',
  'highcharts-ng'
])

.config(function($stateProvider){
  $stateProvider
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
})

.controller('DisplayCtrl', ['$scope', '$stateParams', '$http', '$log', '$state', function($scope,$stateParams,$http,$log,$state){


  $http
    .get('php/displaySite.php', {
      params: {
        id: $stateParams.siteResult
      }
    })
    .success(function(result,status) {
      $scope.currentDisplaySite = result;
      $scope.map = { center: { latitude: result.site[0].latitude, longitude: result.site[0].longitude }, zoom: 16 };
      $scope.marker = {
          id: $stateParams.siteResult,
          coords: {
            latitude: result.site[0].latitude,
            longitude: result.site[0].longitude
          },
          options: { draggable: true }
        };

        // Chart for inverter generation
        $scope.chartConfig = {
          options: {
           chart: {
             zoomType: 'x'
           },
           rangeSelector: {
             enabled: true
           },
           navigator: {
             enabled: true
           }
         },
         series: result.generation,
         title: {
           text: 'Generation at inverter'
         },
         useHighStocks: true
       };

      //  Chart for export generation
       $scope.chartExport = {
         options: {
           chart: {
             zoomType: 'x'
           },
           rangeSelector: {
             enabled: true
           },
           navigator: {
             enabled: true
           }
         },
         series: result.export,
         title: {
           text: 'Generation at export'
         },
         useHighStocks: true
       };
     });

   }])

;
