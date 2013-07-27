'use strict';

/**
 * Services module
 */
angular.module('vkNewsBrowser.services', ['vkNewsBrowser.utils'])
  .value('version', '0.0.1')
  .service('API',
  ['VK', 'Q', function(VK, Q) {

    this.getFriends = function() {
      var deferred = Q.defer();

      VK.then(function(vk) {
        vk.api('friends.get',
          { fields: 'uid,first_name,last_name,photo'/*, test_mode: 1*/ },
          function(data) {
            deferred.resolve(data.response);
          });
      });

      return deferred.promise;
    }

    this.getNews = function() {
      var deferred = Q.defer();

      VK.then(function(vk) {
        vk.api('newsfeed.get',
          { count: 60, test_mode: 1},
          function(data) {
            deferred.resolve(data);
          });
      });

      return deferred.promise;
    }

  }]);
