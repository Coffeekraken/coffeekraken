"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SClass_1 = __importDefault(require("../class/SClass"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const convert_1 = __importDefault(require("../time/convert"));
const md5_1 = __importDefault(require("../crypt/md5"));
const toString_1 = __importDefault(require("../string/toString"));
const SCacheSettingsInterface_1 = __importDefault(require("./interface/SCacheSettingsInterface"));
const class_1 = __importDefault(require("../is/class"));
class SCache extends SClass_1.default {
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
        super(deepMerge_1.default({
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
        if (class_1.default(adptr)) {
            this._adapter = new adptr();
        }
        else if (adptr !== undefined) {
            this._adapter = adptr;
        }
        // set the cache property of the adapter if not set already
        if (this._adapter && !this._adapter.cache)
            this._adapter.cache = this;
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
                name = md5_1.default(toString_1.default(name)).toString();
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
            if (set.hash && value.hash && set.hash !== value.hash) {
                return null;
            }
            // check context hash
            if (set.context && value.contextHash) {
                const contextHash = md5_1.default.encrypt(toString_1.default(set.context));
                if (contextHash !== value.contextHash)
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
                name = md5_1.default(toString_1.default(name)).toString();
            }
            // generate a hash
            let hash = null;
            let settingsHash = set.hash
                ? !Array.isArray(set.hash)
                    ? [set.hash]
                    : set.hash
                : [];
            hash = md5_1.default.encrypt(name + `${settingsHash.join('.')}`);
            let contextHash = null;
            if (set.context !== undefined) {
                contextHash = md5_1.default.encrypt(toString_1.default(set.context));
            }
            // get the adapter
            const adapter = this.adapter;
            // try to get the value to update it
            const existingValue = yield this.get(name, {
                valueOnly: false
            });
            // merge the default and the item settings
            const finalSettings = deepMerge_1.default({
                ttl: this.cacheSettings.ttl,
                deleteOnExpire: this.cacheSettings.deleteOnExpire
            }, set);
            // initial the object that will be saved in the cache
            const deleteAt = finalSettings.ttl === -1
                ? -1
                : new Date().getTime() +
                    convert_1.default(typeof finalSettings.ttl === 'number'
                        ? `${finalSettings.ttl}s`
                        : finalSettings.ttl, 'ms');
            const valueToSave = {
                name,
                value,
                hash,
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
        class: SCacheSettingsInterface_1.default
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
exports.default = SCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIl9TQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0FBR1YsNkRBQXVDO0FBQ3ZDLG9FQUE4QztBQUU5Qyw4REFBd0M7QUFFeEMsdURBQWlDO0FBQ2pDLGtFQUE0QztBQUM1QyxrR0FBNEU7QUFDNUUsd0RBQW9DO0FBbURwQyxNQUFNLE1BQU8sU0FBUSxnQkFBUTtJQW9EM0I7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsWUFBWSxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0IsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUUsRUFBRTtTQUNWLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FDYixzR0FBc0csQ0FDdkcsQ0FBQztTQUNIO1FBQ0QsZUFBZTtRQUNmLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDYixzSEFBc0gsSUFBSSxZQUFZLENBQ3ZJLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBekVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksYUFBYTtRQUNmLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBdUIsRUFBRSxFQUFXO1FBQ3pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUN0RCxDQUFDO0lBdURELElBQUksT0FBTztRQUNULElBQUks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