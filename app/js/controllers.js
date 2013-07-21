'use strict';

/**
 * Controllers module
 */
angular.module('vkNewsBrowser.controllers', ['vkNewsBrowser.utils'])
  .controller('MainCtrl',
  /**
   * @function MainCtrl Main controller of the application
   * @param {Object} $scope Scope
   * @param {Function} resizeIFrame Function to resize IFrame
   */
  ['$scope', 'resizeIFrame', function($scope, resizeIFrame) {

    $scope.$on('$viewContentLoaded', resizeIFrame);
    $scope.$on('$includeContentLoaded', resizeIFrame);

    $scope.console = console;

    $scope.users = [
      {
        firstName: 'Иван', lastName: 'Петров',
        avatar: 'img/avatar.png', newsCount: 1
      },
      {
        firstName: 'Петр', lastName: 'Сидоров',
        avatar: 'img/avatar.png', newsCount: 2
      },
      {
        firstName: 'Сидор', lastName: 'Иванов',
        avatar: 'img/avatar.png', newsCount: 30
      },
      {
        firstName: 'Никита', lastName: 'Савушкин',
        avatar: 'img/avatar.png', newsCount: 356
      },
      {
        firstName: 'Иван', lastName: 'Петров',
        avatar: 'img/avatar.png', newsCount: 1000
      },
      {
        firstName: 'Константин Константинович', lastName: 'Константинов',
        avatar: 'img/avatar.png', newsCount: 2
      }
    ];
  }]);

