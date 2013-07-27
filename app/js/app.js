/**
 * @license
 * Copyright © 2013 Dmitry Panyushkin
 * Based on `angular-seed` <https://github.com/angular/angular-seed>
 * Available under MIT license <http://opensource.org/licenses/MIT>
 */
'use strict';

/**
 * Main module of `vkNewsBrowser` application
 */
angular.module('vkNewsBrowser',
  [
    'vkNewsBrowser.filters',
    'vkNewsBrowser.services',
    'vkNewsBrowser.directives',
    'vkNewsBrowser.controllers'
  ])
  .config(
  ['$routeProvider', function($routeProvider) {
    $routeProvider.when('/news', {
      templateUrl: 'partials/news.html',
      controller: 'StubCtrl'
    });
    $routeProvider.when('/photos', {
      templateUrl: 'partials/photos.html',
      controller: 'StubCtrl'
    });
    $routeProvider.when('/settings', {
      templateUrl: 'partials/settings.html',
      controller: 'StubCtrl'
    });
    $routeProvider.when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'StubCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/about' });
  }]);
