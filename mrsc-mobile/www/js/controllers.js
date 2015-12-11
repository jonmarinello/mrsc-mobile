angular.module('mrsc.controllers', [])

.controller('HomeCtrl', function($scope) {
})

.controller('ServicesCtrl', function($scope, $ionicSlideBoxDelegate) {
})

.controller('AboutCtrl', function($scope, $http, $ionicLoading) {
  $scope.show = function () {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function () {
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);
  $http.get('http://www.missionridgeconsulting.com/pages/get_recommendations.json').then(function(resp) {
    $scope.recommendations = resp.data;
    $scope.hide($ionicLoading);
  }, function(err) {
    // If we can't get the recommendations, use this hard coded one (useful for testing during "ionic serve" due to
    // CSRF issues.
    $scope.recommendations = [
      {"title":"Fredrik Björk - Vice President of Engineering at The RealReal, November 21, 2015", "body":"Jon is an excellent software engineer who integrates well with existing teams. Jon is easy going, a good listener and understands the needs of the business. I would recommend Jon to anyone looking for a seasoned Ruby on Rails engineer who can hit the ground running for a mission critical project.", "image_url":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/000/227/1a5/09b5b2c.jpg"}
    ];
    $scope.hide($ionicLoading);
  })
})

.controller('PortfolioCtrl', function($scope) {
})

.controller('ContactCtrl', function($scope) {
})

.controller('StartAProjectCtrl', function($scope) {
});
