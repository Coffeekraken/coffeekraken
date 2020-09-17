import __deepMerge from '../../object/deepMerge';
import __SCacheAdapter from './SCacheAdapter';

/**
 * @name                                SCacheFsAdapter
 * @namespace           sugar.js.cache.adapters
 * @type                                Class
 *
 * A filesystem SCache adapter that allows you to store your cache items on the user system
 *
 * @example             js
 * const cache = new SCache({
 *    ttl: 100,
 *    adapter: new SCacheLsAdapter({
 *    })
 * });
 *
 * @since     2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SCacheLsAdapter extends __SCacheAdapter {
  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SCacheFsAdapter instance with the settings passed in object format. See description bellow.
   *
   * @param         {Object}          [settings={}]             An object to configure the SCacheFsAdapter instance. This is specific to each adapters.settings.settings...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(__deepMerge({}, settings));
  }

  /**
   * @name                          set
   * @type                          Function
   *
   * Set a cache item in the localstorage
   *
   * @param             {String}              name              The item name
   * @param             {Mixed}               value             The value to save
   * @param             {Object}              [settings={}]     A settings object to override the default ones defined on the SCache instance
   * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
   *
   * @example           js
   * await myCache.set('myCoolItem', { hello: 'world' }, {
   *    ttl: 40000
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async set(name, value) {
    // store data into localStorage
    window.localStorage.setItem(`${this._settings.name}.${name}`, value);
    // write has been done correctly
    return true;
  }

  /**
   * @name                          get
   * @type                          Function
   *
   * Get a cache item in the localstorage
   *
   * @param             {String}              name              The item name
   * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
   *
   * @example           js
   * await myCache.get('myCoolItem');
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(name) {
    return window.localStorage.getItem(`${this._settings.name}.${name}`);
  }

  /**
   * @name                          delete
   * @type                          Function
   *
   * Delete a cache item on the filesystem
   *
   * @param             {String}              name              The item name
   * @return            {Boolean}                               true if all of, false if not...
   *
   * @example           js
   * await myCache.delete('myCoolItem');
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async delete(name) {
    // delete the item from the localStorage
    window.localStorage.removeItem(`${this._settings.name}.${name}`);

    // return true cause all went well
    return true;
  }

  /**
   * @name                          clear
   * @type                          Function
   *
   * Clear all the items in the current cache
   *
   * @param             {String}              cacheName              The current cache name to delete
   * @return            {Boolean}                               true if all of, false if not...
   *
   * @example           js
   * await myCache.clear;
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async clear(cacheName) {
    // get all the localStorage keys to filter them
    const keys = Object.keys(window.localStorage);

    // filter the keys to delete
    const keysToDelete = keys.filter((key) => {
      return key.startsWith(`${cacheName}.`);
    });

    // loop on each keys to delete
    keysToDelete.forEach((k) => {
      window.localStorage.removeItem(k);
    });

    // return true cause all went well
    return true;
  }

  /**
   * @name                      keys
   * @type                      Function
   * @async
   *
   * Return an array of all the items keys saved in this cache instance
   *
   * @param             {String}              cacheName              The current cache name to get keys from
   * @return        {Promise}                     A promise resolved with the array of keys
   *
   * @example         js
   * const keys = await myCache.keys(); // => ['item1','item2']
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async keys(cacheName) {
    // get all the localStorage keys to filter them
    const keys = Object.keys(window.localStorage);

    // filter the keys to get only the ones that bellongs to this cache instance
    const cacheKeys = keys.filter((key) => {
      return key.startsWith(`${cacheName}.`);
    });

    // return the cache keys
    return cacheKeys;
  }
}
