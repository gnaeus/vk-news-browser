'use strict';

/**
 * Directives module
 */
angular.module('vkNewsBrowser.directives', ['vkNewsBrowser.utils'])
  .directive('ngClickLight',
  /**
   * `ngClickLight` directive: Same as `ngClick` but runs `$digest()`
   * on current scope instead of `$apply` on root scope
   * @param {Function} $parse Angular $parse service
   */
  ['$parse', function($parse) {
    function link(scope, element, attr) {
      element.bind('click', function(event) {
        var fn = $parse(attr['ngClickLight']);
        fn(scope, { $event: event });
        scope.$digest();
      });
    }

    return { restrict: 'A', link: link };
  }])
  .directive('ngSwitchClass',
  /**
   * `ngSwitchClass` directive: Adds css class (given as `ng-switch-class`
   * attribute content) to child of current element and removes it from
   * other children when this child is clicked. If child has attribute
   * `exclude-switch-class` directive misses this element.
   */
  [function() {
    function link(scope, element, attr) {
      var children = Array.prototype.filter.call(
        element.children(), function(child) {
          return !child.hasAttribute('exclude-switch-class');
        }
      );
      
      children = angular.element(children);

      children.bind('click', function() {
        children.removeClass(attr.ngSwitchClass);
        angular.element(this).addClass(attr.ngSwitchClass);
      });
    }

    return { restrict: 'A', link: link };
  }])
  .directive('ngCollapse',
  /**
   * `ngCollapse` directive: Adds to current element collapsing functionality.
   * Current element collapses/expands (by adding/removing `collapsed` css
   * class) when user clicks on element given as query selector in
   * `ng-collapse` attribute.
   * @attribute {String} collapseDirection `left`, `right`, `up` or `down`
   * @attribute {String} drawDelay Delay to draw element content (use this
   * attribute when adding `collapsed` class fires the css3 transition)
   * @attribute {*} collapsed If this attribute exists current element is
   * collapsed by default
   * @param {Object} Modernizr Modernizr object instance
   * @param {Function} resizeIFrame Funtcion to resize IFrame
   */
  ['Modernizr', 'resizeIFrame', function(Modernizr, resizeIFrame) {
    /**
     * Creates icons html strings depending of collapsing direction
     * @param {String} direction Direction of collapsing
     * @return {Object} Object with two html strings for icons
     */
    function getIcons(direction) {
      var collapse, expand;
      if (direction === 'right') {
        collapse = 'right'; expand = 'left';
      } else if (direction === 'left') {
        collapse = 'left'; expand = 'right';
      } else if (direction === 'up') {
        collapse = 'up'; expand = 'down';
      } else {  // if (direction === 'down') {
        collapse = 'down'; expand = 'up';
      }

      return {
        collapse: '<i class="icon-chevron-' + collapse +'"></i>',
        expand: '<i class="icon-chevron-' + expand +'"></i>'
      };
    }

    /**
     * Adds or removes `collapsed` css class to element and `hide` css class
     * to it's children. Then draws it content after given delay in ms
     * @param {Object} element Current element
     * @param {Object} control Collapsing control element
     * @param {Boolean} collapsed Is collapsed
     * @param {Object} icons Icons html object
     * @param {Number} [delay] Delay to draw content in ms
     */
    function toggleCollapse(element, control, collapsed, icons, delay) {
      /** Shows content of current element*/
      function showContent() {
        element.children().removeClass('hide');
      }

      if (collapsed) {
        element.addClass('collapsed');
        element.children().addClass('hide');
        control.html(icons.expand);
        control.removeClass('hide');
      } else {
        element.removeClass('collapsed');
        control.html(icons.collapse);
        if (delay) {
          setTimeout(showContent, delay);
        }
        else {
          showContent();
        }
      }
    }

    /** Link function */
    function link(scope, element, attrs) {
      var controlNode = element[0].querySelector(attrs.ngCollapse);
      if (!controlNode) return;

      var control = angular.element(controlNode);
      var icons = getIcons(attrs.collapseDirection);
      var collapsed = null != attrs.collapsed;
      var delay = attrs.drawDelay;
      var clicked = false;

      control.bind('click', function() {
        collapsed = !collapsed;
        if (!delay || !Modernizr.csstransitions) {
          toggleCollapse(element, control, collapsed, icons);
          resizeIFrame();
        } else {
          clicked = true;
          toggleCollapse(element, control, collapsed, icons, delay);
        }
      });

      if (delay && Modernizr.csstransitions) {
        element.bind('transitionend', function() {
          if (clicked) {
            clicked = false;
            resizeIFrame();
          }
        });
      }

      toggleCollapse(element, control, collapsed, icons);
    }

    return { restrict: 'A', link: link };
  }]);
