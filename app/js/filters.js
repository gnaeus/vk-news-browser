'use strict';

/**
 * Filters module
 */
angular.module('vkNewsBrowser.filters', [])
  .filter('test',
  [function() {
    return function(text) {
      return text;
    }
  }]);
