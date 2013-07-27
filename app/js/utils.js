'use strict';

/**
 * Utils
 */
angular.module('vkNewsBrowser.utils', [])
  .value('Q',/* Kris Kowal's Q */ Q)
  .value('Modernizr',/* Modernizr */ Modernizr)
  .value('lodash', /* Lo-Dash */ _)
  .factory('VK',
  /**
   * @object VK Promise of vkontakte-api
   * @param {Object} Q Kris Kowal's Q
   */
  ['Q', function(Q) {
    var deferred = Q.defer();
    VK.init(function() {
      deferred.resolve(VK);
    });
    return deferred.promise;
  }])
  .factory('resizeIFrame',
  /**
   * @function resizeIFrame Resizes IFrame to size of body content
   * and sets the correct height of sidebar
   * @param {Object} VK Promise of vkontakte-api
   */
  ['VK', function(VK) {
    return function() {
      var body = document.querySelector('body');
      body.style.height = 'auto';
      var rect = body.getBoundingClientRect();
      body.style.height = rect.height + 'px';
      VK.then(function(vk) {
        vk.callMethod('resizeWindow', rect.width, rect.height);
      });
      /*console.log('resize');*/
    };
  }]);
