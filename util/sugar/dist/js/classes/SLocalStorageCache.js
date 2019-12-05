"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SCache = _interopRequireDefault(require("./SCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 	SLocalStorageCache
 * @extends 	SCache
 * Create a simple localStorage cache
 * @example 	js
 * import SLocalStorageCache from '@coffeekraken/sugar/js/classes/SLocalStorageCache'
 * const myCache = new SLocalStorageCache('my-cache', {
 * 	lifetime: 3600
 * });
 * // set an item into the cache
 * myCache.set('my-cool-item', 'something');
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SLocalStorageCache extends _SCache.default {
  /**
   * Create a new local storage cache
   *
   * @constructor
   * @param 	{String} 	name 			The cache name
   * @param  	{Object} 	[settings={}]	The cache settings passed to the SCache class
   */
  constructor(name, settings = {}) {
    super(name, settings); // grab the cache

    const ls = localStorage.getItem(this.name);
    if (!ls) return;
    this.cache = JSON.parse(ls);
  }
  /**
   * Save the cache
   */


  _save() {
    localStorage.setItem(this.name, JSON.stringify(this.cache));
  }

}

exports.default = SLocalStorageCache;
module.exports = exports.default;