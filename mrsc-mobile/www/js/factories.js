angular.module('mrsc.factories', [])

  .factory('remoteRecommendations', function(DOMAIN, $http, $ionicLoading) {
    return {
      get: function () {

        // Put up a busy indicator
        $ionicLoading.show({template: '<p>Fetching Recommendations...</p><ion-spinner></ion-spinner>'});

        // Get the data
        return $http.get(DOMAIN + '/pages/get_recommendations.json').then(function(response) {
          recommendations = response.data;

          // Hide the busy indicator
          $ionicLoading.hide();

          // Return the result
          return recommendations;

        }, function(response) {

          // If we can't get the recommendations, use this hard coded one (useful for testing during "ionic serve" due to
          // CSRF issues.
          recommendations = [
            {
              "title": "Fredrik Björk - Vice President of Engineering at The RealReal, November 21, 2015",
              "body": "Jon is an excellent software engineer who integrates well with existing teams. Jon is easy going, a good listener and understands the needs of the business. I would recommend Jon to anyone looking for a seasoned Ruby on Rails engineer who can hit the ground running for a mission critical project.",
              "image_url": "img/fredrikbjork.png"
            }
          ];

          // Hide the busy indicator
          $ionicLoading.hide();

          // Return the result
          return recommendations;
        })
      }
    }
  })


  .factory('remoteProject', function(DOMAIN, $http, $ionicLoading, $httpParamSerializerJQLike, $location, $ionicPopup) {
    return {
      send: function (potentialProject) {

        // Nest the form's model in the required rails object
        var railsReadyPotentialProject = {
          potential_project: potentialProject
        };

        // Set content type
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        // Put up a busy indicator
        $ionicLoading.show({template: '<p>Saving...</p><ion-spinner></ion-spinner>'});

        // Post to the server
        $http.post(DOMAIN + '/pages/mobile_start_a_project', $httpParamSerializerJQLike(railsReadyPotentialProject)).then(function(response) {
          // Hide the busy indicator
          $ionicLoading.hide();

          // Tell the user it worked
          $ionicPopup.alert({
            title: 'Mission Ridge Software Consulting',
            templateUrl: 'templates/popup-start-a-project-send-ok.html'
          });

          // Redirect to the home page
          $location.path("/home");

          return railsReadyPotentialProject;

        }, function(response) {

          // Hide the busy indicator
          $ionicLoading.hide();

          // Tell the user it failed
          $ionicPopup.alert({
            title: 'Mission Ridge Software Consulting',
            subTitle: '<h4>ERROR</h4>',
            templateUrl: 'templates/popup-start-a-project-send-error.html'
          });

          // Redirect to the contact page
          $location.path("/tab/contact");

          return railsReadyPotentialProject;
        })
      }
    }
  });
