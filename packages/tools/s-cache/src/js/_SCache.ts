import __SClass from '@coffeekraken/s-class';
import __md5 from '@coffeekraken/sugar/src/shared/crypt/md5';
import __isClass from '@coffeekraken/sugar/src/shared/is/class';
import __deepMerge from '@coffeekraken/sugar/src/shared/object/deepMerge';
import __toString from '@coffeekraken/sugar/src/shared/string/toString';
import __convert from '@coffeekraken/sugar/src/shared/time/convert';
import { ISCacheAdapter } from './adapters/SCacheAdapter';
import __SCacheLsAdapter from '../js/adapters/SCacheLsAdapter';
import __SCacheSettingsInterface from './interface/SCacheSettingsInterface';
import __isNode from '@coffeekraken/sugar/shared/is/node';

/**
 * @name                                SCache
 * @namespace           sugar.js.cache
 * @type                                Class
 * @extends             SClass
 * @status              beta
 *
 * Gives you the ability to manage cache through some defaults available adapters or using yours.
 * This cache class take care of these features:
 * - Standard and custom TTL by cache item
 * - Delete cache items on expires or not
 *
 * @todo        doc
 * @todo        interfaces
 * @todo        tests
 *
 * @example             js
 * import SCache from '@coffeekraken/sugar/js/cache/SCache';
 * const cache = new SCache({
 *  ttl: '10s' // 10 seconds
 * });
 * cache.set('myCoolCacheItem', someData);
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISCacheGetSettings {
  hash?: string;
  context?: any;
  valueOnly: boolean;
}
export interface ISCacheSetSettings {
  hash?: string;
  context?: any;
}

export interface ISCacheSettings {
  ttl: number;
  deleteOnExpire: boolean;
  adapter: string;
  parse: Function;
  stringify: Function;
}

export interface ISCache {}

class SCache extends __SClass implements ISCache {
  static interfaces = {
    settings: {
      apply: true,
      on: '_settings.cache',
      class: __SCacheSettingsInterface
    }
  };

  /**
   * @name        id
   * @type      String
   *
   * Store the cache if passed in constructor
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  id: string;

  /**
   * @name              registeredAdapters
   * @type              Record<string, ISCacheAdapter>
   * @static
   *
   * Store all the registered adapters
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registeredAdapters: Record<string, ISCacheAdapter> = {};

  /**
   * @name        cacheSettings
   * @type        ISCacheSettings
   * @get
   *
   * Access the cache settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get cacheSettings(): ISCacheSettings {
    return (<any>this._settings).cache;
  }

  /**
   * @name            registerAdapter
   * @type            Function
   * @static
   *
   * This static method allows you to register a new adapter
   * that you can use later
   *
   * @param       {ISCacheAdapter}      adapter       The adapter class
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerAdapter(adapter: ISCacheAdapter, id?: string): void {
    if (this.registeredAdapters[id || adapter.id]) return;
    console.log('register', adapter, this.registeredAdapters);
    this.registeredAdapters[id || adapter.id] = adapter;
  }

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SCache instance with the settings passed in object format. See description bellow.
   *
   * @param         {String}        id                  An id for your cache instance. Can have only these characters: [a-zA-Z0-9_-]
   * @param         {Object}          [settings={}]         The settings for the SCache instance
   * - ttl (-1) {Number|String}: Time to live for each cache items in seconds or in String like '10s', '20h', '300ms', etc...
   * - deleteOnExpire (true) {Boolean}: Specify if you want that the items are deleted on expire
   * - adapter (fs) {String|SCacheAdapter}: Specify the adapter to use as default one. Can be a simple string like "fs" (filesystem) or an instance of an SCacheAdapter class. Here's the available ones:
   *    - 'fs': File system that store the items in the "temp" folder of your system
   *    - SCacheFsAdapter: An instance of the SCacheFsAdapter class that you can configure as you want
   * - parse (JSON.parse) {Function}: Specify the function used to parse the items once theirs get back from theirs save place
   * - stringify (JSON.stringify) {Function}: Specify the function used to stringify the item object before saving it
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(id, settings = {}) {
    super(
      __deepMerge(
        {
          cache: {}
        },
        settings
      )
    );

    if (__isNode()) {
      this.constructor.registerAdapter(
        require('../node/adapters/SCacheFsAdapter').default
      );
    } else {
      this.constructor.registerAdapter(__SCacheLsAdapter);
    }

    // make sure we have a name
    if (!id) {
      throw new Error(
        `The SCache instance need an id. To set it, pass the "id" as the first argument of the constructor...`
      );
    }
    // store the id
    if (!/^[a-zA-Z0-9-_\.]+$/.test(id)) {
      throw new Error(
        `The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed "<red>${name}</red>"...`
      );
    }

    this.id = id;
  }

  /**
   * @name                            adapter
   * @type                            SCacheAdapter
   *
   * Access this cache instance adapter
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _adapter?: ISCacheAdapter;
  get adapter(): ISCacheAdapter {
    if (this._adapter) return this._adapter;
    const adptr = (<any>this.constructor).registeredAdapters[
      this.cacheSettings.adapter
    ];
    if (!adptr) {
      throw `Sorry but it seems that the requested SCache adapter "<yellow>${this.cacheSettings.adapter}</yellow>" does not exists...`;
    }
    if (__isClass(adptr)) {
      this._adapter = new adptr();
    } else if (adptr !== undefined) {
      this._adapter = adptr;
    }

    // set the cache property of the adapter if not set already
    this._adapter && this._adapter.setCache(this);
    // if (this._adapter && !this._adapter.cache) this._adapter.cache = this;

    return <ISCacheAdapter>this._adapter;
  }

  /**
   * @name                            get
   * @type                            Function
   * @async
   *
   * Get a value back from the cache using the specified adapter in the settings
   *
   * @param               {String|Array|Object}              name              The name of the item to get back from the cache. If not a string, will be hased using md5 encryption
   * @param               {Boolean}                   [settings={}]       Some settings to configure your process
   * @return              {Promise}                               A promise that will be resolved once the item has been getted
   *
   * @example             js
   * const myValue = myCache.get('coolValue');
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(name, settings?: Partial<ISCacheGetSettings>) {
    const set: ISCacheGetSettings = {
      valueOnly: true,
      ...(settings || {})
    };

    // check the name
    if (typeof name !== 'string') {
      name = __md5.encrypt(__toString(name));
    }
    // get the adapter
    const adapter = this.adapter;
    // using the specified adapter to get the value back
    const rawValue = await adapter.get(name);
    // check that we have a value back
    if (!rawValue || typeof rawValue !== 'string') return null;

    // parse the raw value back to an object
    const value = adapter.parse
      ? adapter.parse(rawValue)
      : this._parse(rawValue);

    // check the hash
    let contextHash: string | undefined = undefined;
    if (set.context !== undefined) contextHash = __md5.encrypt(set.context);

    if (
      contextHash &&
      value.contextHash !== undefined &&
      contextHash !== value.contextHash
    ) {
      await adapter.delete(name);
      return null;
    }

    // check if the item is too old...
    if (value.deleteAt !== -1 && value.deleteAt < new Date().getTime()) {
      // this item has to be deleted
      if (value.deleteOnExpire) await adapter.delete(name);
      // return null cause the item is too old
      return null;
    }

    // otherwise, this is good so return the item
    // either the value only, or the full cache object
    if (set.valueOnly) return value.value;
    return value;
  }

  /**
   * @name                            set
   * @type                            Function
   * @async
   *
   * Set a value to the cache system using the specified adapter with some settings like described bellow
   *
   * @param               {String|Array|Object}              name              The name of the item to get back from the cache. If not a string, will be hased using md5 encryption
   * @param               {Mixed}               value             The value to set.
   * @param               {Partial<ISCacheSetSettings>}              [settings={}]
   * The settings for this particular item:
   * - ttl (-1) {Number}: Time to live in seconds
   * - deleteOnExpire (true) {Boolean}: Specify if this item has to be deleted on expire on not
   * @return              {Promise}                               A promise that will be resolved once the item has been saved
   *
   * @example             js
   * const myValue = myCache.set('coolValue', { hello: 'world' }, {
   *    ttl: 1000
   * });
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async set(name, value, settings?: Partial<ISCacheSetSettings>) {
    const set: ISCacheSetSettings = {
      ...(settings || {})
    };

    // check the name
    if (typeof name !== 'string') {
      name = __md5.encrypt(__toString(name)).toString();
    }

    let contextHash = null;
    if (set.context !== undefined) {
      contextHash = __md5.encrypt(set.context);
    }

    // get the adapter
    const adapter = this.adapter;

    // try to get the value to update it
    const existingValue = await this.get(name, {
      ...set,
      valueOnly: false
    });

    // merge the default and the item settings
    const finalSettings: any = __deepMerge(
      {
        ttl: this.cacheSettings.ttl,
        deleteOnExpire: this.cacheSettings.deleteOnExpire
      },
      set
    );

    // initial the object that will be saved in the cache
    const deleteAt =
      finalSettings.ttl === -1
        ? -1
        : new Date().getTime() +
          __convert(
            typeof finalSettings.ttl === 'number'
              ? `${finalSettings.ttl}s`
              : finalSettings.ttl,
            'ms'
          );

    const valueToSave = {
      name,
      value,
      contextHash,
      created: existingValue ? existingValue.created : new Date().getTime(),
      updated: new Date().getTime(),
      deleteAt,
      settings: finalSettings
    };

    // stringify the value to save
    const stringifiedValueToSave = adapter.stringify
      ? adapter.stringify(valueToSave)
      : this._stringify(valueToSave);

    // use the adapter to save the value
    return adapter.set(name, stringifiedValueToSave);
  }

  /**
   * @name                                exists
   * @type                                Function
   * @async
   *
   * Check if the passed cache item id exists
   *
   * @param                 {String}               name               The name of the item to check
   * @return                {Boolean}                             true if exists, false if not
   *
   * @example           js
   * await myCache.exists('coco'); // => true
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async exists(name) {
    // check
    const value = await this.get(name);
    // return the status
    if (value) return true;
    return false;
  }

  /**
   * @name                                delete
   * @type                                Function
   *
   * Delete an item in the cache by his name
   *
   * @param                 {String}               name               The name of the item to delete
   * @return                {Promise}                                  A promise that will return true if correctly deleted, false if not
   *
   * @example           js
   * await myCache.delete('coco');
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async delete(name) {
    // get the adapter
    const adapter = this.adapter;
    // delete the item
    return adapter.delete(name);
  }

  /**
   * @name                                clear
   * @type                                Function
   *
   * Delete all the items in the current cache instance
   *
   * @return                {Promise}                                  A promise that will return true if correctly deleted, false if not
   *
   * @example           js
   * await myCache.clear();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async clear() {
    // get the adapter
    const adapter = this.adapter;
    // clear the cache
    return adapter.clear();
  }

  /**
   * @name                                _parse
   * @type                                Function
   * @private
   *
   * Take the raw value getted from the cache system and parse it to his actual object format
   * You can hook how this method will act by specify the "settings.parse" property to a different function
   *
   * @param               {String}                      rawValue                    The raw value to transform into an object
   * @return              {Object}                                                  The object format of the value getted back from the cache system
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _parse(rawValue) {
    return this.cacheSettings.parse(rawValue);
  }

  /**
   * @name                                _stringify
   * @type                                Function
   * @private
   *
   * Transform the passed object to a simple string in order to save it in the cache system using the specified adapter.
   * You can hook how this method will act by specify the "settings.stringify" property to a different function
   *
   * @param               {Object}                      object                       The object to save to the cache system that have to transformed in string before...
   * @return              {String}                                                  The string format of the item to save to cache
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _stringify(object) {
    return this.cacheSettings.stringify(object);
  }
}

export default SCache;
