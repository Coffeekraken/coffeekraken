"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whenInViewport = _interopRequireDefault(require("./whenInViewport"));

var _whenOutOfViewport = _interopRequireDefault(require("./whenOutOfViewport"));

var _isInViewport = _interopRequireDefault(require("./isInViewport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		InViewportStatusChangeDetector
 * This class allows you to monitor an HTMLElement and be notified when it enters or exit the viewport.
 *
 * @example 	js
 * const detector = new InViewportStatusChangeDetector(myCoolHTMLElement);
 * detector.on('enter', (elm) => {
 * 		// the element has entered the viewport
 * });
 * detector.on('exit', (elm) => {
 * 		// the element has exit the viewport
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class InViewportStatusChangeDetector {
  /**
   * The element to track
   * @type 	{HTMLElement}
   */

  /**
   * The callback stack
   * @type 	{Object}
   */

  /**
   * Track if the element is in viewport
   * @type 	{Boolean}
   */

  /**
   * Track is the tracker is destroyed
   * @type 	{Boolean}
   */

  /**
   * @constructor
   * @param 		{HTMLElement} 		elm 		The element to track
   */
  constructor(elm) {
    _defineProperty(this, "_elm", null);

    _defineProperty(this, "_cbStack", {
      enter: [],
      exit: []
    });

    _defineProperty(this, "_isInViewportCached", null);

    _defineProperty(this, "_destroyed", false);

    // save the element
    this._elm = elm; // if not in viewport at start

    if (!this._isInViewport()) {
      this._whenInViewport();
    } else {
      this._whenOutOfViewport();
    }
  }
  /**
   * Check if the element is in viewport
   * @return 		{Boolean}
   */


  _isInViewport() {
    // return if not null
    if (this._isInViewportCached !== null) return this._isInViewportCached; // check if is in viewport

    this._isInViewportCached = (0, _isInViewport.default)(this._elm, 50);
    setTimeout(() => {
      this._isInViewportCached = null;
    });
  }
  /**
   * Detect when the element is in viewport
   */


  _whenInViewport() {
    (0, _whenInViewport.default)(this._elm).then(() => {
      // stop if destroyed
      if (this._destroyed) return; // apply callback

      this._cbStack.enter.forEach(cb => {
        cb(this._elm);
      }); // listen when out of viewport


      this._whenOutOfViewport();
    });
  }
  /**
   * Detect when the element exit the viewport
   */


  _whenOutOfViewport() {
    (0, _whenOutOfViewport.default)(this._elm).then(() => {
      // stop if destroyed
      if (this._destroyed) return; // apply callback

      this._cbStack.exit.forEach(cb => {
        cb(this._elm);
      }); // listen when in viewport


      this._whenInViewport();
    });
  }
  /**
   * Add a callback
   * @param 		{String} 	status 					The status to track (enter|exit)
   * @param 		{Function} 	cb 						The callback to add
   * @return 		{InViewportStatusChangeDetector} 	The instance itself to maintain chainability
   */


  on(status, cb) {
    if (!this._cbStack[status]) throw "The status \"".concat(status, "\" that you want to track is not supported...");

    this._cbStack[status].push(cb);

    return this;
  }
  /**
   * Remove a callback
   * @param 	{String} 	status 					The status to remove (enter|exit)
   * @param 	{Function} 	cb 						The callback to remove
   * @return 	{InViewportStatusChangeDetector} 	The instance itself to maintain chainability
   */


  off(status, cb = null) {
    if (!cb) {
      this._cbStack[status] = [];
    } else {
      const idx = this._cbStack[status].indexOf(cb);

      if (idx !== -1) {
        this._cbStack[status].splice(idx, 1);
      }
    }

    return this;
  }
  /**
   * Destroy the tracker
   */


  destroy() {
    this._destroyed = true;
    this._cbStack = {
      enter: [],
      exit: []
    };
  }

}

exports.default = InViewportStatusChangeDetector;
module.exports = exports.default;