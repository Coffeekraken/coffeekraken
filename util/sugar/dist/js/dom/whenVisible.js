"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenVisible;

var _isVisible = _interopRequireDefault(require("./isVisible"));

var _closestNotVisible = _interopRequireDefault(require("./closestNotVisible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenVisible
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
 * @return 		(Promise) 								The promise that will be resolved when the element is visible
 *
 * @example 	js
 * import whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
 * whenVisible(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenVisible(elm, cb = null) {
  return new Promise((resolve, reject) => {
    // variables
    let isSelfVisible = false,
        areParentsVisible = false,
        closestNotVisible = null,
        selfObserver = null,
        parentObserver = null;

    const _cb = () => {
      if (isSelfVisible && areParentsVisible) {
        // process callbacks
        if (cb) cb(elm);
        resolve(elm); // remove the event listeners

        elm.removeEventListener("transitionend", _eventCb);
        elm.removeEventListener("animationstart", _eventCb);
        elm.removeEventListener("animationend", _eventCb); // remove the event listeners

        if (closestNotVisible) {
          closestNotVisible.removeEventListener("transitionend", _eventCb);
          closestNotVisible.removeEventListener("animationstart", _eventCb);
          closestNotVisible.removeEventListener("animationend", _eventCb);
        }
      }
    }; // function called on each transitionend, start, etc...


    const _eventCb = e => {
      // wait just a little time to check again
      setTimeout(() => {
        if (e.target === elm) {
          if ((0, _isVisible.default)(elm)) {
            isSelfVisible = true;

            if (selfObserver && selfObserver.disconnect) {
              selfObserver.disconnect();
            } // remove the event listeners


            elm.removeEventListener("transitionend", _eventCb);
            elm.removeEventListener("animationstart", _eventCb);
            elm.removeEventListener("animationend", _eventCb);
          }
        } else if (e.target === closestNotVisible) {
          if ((0, _isVisible.default)(closestNotVisible)) {
            areParentsVisible = true;

            if (parentObserver && parentObserver.disconnect) {
              parentObserver.disconnect();
            } // remove the event listeners


            closestNotVisible.removeEventListener("transitionend", _eventCb);
            closestNotVisible.removeEventListener("animationstart", _eventCb);
            closestNotVisible.removeEventListener("animationend", _eventCb);
          }
        } // callback


        _cb();
      });
    }; // check if element itself is not visible


    if (!(0, _isVisible.default)(elm)) {
      selfObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // check that is the style whos changed
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            // check if is visible
            if ((0, _isVisible.default)(mutation.target)) {
              // update
              isSelfVisible = true; // callback

              _cb(); // stop observe


              selfObserver.disconnect();
            }
          }
        });
      });
      selfObserver.observe(elm, {
        attributes: true
      }); // listen for animationstart to check if the element is visible

      elm.addEventListener("animationstart", _eventCb);
      elm.addEventListener("animationend", _eventCb);
      elm.addEventListener("transitionend", _eventCb);
    } else {
      isSelfVisible = true;
    } // get the closest not visible element
    // if found, we monitor it to check when it is visible


    closestNotVisible = (0, _closestNotVisible.default)(elm);

    if (closestNotVisible) {
      parentObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // check that is the style whos changed
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            // check if is visible
            if ((0, _isVisible.default)(mutation.target)) {
              // update
              areParentsVisible = true; // callback

              _cb(); // stop observe


              parentObserver.disconnect();
            }
          }
        });
      });
      parentObserver.observe(closestNotVisible, {
        attributes: true
      }); // listen for animationstart to check if the element is visible

      closestNotVisible.addEventListener("animationstart", _eventCb);
      closestNotVisible.addEventListener("animationend", _eventCb);
      closestNotVisible.addEventListener("transitionend", _eventCb);
    } else {
      areParentsVisible = true;
    } // callback


    _cb();
  });
}

module.exports = exports.default;