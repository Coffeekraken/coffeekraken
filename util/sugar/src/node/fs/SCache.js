const __deepMerge = require('../object/deepMerge');

/**
 * @name                                SCache
 * @namespace                           sugar.node.fs
 * @type                                Class
 * 
 * Gives you the ability to manage cache through some defaults available adapters or using yours.
 * This cache class take care of these features:
 * - Standard and custom TTL by cache item
 * - Delete cache items on expires or not
 * - Maximum items in the cache instance or unlimited one
 * - Default adapter used for the cache instance or custom one by items
 * 
 * @example             js
 * const SCache = require('@coffeekraken/sugar/node/fs/SCache');
 * const cache = new SCache({
 *  ttl: 10 // 10 seconds
 * });
 * cache.set('myCoolCacheItem', someData);
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCache {

  /**
   * @name                              _settings
   * @type                              Object
   * @private
   * 
   * Store the default settings of the SCache instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Construct the SCache instance with the settings passed in object format. See description bellow.
   * 
   * @param         {Object}          [settings={}]             
   * The settings for the SCache instance
   * - ttl (0) {Number}: Time to live for each cache items in seconds
   * - deleteOnExpire (true) {Boolean}: Specify if you want that the items are deleted on expire
   * - maxItems (0) {Number}: Specify how many items you want in this cache as maximum. 0 mean unlimited
   * - adapter (fs) {String|SCacheAdapter}: Specify the adapter to use as default one. Can be a simple string like "fs" (filesystem) or an instance of an SCacheAdapter class. Here's the available ones:
   *    - 'fs': File system that store the items in the "temp" folder of your system
   *    - SCacheFsAdapter: An instance of the SCacheFsAdapter class that you can configure as you want
   * - parse (JSON.parse) {Function}: Specify the function used to parse the items once theirs get back from theirs save place
   * - stringify (JSON.stringify) {Function}: Specify the function used to stringify the item object before saving it
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    this._settings = __deepMerge({
      ttl: 0,
      deleteOnExpire: true,
      maxItems: 0,
      adapter: require('./cacheAdapters/SCacheFsAdapter')(),
      parse: JSON.parse,
      stringify: JSON.stringify
    }, settings);
  }

}