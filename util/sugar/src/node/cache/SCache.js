/**
 * @src                                 ../../js/cache/SCache.js
 * @name                                SCache
 * @namespace                           sugar.node.cache
 * @type                                Class
 * 
 * Gives you the ability to manage cache through some defaults available adapters or using yours.
 * This cache class take care of these features:
 * - Standard and custom TTL by cache item
 * - Delete cache items on expires or not
 * 
 * @example             js
 * const SCache = require('@coffeekraken/sugar/node/cache/SCache');
 * const cache = new SCache({
 *  ttl: '10s' // 10 seconds
 * });
 * cache.set('myCoolCacheItem', someData);
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = require('../../../js/cache/SCache');
