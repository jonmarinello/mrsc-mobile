angular.module('mrsc.controllers', [])

.controller('HomeCtrl', function($scope) {
})

.controller('ServicesCtrl', function($scope, $ionicSlideBoxDelegate) {
})

.controller('AboutCtrl', function($scope, DOMAIN, $http, $ionicLoading) {
  $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>'});
  $http.get(DOMAIN + '/pages/get_recommendations.json').then(function(resp) {
    $scope.recommendations = resp.data;
    $ionicLoading.hide();
  }, function(err) {
    // If we can't get the recommendations, use this hard coded one (useful for testing during "ionic serve" due to
    // CSRF issues.
    $scope.recommendations = [
      {"title":"Fredrik Björk - Vice President of Engineering at The RealReal, November 21, 2015", "body":"Jon is an excellent software engineer who integrates well with existing teams. Jon is easy going, a good listener and understands the needs of the business. I would recommend Jon to anyone looking for a seasoned Ruby on Rails engineer who can hit the ground running for a mission critical project.", "image_url":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/000/227/1a5/09b5b2c.jpg"}
    ];
    $ionicLoading.hide();
  })
})

.controller('PortfolioCtrl', function($scope) {
})

.controller('ContactCtrl', function($scope) {
})

.controller('StartAProjectCtrl', function($scope, DOMAIN, $http, $ionicLoading) {
  $scope.startAProject = function(potential_project) {
    $ionicLoading.show({template: '<p>Saving...</p><ion-spinner></ion-spinner>'});
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    if (potential_project.$valid) {
      $http.post(DOMAIN + '/pages/start_a_project', potential_project).then(function(resp) {
        $ionicLoading.hide();
        alert('Your project request have been successfully saved and a notification has been sent.')
      }, function(err) {
        $ionicLoading.hide();
        alert('We were unable to save your request.')
      })

    }
  };
});
