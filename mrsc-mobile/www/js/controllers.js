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

.controller('StartAProjectCtrl', function($scope, DOMAIN, $http, $ionicLoading, $httpParamSerializerJQLike, $location, $ionicPopup) {
  $scope.potential_project = {
  };

  $scope.startAProject = function(startAProjectForm) {
    $ionicLoading.show({template: '<p>Saving...</p><ion-spinner></ion-spinner>'});
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    if (startAProjectForm.$valid) {
      var rails_ready_potential_project = {
        potential_project: $scope.potential_project
      };
      $http.post(DOMAIN + '/pages/mobile_start_a_project', $httpParamSerializerJQLike(rails_ready_potential_project)).then(function(response) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Mission Ridge Software Consulting',
          template: 'Your project request have been successfully saved and a notification has been sent. We will contact you soon too discuss it.'
        });
        $location.path("/home");
      }, function(response) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Mission Ridge Software Consulting',
          template: 'An error orrured and we were unable to save your request.'
        });
        $location.path("/home");
      })
    };
  };
});
