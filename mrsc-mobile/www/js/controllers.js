angular.module('mrsc.controllers', [])

  .controller('HomeCtrl', function($scope) {
  })


  .controller('ServicesCtrl', function($scope) {
  })


  .controller('AboutCtrl', function($scope, remoteRecommendations) {
    $scope.doRefresh = function() {
      remoteRecommendations.get().then(function(recommendations) {
        $scope.recommendations = recommendations;
      });

      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    };

    remoteRecommendations.get().then(function(recommendations) {
      $scope.recommendations = recommendations;
    });
  })


  .controller('PortfolioCtrl', function($scope) {
  })


  .controller('ContactCtrl', function($scope) {
  })


  .controller('StartAProjectCtrl', function($scope, $ionicPopup, remoteProject) {
    // Initialize the form's model
    $scope.potentialProject = {
    };

    $scope.startAProject = function(startAProjectForm) {
      // Validate the form and if it's good, send the data to the server
      if (startAProjectForm.$valid) {
        potentialProject = $scope.potentialProject;
        remoteProject.send(potentialProject);
      } else {
        // Form validation failed so tell the user
        $ionicPopup.alert({
          title: 'Mission Ridge Software Consulting',
          subTitle: '<h4>ERROR</h4>',
          templateUrl: 'templates/popup-start-a-project-form-error.html'
        });
      }
    }
  });
