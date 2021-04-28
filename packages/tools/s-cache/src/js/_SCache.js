"use strict";
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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/src/shared/crypt/md5"));
const class_1 = __importDefault(require("@coffeekraken/sugar/src/shared/is/class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/src/shared/object/deepMerge"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/src/shared/string/toString"));
const convert_1 = __importDefault(require("@coffeekraken/sugar/src/shared/time/convert"));
const SCacheLsAdapter_1 = __importDefault(require("../js/adapters/SCacheLsAdapter"));
const SCacheSettingsInterface_1 = __importDefault(require("./interface/SCacheSettingsInterface"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
class SCache extends s_class_1.default {
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
        super(deepMerge_1.default({
            cache: {}
        }, settings));
        if (node_1.default()) {
            this.constructor.registerAdapter(require('../node/adapters/SCacheFsAdapter').default);
        }
        else {
            this.constructor.registerAdapter(SCacheLsAdapter_1.default);
        }
        // make sure we have a name
        if (!id) {
            throw new Error(`The SCache instance need an id. To set it, pass the "id" as the first argument of the constructor...`);
        }
        // store the id
        if (!/^[a-zA-Z0-9-_\.]+$/.test(id)) {
            throw new Error(`The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed "<red>${name}</red>"...`);
        }
        this.id = id;
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
        console.log('register', adapter, this.registeredAdapters);
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
                name = md5_1.default.encrypt(toString_1.default(name));
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
                contextHash = md5_1.default.encrypt(set.context);
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
                name = md5_1.default.encrypt(toString_1.default(name)).toString();
            }
            let contextHash = null;
            if (set.context !== undefined) {
                contextHash = md5_1.default.encrypt(set.context);
            }
            // get the adapter
            const adapter = this.adapter;
            // try to get the value to update it
            const existingValue = yield this.get(name, Object.assign(Object.assign({}, set), { valueOnly: false }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIl9TQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsbUZBQTZEO0FBQzdELG9GQUFnRTtBQUNoRSxnR0FBMEU7QUFDMUUsOEZBQXdFO0FBQ3hFLDBGQUFvRTtBQUVwRSxxRkFBK0Q7QUFDL0Qsa0dBQTRFO0FBQzVFLDhFQUEwRDtBQWlEMUQsTUFBTSxNQUFPLFNBQVEsaUJBQVE7SUFpRTNCOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILFlBQVksRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFLEVBQUU7U0FDVixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixJQUFJLGNBQVEsRUFBRSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQzlCLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLE9BQU8sQ0FDcEQsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyx5QkFBaUIsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUNiLHNHQUFzRyxDQUN2RyxDQUFDO1NBQ0g7UUFDRCxlQUFlO1FBQ2YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNsQyxNQUFNLElBQUksS0FBSyxDQUNiLHNIQUFzSCxJQUFJLFlBQVksQ0FDdkksQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBbkZEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksYUFBYTtRQUNmLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxLQUFLLENBQUM7SUFDckMs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