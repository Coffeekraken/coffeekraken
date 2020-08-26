import __deepMerge from '../object/deepMerge';
import __convert from '../time/convert';
import __isNode from '../is/node';
import __SCache from './SCache';
import __md5 from '../crypt/md5';
import __toString from '../string/toString';

/**
 * @name                                SHashCache
 * @namespace           js.cache
 * @type                                Class
 * @extends           SCache
 *
 * Gives you the ability to manage cache through some defaults available adapters or using yours.
 * This cache class take care of these features:
 * - Standard and custom TTL by cache item
 * - Delete cache items on expires or not
 *
 * @example             js
 * import SHashCache from '@coffeekraken/sugar/js/cache/SHashCache';
 * const cache = new SHashCache({
 *  ttl: '10s' // 10 seconds
 * });
 * cache.set('myCoolCacheItem', someData);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SHashCache extends __SCache {
  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SHashCache instance with the settings passed in object format. See description bellow.
   *
   * @param         {String}        name                  A name for your cache instance. Can have only these characters: [a-zA-Z0-9_-]
   * @param         {Object}          [settings={}]               The settings for the SCache instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, settings = {}) {
    super(name, __deepMerge({}, settings));
  }

  /**
   * @name              set
   * @type              Function
   * @async
   * @override
   *
   * Set an item into the cache by passing an object as reference as well as a value to store
   *
   * @param             {Object}          referenceObj        The object that will serve as base for calculating the hash used as name
   * @param             {Mixed}            value              The value to save in cache
   * @param             {Object}            [settings={}]       A settings object that support all the properties of the SCache.set method
   * @return            {Promise}                             A promise that will be resolved once the value has been cached
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async set(referenceObj, value, settings = {}) {
    // calculating the checksum
    const checksum = __md5(__toString(referenceObj)).toString();
    console.log('SAVE', checksum);
    // save the value in the cache
    return super.set(checksum, value, settings);
  }

  /**
   * @name            get
   * @type            Function
   * @async
   * @override
   *
   * Get an item by passing a referenceObj that will be transformed into a checksum used as cache id.
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(referenceObj, valueOnly = true) {
    // calculating the checksum
    const checksum = __md5(__toString(referenceObj)).toString();
    // return the value getted from the cache
    return super.get(checksum, valueOnly);
  }
}
