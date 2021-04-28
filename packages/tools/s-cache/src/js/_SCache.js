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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-class", "@coffeekraken/sugar/src/shared/crypt/md5", "@coffeekraken/sugar/src/shared/is/class", "@coffeekraken/sugar/src/shared/object/deepMerge", "@coffeekraken/sugar/src/shared/string/toString", "@coffeekraken/sugar/src/shared/time/convert", "./interface/SCacheSettingsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const md5_1 = __importDefault(require("@coffeekraken/sugar/src/shared/crypt/md5"));
    const class_1 = __importDefault(require("@coffeekraken/sugar/src/shared/is/class"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/src/shared/object/deepMerge"));
    const toString_1 = __importDefault(require("@coffeekraken/sugar/src/shared/string/toString"));
    const convert_1 = __importDefault(require("@coffeekraken/sugar/src/shared/time/convert"));
    const SCacheSettingsInterface_1 = __importDefault(require("./interface/SCacheSettingsInterface"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3MtY2FjaGUvc3JjL2pzL19TQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxvRUFBNkM7SUFDN0MsbUZBQTZEO0lBQzdELG9GQUFnRTtJQUNoRSxnR0FBMEU7SUFDMUUsOEZBQXdFO0lBQ3hFLDBGQUFvRTtJQUVwRSxrR0FBNEU7SUFpRDVFLE1BQU0sTUFBTyxTQUFRLGlCQUFRO1FBK0QzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxZQUFZLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUMzQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxLQUFLLEVBQUUsRUFBRTthQUNWLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztZQUVGLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0dBQXNHLENBQ3ZHLENBQUM7YUFDSDtZQUNELGVBQWU7WUFDZixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUNiLHNIQUFzSCxJQUFJLFlBQVksQ0FDdkksQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDZixDQUFDO1FBekVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksYUFBYTtZQUNmLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxLQUFLLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBdUIsRUFBRSxFQUFXO1lBQ3pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUN0RCxDQUFDO1FBdURELElBQUksT0FBTztZQUNULElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3hDLE1BQU0sS0FBSyxHQUFTLElBQUksQ0FBQyxXQUFZLENBQUMsa0JBQWtCLENBQ3RELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUMzQixDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixNQUFNLGlFQUFpRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sK0JBQStCLENBQUM7YUFDbEk7WUFDRCxJQUFJLGVBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2FBQzdCO2lCQUFNLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDdkI7WUFFRCwyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5Qyx5RUFBeUU7WUFFekUsT0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0csR0FBRyxDQUFDLElBQUksRUFBRSxRQUFzQzs7Z0JBQ3BELE1BQU0sR0FBRyxtQkFDUCxTQUFTLEVBQUUsSUFBSSxJQUNaLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO2dCQUVGLGlCQUFpQjtnQkFDakIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzVCLElBQUksR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0Qsa0JBQWtCO2dCQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUM3QixvREFBb0Q7Z0JBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekMsa0NBQWtDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBRTNELHdDQUF3QztnQkFDeEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7b0JBQ3pCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTFCLGlCQUFpQjtnQkFDakIsSUFBSSxXQUFXLEdBQXVCLFNBQVMsQ0FBQztnQkFDaEQsSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLFNBQVM7b0JBQUUsV0FBVyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV4RSxJQUNFLFdBQVc7b0JBQ1gsS0FBSyxDQUFDLFdBQVcsS0FBSyxTQUFTO29CQUMvQixXQUFXLEtBQUssS0FBSyxDQUFDLFdBQVcsRUFDakM7b0JBQ0EsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMzQixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFFRCxrQ0FBa0M7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2xFLDhCQUE4QjtvQkFDOUIsSUFBSSxLQUFLLENBQUMsY0FBYzt3QkFBRSxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JELHdDQUF3QztvQkFDeEMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBRUQsNkNBQTZDO2dCQUM3QyxrREFBa0Q7Z0JBQ2xELElBQUksR0FBRyxDQUFDLFNBQVM7b0JBQUUsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUN0QyxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FBQTtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FxQkc7UUFDRyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFzQzs7Z0JBQzNELE1BQU0sR0FBRyxxQkFDSixDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztnQkFFRixpQkFBaUI7Z0JBQ2pCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUM1QixJQUFJLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ25EO2dCQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtvQkFDN0IsV0FBVyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQztnQkFFRCxrQkFBa0I7Z0JBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBRTdCLG9DQUFvQztnQkFDcEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksa0NBQ3BDLEdBQUcsS0FDTixTQUFTLEVBQUUsS0FBSyxJQUNoQixDQUFDO2dCQUVILDBDQUEwQztnQkFDMUMsTUFBTSxhQUFhLEdBQVEsbUJBQVcsQ0FDcEM7b0JBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRztvQkFDM0IsY0FBYyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYztpQkFDbEQsRUFDRCxHQUFHLENBQ0osQ0FBQztnQkFFRixxREFBcUQ7Z0JBQ3JELE1BQU0sUUFBUSxHQUNaLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNKLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTt3QkFDcEIsaUJBQVMsQ0FDUCxPQUFPLGFBQWEsQ0FBQyxHQUFHLEtBQUssUUFBUTs0QkFDbkMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsR0FBRzs0QkFDekIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQ3JCLElBQUksQ0FDTCxDQUFDO2dCQUVSLE1BQU0sV0FBVyxHQUFHO29CQUNsQixJQUFJO29CQUNKLEtBQUs7b0JBQ0wsV0FBVztvQkFDWCxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDckUsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUM3QixRQUFRO29CQUNSLFFBQVEsRUFBRSxhQUFhO2lCQUN4QixDQUFDO2dCQUVGLDhCQUE4QjtnQkFDOUIsTUFBTSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsU0FBUztvQkFDOUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO29CQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFakMsb0NBQW9DO2dCQUNwQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDbkQsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyxNQUFNLENBQUMsSUFBSTs7Z0JBQ2YsUUFBUTtnQkFDUixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLG9CQUFvQjtnQkFDcEIsSUFBSSxLQUFLO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUN2QixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FBQTtRQUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDRyxNQUFNLENBQUMsSUFBSTs7Z0JBQ2Ysa0JBQWtCO2dCQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUM3QixrQkFBa0I7Z0JBQ2xCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQUE7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDRyxLQUFLOztnQkFDVCxrQkFBa0I7Z0JBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQzdCLGtCQUFrQjtnQkFDbEIsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsTUFBTSxDQUFDLFFBQVE7WUFDYixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxVQUFVLENBQUMsTUFBTTtZQUNmLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7SUEvWE0saUJBQVUsR0FBRztRQUNsQixRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsSUFBSTtZQUNYLEVBQUUsRUFBRSxpQkFBaUI7WUFDckIsS0FBSyxFQUFFLGlDQUF5QjtTQUNqQztLQUNGLENBQUM7SUFhRjs7Ozs7Ozs7O09BU0c7SUFDSSx5QkFBa0IsR0FBbUMsRUFBRSxDQUFDO0lBcVdqRSxrQkFBZSxNQUFNLENBQUMifQ==