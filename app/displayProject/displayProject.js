angular.module('displayProject', [
  'ui.router',
  'ngAnimate',
  'listSites',
  'uiGmapgoogle-maps',
  'highcharts-ng'
])

.config(function($stateProvider){
  $stateProvider
    .state('parent.displayProject', {
      url:'/site/:siteResult',
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
    });
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
        var arrayData = {
           data: []
         };

         for (var i = 0; i < result.generation.length; i++) {
           arrayData.data.push([result.generation[i].timeU,result.generation[i].generation]);
         }


           $scope.generationArray = arrayData;

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
                 series: [],
                 title: {
                     text: 'Hello'
                 },
                 useHighStocks: true
             };

             $scope.test = 1;
           $scope.chartConfig.series.push($scope.generationArray);


    });








}])

;
