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
            // nativeConsole.trace('SETTINGS', set);
            // console.log('ghet hash', __toString(set.context));
            if (set.context && value.contextHash) {
                const contextHash = md5_1.default.encrypt(set.context);
                // console.log('SSSSSS', contextHash);
                if (contextHash !== value.contextHash)
                    return null;
            }
            else if (set.context)
                return null;
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
                contextHash = md5_1.default.encrypt(set.context);
            }
            // console.log('set hash', contextHash);
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