'use strict';

/**
 * Controllers module
 */
angular.module('vkNewsBrowser.controllers', [
    'vkNewsBrowser.utils', 'vkNewsBrowser.services'
  ])
  .controller('StubCtrl', ['$scope', function($scope) {}])// TODO: replace by other
  .controller('MainCtrl',
  /**
   * @function MainCtrl Main controller of the application
   * @param {Object} $scope Scope
   * @param {Function} resizeIFrame Function to resize IFrame
   */
  ['$scope', 'API', 'resizeIFrame', function($scope, API, resizeIFrame) {
    //$scope.console = console;

    $scope.$on('$viewContentLoaded', resizeIFrame);
    $scope.$on('$includeContentLoaded', resizeIFrame);

    API.getFriends()
      .then(function(users) {
        $scope.users = users;
        $scope.$digest();
        return API.getNews();
      })
      .then(function(news) {
        console.log(news);
        $scope.$digest();
        resizeIFrame();
      });

  }]);

