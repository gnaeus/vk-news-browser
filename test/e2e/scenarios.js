'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('VK News Browser Application', function() {

  describe('Application Routing', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html');
    });


    it('should automatically redirect to /about when ' +
       'location hash/fragment is empty', function() {
      expect(browser().location().url()).toBe("/about");
    });

    describe('news', function() {
      beforeEach(function() {
        browser().navigateTo('#/news');
      });


      it('should render `news` template when user ' +
         'navigates to /news', function() {
        expect(element('[ng-view] section:first').attr('id'))
          .toEqual('news-content');
      });
    });

    describe('photos', function() {
      beforeEach(function() {
        browser().navigateTo('#/photos');
      });


      it('should render `photos` template when user ' +
         'navigates to /photos', function() {
        expect(element('[ng-view] section:first').attr('id'))
          .toEqual('photos-content');
      });
    });

    describe('settings', function() {
      beforeEach(function() {
        browser().navigateTo('#/settings');
      });


      it('should render `settings` template when user ' +
         'navigates to /settings', function() {
        expect(element('[ng-view] section:first').attr('id'))
          .toEqual('settings-content');
      });
    });

    describe('about', function() {
      beforeEach(function() {
        browser().navigateTo('#/about');
      });


      it('should render `about` template when user ' +
         'navigates to /about', function() {
        expect(element('[ng-view] section:first').attr('id'))
          .toEqual('about-content');
      });
    });

  });

});
