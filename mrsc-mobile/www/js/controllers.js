angular.module('mrsc.controllers', [])

.controller('HomeCtrl', function($scope) {
})

.controller('ServicesCtrl', function($scope, $ionicSlideBoxDelegate) {
})

.controller('AboutCtrl', function($scope, DOMAIN, $http, $ionicLoading) {
  // Put up a busy indicator
  $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>'});

  // Get the data
  $http.get(DOMAIN + '/pages/get_recommendations.json').then(function(resp) {
    $scope.recommendations = resp.data;
    // Hide the busy indicator
    $ionicLoading.hide();

  }, function(err) {
    // If we can't get the recommendations, use this hard coded one (useful for testing during "ionic serve" due to
    // CSRF issues.
    $scope.recommendations = [
      {"title":"Fredrik Björk - Vice President of Engineering at The RealReal, November 21, 2015", "body":"Jon is an excellent software engineer who integrates well with existing teams. Jon is easy going, a good listener and understands the needs of the business. I would recommend Jon to anyone looking for a seasoned Ruby on Rails engineer who can hit the ground running for a mission critical project.", "image_url":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/000/227/1a5/09b5b2c.jpg"}
    ];

    // Hide the busy indicator
    $ionicLoading.hide();
  })
})

.controller('PortfolioCtrl', function($scope) {
})

.controller('ContactCtrl', function($scope) {
})

.controller('StartAProjectCtrl', function($scope, DOMAIN, $http, $ionicLoading, $httpParamSerializerJQLike, $location, $ionicPopup) {
  // Initialize the form's model
  $scope.potentialProject = {
  };

  $scope.startAProject = function(startAProjectForm) {
    // Validate the form and if it's good, poot the data to the server
    if (startAProjectForm.$valid) {
      // Put up a busy indicator
      $ionicLoading.show({template: '<p>Saving...</p><ion-spinner></ion-spinner>'});

      // Next the form's model in the required rails object
      var railsReadyPotentialProject = {
        potential_project: $scope.potentialProject
      }

      // Set content type
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      // Post to the server
      $http.post(DOMAIN + '/pages/mobile_start_a_project', $httpParamSerializerJQLike(railsReadyPotentialProject)).then(function(response) {
        // Hide the busy indicator
        $ionicLoading.hide();

        // Tell the user it worked
        $ionicPopup.alert({
          title: 'Mission Ridge Software Consulting',
          template: '<p>Your project request has been successfully saved and a notification has been sent to us.</p><p>We will contact you soon to discuss it.</p><p>Thank you for contacting us!</p>'
        });

        // Redirect to the home page
        $location.path("/home");
      }, function(response) {
        // Hide the busy indicator
        $ionicLoading.hide();

        // Tell the user it failed
        $ionicPopup.alert({
          title: 'Mission Ridge Software Consulting',
          template: '<p>An error occurred and we were unable to save your request.</p><p>Please try contacting us by email, calling or Skype.</p>'
        });

        // Redirect to the contact page
        $location.path("/tab/contact");
      })
    }
    else {
      // Form validation failed so tell the user
      $ionicPopup.alert({
        title: 'Mission Ridge Software Consulting',
        template: '<p>One or more errors found while validating your information.</p><p>Please be sure to enter at least a valid <strong>Name</strong>, <strong>Email Address</strong> and <strong>Project Idea</strong> and try again.</p>'
      });
    }
  }
});
