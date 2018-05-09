/**
 * Small Animation tool for x,y transforms
 * To use add the following to elements you want to animate:
 * 1. add class `scroll-motion`
 * 2. add data attribute(s) `data-speed-y="{{2}}"` and/or `data-speed-x="{{2}}"` || `data-observe={{0}}
 * 3. instantiate with new ScrollMotion()
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.ScrollMotion = factory();
  }
}(this, function () {
  const ScrollMotion = function (selector) {
    let elems;
    let self = {};
    let pause = true;
    let scrollY = window.scrollY;
    selector = selector || '.scroll-motion'; // Default is scroll-motion class
    let userOptions = Array.prototype.slice.apply(arguments).slice(1)[0];

    // Default options
    self.options = {
      speedX: false,
      speedY: -2,
      observe: 1,
      visibleAmount: 0
    };

    // User defined options
    if (userOptions) {
      Object.keys(userOptions).forEach(function (key) {
        self.options[key] = userOptions[key];
      });
    }

    // checks if element is in view
    let observeElem = new IntersectionObserver(observerEvent);
    function observerEvent (entries, observer) {
      entries.forEach(function (entry) {
        // check if element is in view (and how much of elem is in view = 0)
        entry.target.inView = entry.intersectionRatio > 0;
        if (entry.target.inView) {
          entry.target.initScrollPos = (entry.target.initScrollPos === false) ? window.scrollY : entry.target.initScrollPos;
        }
        // run our update function to start animating
        if (entry.target.inView) update();
      });
    }

    // our animation rate
    var loop = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (callback) { setTimeout(callback, 1000 / 60); };

    // checks which transform property we should use based on the browser ::  `-webkitTransform` VS `transform`
    var transformProp = window.transformProp || (function () {
      let testEl = document.createElement('div');
      if (testEl.style.transform === null) {
        let vendors = ['Webkit', 'Moz', 'ms'];
        for (let vendor in vendors) {
          if (testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
            return vendors[vendor] + 'Transform';
          }
        }
      }
      return 'transform';
    })();

    let init = function () {
      elems = document.querySelectorAll(selector);
      // stop everything if there are no elements to animate
      if (!elems.length) {
        console.warn('There were no elements found in the DOM.', {selector: selector});
        return false;
      }
      elems = Array.prototype.slice.apply(elems);
      // cycle through elements
      elems.forEach(function (elem) {
        // grab the transform CSS and parse the matrix as JSON
        let elemTransform = window.getComputedStyle(elem)[transformProp];
        if (elemTransform !== 'none') {
          elemTransform = JSON.parse(elemTransform.replace(/^\w+\(/, '[').replace(/\)$/, ']'));
          elem.startX = elemTransform[4];
          elem.startY = elemTransform[5];
          elem.startZ = 0;
        } else {
          elem.startX = 0;
          elem.startY = 0;
          elem.startZ = 0;
        }

        // store values
        elem.scrollMotionOptions = {
          startX: elem.startX,
          startY: elem.startY,
          startZ: elem.startZ,
          speedX: parseFloat(elem.getAttribute('data-speed-x') || self.options.speedX),
          speedY: parseFloat(elem.getAttribute('data-speed-y') || self.options.speedY),
          observe: parseInt(elem.getAttribute('data-observe') || self.options.observe)
        };

        console.log({
          elem: elem,
          scrollMotionOptions: elem.scrollMotionOptions
        });

        // Cache initial values for refresh
        elem.initCache = {
          style: elem.style.cssText,
          options: elem.scrollMotionOptions
        };

        // store some new values on the elem that we will use when animating
        elem.initScrollPos = false;
        elem.inView = false;

        // If paused, unpause and set listener for window resizing events
        if (pause) {
          window.addEventListener('resize', init);
          pause = false;
        }
        // run the observer || update on the element
        if (elem.scrollMotionOptions.observe) {
          observeElem.observe(elem);
        } else {
          elem.inView = true;
          update();
        }
      });
    };

    // cycles through the elements and animates the ones that are in view
    function animateElems () {
      let keepRunning = false;
      let _animateElem = function (elem) {
        let opts = elem.scrollMotionOptions;
        let newYPos = opts.speedY ? ((window.scrollY - elem.initScrollPos) * opts.speedY) / 10 : 0;
        let newXPos = opts.speedX ? ((window.scrollY - elem.initScrollPos) * opts.speedX) / 10 : 0;

        let coordinates = {
          x: (opts.startX + newXPos) + 'px',
          y: (opts.startY + newYPos) + 'px',
          z: (opts.startZ + 'px')
        };

        // add/update the transform style with our new coordinate x,y values
        elem.style[transformProp] = 'translate3d(' + coordinates.x + ',' + coordinates.y + ', ' + coordinates.z + ')';
      };

      // check if any elems are in view
      elems.forEach(function (elem) {
        if (elem.scrollMotionOptions.observe && !elem.inView) return false;
        if (window.scrollY != scrollY) {
          _animateElem(elem);
        }
        keepRunning = true;
      });
      scrollY = window.scrollY;

      return keepRunning;
    }

    // starts and stops our update loop
    let update = function () {
      let keepRunning = animateElems();
      if (!keepRunning || pause) return false;
      loop(update);
    };

    self.destroy = function () {
      elems.forEach(function (elem) {
        elem.style.cssText = elem.initCache.style;
        if (elem.scrollMotionOptions.observe) observeElem.unobserve(elem);
      });// Remove resize event listener if not pause, and pause
      if (!pause) {
        window.removeEventListener('resize', init);
        pause = true;
      }
    };

    init();
    self.refresh = init;

    return self;
  };
  return ScrollMotion;
}));
