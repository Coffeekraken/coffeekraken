var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __md5 from '@coffeekraken/sugar/src/shared/crypt/md5';
import __isClass from '@coffeekraken/sugar/src/shared/is/class';
import __deepMerge from '@coffeekraken/sugar/src/shared/object/deepMerge';
import __toString from '@coffeekraken/sugar/src/shared/string/toString';
import __convert from '@coffeekraken/sugar/src/shared/time/convert';
import __SCacheLsAdapter from '../js/adapters/SCacheLsAdapter';
import __SCacheSettingsInterface from './interface/SCacheSettingsInterface';
import __isNode from '@coffeekraken/sugar/shared/is/node';
class SCache extends __SClass {
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
        super(__deepMerge({
            cache: {
                clearOnExit: false
            }
        }, settings));
        this.id = id;
        if (__isNode()) {
            // @ts-ignore
            this.constructor.registerAdapter(require('../node/adapters/SCacheFsAdapter').default);
            // check if we need to clear the cache on exit
            if (this.cacheSettings.clearOnExit) {
                const __onProcessExit = require('@coffeekraken/sugar/node/process/onProcessExit')
                    .default;
                const __parseHtml = require('@coffeekraken/sugar/node/terminal/parseHtml')
                    .default;
                __onProcessExit(() => __awaiter(this, void 0, void 0, function* () {
                    console.log(__parseHtml(`<yellow>[${this.constructor.name}.${this.id}]</yellow> Clearing the cache`));
                    yield this.clear();
                }));
            }
        }
        else {
            // @ts-ignore
            this.constructor.registerAdapter(__SCacheLsAdapter);
        }
        // make sure we have a name
        if (!id) {
            throw new Error(`The SCache instance need an id. To set it, pass the "id" as the first argument of the constructor...`);
        }
        // store the id
        if (!/^[a-zA-Z0-9-_\.]+$/.test(id)) {
            throw new Error(`The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed "<red>${name}</red>"...`);
        }
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
     * @param       {ISCacheAdapter}      adapter       The adapter class
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerAdapter(adapter, id) {
        if (this.registeredAdapters[id || adapter.id])
            return;
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
        this._adapter && this._adapter.setCache(this);
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
    set(name, value, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = Object.assign({}, (settings || {}));
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
     * @param                 {String}               name               The name of the item to check
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
     * @param                 {String}               name               The name of the item to delete
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIl9TQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxLQUFLLE1BQU0sMENBQTBDLENBQUM7QUFDN0QsT0FBTyxTQUFTLE1BQU0seUNBQXlDLENBQUM7QUFDaEUsT0FBTyxXQUFXLE1BQU0saURBQWlELENBQUM7QUFDMUUsT0FBTyxVQUFVLE1BQU0sZ0RBQWdELENBQUM7QUFDeEUsT0FBTyxTQUFTLE1BQU0sNkNBQTZDLENBQUM7QUFFcEUsT0FBTyxpQkFBaUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBa0QxRCxNQUFNLE1BQU8sU0FBUSxRQUFRO0lBZ0UzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxZQUFZLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMzQixLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxLQUFLO2FBQ25CO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLFFBQVEsRUFBRSxFQUFFO1lBQ2QsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUM5QixPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxPQUFPLENBQ3BELENBQUM7WUFFRiw4Q0FBOEM7WUFDOUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtnQkFDbEMsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGdEQUFnRCxDQUFDO3FCQUM5RSxPQUFPLENBQUM7Z0JBQ1gsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDZDQUE2QyxDQUFD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