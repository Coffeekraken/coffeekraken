// @shared

import __SClass from '../../class/SClass';
import __deepMerge from '../../object/deepMerge';

import { ISCache } from '../SCache';
import { ISCacheSetSettings } from '../SCache';

/**
 * @name                                SCacheAdapter
 * @namespace           sugar.js.cache.cacheAdapters
 * @type                                Class
 * @extends             SClass
 * @status            beta
 * @abstract
 *
 * Base class for SCache adapters
 *
 * @todo        interface
 * @todo        doc
 *
 * @example             js
 * class SCacheCoolAdapter extends SCacheAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async set(name, value, settings = {}) {
 *      const objectToSave = this.processItem(name, value, settings);
 *      // make what you want with the objectToSave...
 *      return objectToSave; // return the objectToSave or false if something goes wrong
 *    }
 *    async get(name) {
 *      // make what you need to get back the cached item
 *      return objectOfCachedItem; // return the cached item in object format
 *    }
 *    async delete(name) {
 *      // make what you need to delete the cached item
 *      return true; // return true or false if something goes wrong
 *    }
 * }
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISCacheAdapter {
  id: string;
  cache: ISCache;
  get(name: string): Promise<any>;
  set(name: string, value: any, settings?: ISCacheSetSettings): Promise<any>;
  delete(name: string): Promise<any>;
  clear(): Promise<any>;
  keys(): Promise<string[]>;
  stringify?(value: any): string;
  parse?(value: string): any;
}

export default abstract class SCacheAdapter extends __SClass {
  /**
   * @name            cache
   * @type            ISCache
   *
   * Store the cache instance which is used
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // @ts-ignore
  cache: ISCache;

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
   *
   * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          cacheAdapter: {}
        },
        settings
      )
    );
  }

  /**
   * @name        get
   * @type        Function
   * @async
   * @abstract
   *
   * Get a cache item
   *
   * @param     {String}      name      The item name
   * @return    {Promise}               A promise resolved when the item has been correctly getted
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  abstract get(name: string): Promise<any>;

  /**
   * @name        set
   * @type        Function
   * @async
   * @abstract
   *
   * Set a cache item
   *
   * @param     {String}      name      The item name
   * @param     {Any}       value       The value to save
   * @param     {ISCacheSetSettings}    [settings={}]       Some settings associated with the saved item
   * @return    {Promise}               A promise resolved when the item has been correctly saved
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  abstract set(
    name: string,
    value: any,
    settings?: ISCacheSetSettings
  ): Promise<any>;

  /**
   * @name        delete
   * @type        Function
   * @async
   * @abstract
   *
   * Delete a cache item
   *
   * @param     {String}      name      The item name
   * @return    {Promise}               A promise resolved when the item has been correctly deleted
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  abstract delete(name: string): Promise<any>;

  /**
   * @name        clear
   * @type        Function
   * @async
   * @abstract
   *
   * Clear the entire cache
   *
   * @return    {Promise}               A promise resolved when the cache has been correctly cleared
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  abstract clear(): Promise<any>;

  /**
   * @name        keys
   * @type        Function
   * @async
   * @abstract
   *
   * Get all the cache items keys
   *
   * @return    {Promise<string[]>}               A promise resolved with all the cache items keys
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  abstract keys(): Promise<string[]>;
}
