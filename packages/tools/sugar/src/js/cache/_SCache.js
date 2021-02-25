// @shared
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '../class/SClass';
import __deepMerge from '../object/deepMerge';
import __convert from '../time/convert';
import __md5 from '../crypt/md5';
import __toString from '../string/toString';
import __SCacheSettingsInterface from './interface/SCacheSettingsInterface';
import __isClass from '../is/class';
class SCache extends __SClass {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SCache instance with the settings passed in object format. See description bellow.
     *
     * @param         {String}        id                  An id for your cache instance. Can have only these characters: [a-zA-Z0-9_-]
     * @param         {Object}          [settings={}]         The settings for the SCache instance
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
        super(__deepMerge({
            cache: {}
        }, settings));
        // make sure we have a name
        if (!id) {
            throw new Error(`The SCache instance need an id. To set it, pass the "id" as the first argument of the constructor...`);
        }
        // store the id
        if (!/^[a-zA-Z0-9-_\.]+$/.test(id)) {
            throw new Error(`The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed "<red>${name}</red>"...`);
        }
        this._settings.id = id;
    }
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
    get cacheSettings() {
        return this._settings.cache;
    }
    /**
     * @name            registerAdapter
     * @type            Function
     * @static
     *
     * This static method allows you to register a new adapter
     * that you can use later
     *
     * @param       {ISCacheAdapter}      adapter       The adapter class
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerAdapter(adapter, id) {
        this.registeredAdapters[id || adapter.id] = adapter;
    }
    get adapter() {
        if (this._adapter)
            return this._adapter;
        const adptr = this.constructor.registeredAdapters[this.cacheSettings.adapter];
        if (!adptr) {
            throw `Sorry but it seems that the requested SCache adapter "<yellow>${this.cacheSettings.adapter}</yellow>" does not exists...`;
        }
        if (__isClass(adptr)) {
            this._adapter = new adptr();
        }
        else if (adptr !== undefined) {
            this._adapter = adptr;
        }
        // set the cache property of the adapter if not set already
        this._adapter &&
            this._adapter.setCache({
                id: this.id,
                settings: Object.assign({}, this.cacheSettings)
            });
        // if (this._adapter && !this._adapter.cache) this._adapter.cache = this;
        return this._adapter;
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
    get(name, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = Object.assign({ valueOnly: true }, (settings || {}));
            // check the name
            if (typeof name !== 'string') {
                name = __md5.encrypt(__toString(name));
            }
            // get the adapter
            const adapter = this.adapter;
            // using the specified adapter to get the value back
            const rawValue = yield adapter.get(name);
            // check that we have a value back
            if (!rawValue || typeof rawValue !== 'string')
                return null;
            // parse the raw value back to an object
            const value = adapter.parse
                ? adapter.parse(rawValue)
                : this._parse(rawValue);
            // check the hash
            let contextHash = undefined;
            if (set.context !== undefined)
                contextHash = __md5.encrypt(set.context);
            if (contextHash &&
                value.contextHash !== undefined &&
                contextHash !== value.contextHash) {
                yield adapter.delete(name);
                return null;
            }
            // check if the item is too old...
            if (value.deleteAt !== -1 && value.deleteAt < new Date().getTime()) {
                // this item has to be deleted
                if (value.deleteOnExpire)
                    yield adapter.delete(name);
                // return null cause the item is too old
                return null;
            }
            // otherwise, this is good so return the item
            // either the value only, or the full cache object
            if (set.valueOnly)
                return value.value;
            return value;
        });
    }
    /**
     * @name                            set
     * @type                            Function
     * @async
     *
     * Set a value to the cache system using the specified adapter with some settings like described bellow
     *
     * @param               {String|Array|Object}              name              The name of the item to get back from the cache. If not a string, will be hased using md5 encryption
     * @param               {Mixed}               value             The value to set.
     * @param               {Partial<ISCacheSetSettings>}              [settings={}]
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
    set(name, value, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = Object.assign({}, (settings || {}));
            // check the name
            if (typeof name !== 'string') {
                name = __md5(__toString(name)).toString();
            }
            let contextHash = null;
            if (set.context !== undefined) {
                contextHash = __md5.encrypt(set.context);
            }
            // get the adapter
            const adapter = this.adapter;
            // try to get the value to update it
            const existingValue = yield this.get(name, Object.assign(Object.assign({}, set), { valueOnly: false }));
            // merge the default and the item settings
            const finalSettings = __deepMerge({
                ttl: this.cacheSettings.ttl,
                deleteOnExpire: this.cacheSettings.deleteOnExpire
            }, set);
            // initial the object that will be saved in the cache
            const deleteAt = finalSettings.ttl === -1
                ? -1
                : new Date().getTime() +
                    __convert(typeof finalSettings.ttl === 'number'
                        ? `${finalSettings.ttl}s`
                        : finalSettings.ttl, 'ms');
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
        });
    }
    /**
     * @name                                exists
     * @type                                Function
     * @async
     *
     * Check if the passed cache item id exists
     *
     * @param                 {String}               name               The name of the item to check
     * @return                {Boolean}                             true if exists, false if not
     *
     * @example           js
     * await myCache.exists('coco'); // => true
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // check
            const value = yield this.get(name);
            // return the status
            if (value)
                return true;
            return false;
        });
    }
    /**
     * @name                                delete
     * @type                                Function
     *
     * Delete an item in the cache by his name
     *
     * @param                 {String}               name               The name of the item to delete
     * @return                {Promise}                                  A promise that will return true if correctly deleted, false if not
     *
     * @example           js
     * await myCache.delete('coco');
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the adapter
            const adapter = this.adapter;
            // delete the item
            return adapter.delete(name);
        });
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
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            // get the adapter
            const adapter = this.adapter;
            // clear the cache
            return adapter.clear();
        });
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
     * @return              {Object}                                                  The object format of the value getted back from the cache system
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
     * @return              {String}                                                  The string format of the item to save to cache
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _stringify(object) {
        return this.cacheSettings.stringify(object);
    }
}
SCache.interfaces = {
    settings: {
        apply: true,
        on: '_settings.cache',
        class: __SCacheSettingsInterface
    }
};
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
SCache.registeredAdapters = {};
export default SCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIl9TQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7OztBQUdWLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBRXhDLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sU0FBUyxNQUFNLGFBQWEsQ0FBQztBQW1EcEMsTUFBTSxNQUFPLFNBQVEsUUFBUTtJQW9EM0I7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsWUFBWSxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0IsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRSxFQUFFO1NBQ1YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUNiLHNHQUFzRyxDQUN2RyxDQUFDO1NBQ0g7UUFDRCxlQUFlO1FBQ2YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNsQyxNQUFNLElBQUksS0FBSyxDQUNiLHNIQUFzSCxJQUFJLFlBQVksQ0FDdkksQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUF6RUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxhQUFhO1FBQ2YsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGVBQWUs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