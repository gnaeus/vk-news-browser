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
          {fields: 'uid,first_name,last_name,photo', test_mode: 1},
          function(data) { // TODO: add rejection
            deferred.resolve(data.response);
          });
      });

      return deferred.promise;
    };

    this.getNews = function() {
      var deferred = Q.defer();

      VK.then(function(vk) {
        vk.api('newsfeed.get',
          {count: 100, test_mode: 1},
          function(data) { // TODO: add rejection
            deferred.resolve(data.response.items);
          });
      });

      return deferred.promise;
    };

  }])
  .service('storage',
  ['API', 'Q', 'lodash', function(API, Q, _) {
    var promise = Q.all([API.getFriends(), API.getNews()])
      .then(function(friends, news) {
         _.groupJoin(friends, news,
           function(f) { return f.uid; },
           function(n) { return n.source_id; },
           function(f, nGr) { f.news = nGr; }
         );
         return friends;
      });

    this.getFriends = function(pageNumber, pageSize) {
      return promise.then(function(friends) {
        var start = pageNumber * pageSize, end = start + pageSize;
         return friends.slice(start, end);
      });
    };
  }]);
