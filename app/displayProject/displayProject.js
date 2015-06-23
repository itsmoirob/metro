angular.module('displayProject', [
  'ui.router',
  'ngAnimate',
  'listSites',
  'uiGmapgoogle-maps',
  'highcharts-ng'
])



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
