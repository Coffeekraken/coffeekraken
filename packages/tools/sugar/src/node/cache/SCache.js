"use strict";
// @ts-nocheck
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
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SCacheAdapter_1 = __importDefault(require("./adapters/SCacheAdapter"));
const convert_1 = __importDefault(require("../time/convert"));
const node_1 = __importDefault(require("../is/node"));
const md5_1 = __importDefault(require("../crypt/md5"));
const toString_1 = __importDefault(require("../string/toString"));
module.exports = class SCache {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SCache instance with the settings passed in object format. See description bellow.
     *
     * @param         {String}        name                  A name for your cache instance. Can have only these characters: [a-zA-Z0-9_-]
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
    constructor(name, settings = {}) {
        /**
         * @name                              _name
         * @type                              String
         * @private
         *
         * Store the cache name
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._name = null;
        /**
         * @name                              _settings
         * @type                              Object
         * @private
         *
         * Store the default settings of the SCache instance
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name                              _defaultAdaptersPaths
         * @type                              Object
         * @private
         *
         * List all the default adapters and their path
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._defaultAdaptersPaths = {
            ls: `${__dirname}/adapters/SCacheLsAdapter`,
            fs: `${__dirname}/adapters/SCacheFsAdapter`
        };
        /**
         * @name                              _adapter
         * @type                              SCacheAdapter
         * @private
         *
         * Store this current instance adapter
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._adapter = null;
        // make sure we have a name
        if (!name) {
            throw new Error(`The SCache instance need a name. To set it, pass the "name" as the first argument of the constructor...`);
        }
        // store the name
        if (!/^[a-zA-Z0-9-_\.]+$/.test(name)) {
            throw new Error(`The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed "<red>${name}</red>"...`);
        }
        this._name = name;
        this._settings = deepMerge_1.default({
            name,
            ttl: -1,
            deleteOnExpire: true,
            adapter: node_1.default() ? 'fs' : 'ls',
            parse: JSON.parse,
            stringify: JSON.stringify
        }, settings);
    }
    get name() {
        return this._name;
    }
    /**
     * @name                            adapter
     * @type                            SCacheAdapter
     *
     * Access this cache instance adapter
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    getAdapter() {
        return __awaiter(this, void 0, void 0, function* () {
            // check if we have already an adapter setted for this instance
            if (this._adapter)
                return this._adapter;
            // get the adapter specified in the settings
            const adapter = this._settings.adapter;
            // check the type
            if (typeof adapter === 'string' && this._defaultAdaptersPaths[adapter]) {
                let adptr = require(this._defaultAdaptersPaths[adapter]);
                if (adptr.default)
                    adptr = adptr.default;
                let adptrSettings = {};
                if (this._settings.adapters && this._settings.adapters[adapter]) {
                    adptrSettings = this._settings.adapters[adapter];
                }
                this._adapter = new adptr(this, adptrSettings);
            }
            else if (adapter instanceof SCacheAdapter_1.default) {
                this._adapter = adapter;
            }
            // return the adapter
            return this._adapter;
        });
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
    get(name, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            settings = Object.assign({ valueOnly: true }, settings);
            // check the name
            if (typeof name !== 'string') {
                name = md5_1.default(toString_1.default(name)).toString();
            }
            // get the adapter
            const adapter = yield this.getAdapter();
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
            if (settings.hash && value.hash && settings.hash !== value.hash) {
                return null;
            }
            // check context hash
            if (settings.context && value.contextHash) {
                const contextHash = md5_1.default.encrypt(toString_1.default(settings.context));
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
            if (settings.valueOnly)
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
     * @param               {Object}              [settings={}]
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
    set(name, value, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // check the name
            if (typeof name !== 'string') {
                name = md5_1.default(toString_1.default(name)).toString();
            }
            // test name
            // if (!/^[a-zA-Z0-9_\-\+\.]+$/.test(name)) {
            //   throw new Error(
            //     `You try to set an item named "<yellow>${name}</yellow>" in the "${this._name}" SCache instance but an item name can contain only these characters <green>[a-zA-Z0-9_-.]</green> but you've passed "<red>${name}</red>"...`
            //   );
            // }
            // generate a hash
            let hash = null;
            let settingsHash = settings.hash
                ? !Array.isArray(settings.hash)
                    ? [settings.hash]
                    : settings.hash
                : [];
            hash = md5_1.default.encrypt(name + `${settingsHash.join('.')}`);
            let contextHash = null;
            if (settings.context !== undefined) {
                contextHash = md5_1.default.encrypt(toString_1.default(settings.context));
            }
            // get the adapter
            const adapter = yield this.getAdapter();
            // try to get the value to update it
            const existingValue = yield this.get(name, false);
            // merge the default and the item settings
            const finalSettings = deepMerge_1.default({
                ttl: this._settings.ttl,
                deleteOnExpire: this._settings.deleteOnExpire
            }, settings);
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
            const adapter = yield this.getAdapter();
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
            const adapter = yield this.getAdapter();
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
        return this._settings.parse(rawValue);
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
        return this._settings.stringify(object);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7OztBQUVWLG9FQUE4QztBQUM5Qyw2RUFBdUQ7QUFDdkQsOERBQXdDO0FBQ3hDLHNEQUFrQztBQUNsQyx1REFBaUM7QUFDakMsa0VBQTRDO0FBMkI1QyxpQkFBUyxNQUFNLE1BQU07SUFvRG5COzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILFlBQVksSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBckUvQjs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxJQUFJLENBQUM7UUFFYjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILDBCQUFxQixHQUFHO1lBQ3RCLEVBQUUsRUFBRSxHQUFHLFNBQVMsMkJBQTJCO1lBQzNDLEVBQUUsRUFBRSxHQUFHLFNBQVMsMkJBQTJCO1NBQzVDLENBQUM7UUFFRjs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBRyxJQUFJLENBQUM7UUF5QmQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUNiLHlHQUF5RyxDQUMxRyxDQUFDO1NBQ0g7UUFDRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxNQUFNLElBQUksS0FBSyxDQUNiLHNIQUFzSCxJQUFJLFlBQVksQ0FDdkksQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLElBQUk7WUFDSixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ1AsY0FBYyxFQUFFLElBQUk7WUFDcEIsT0FBTyxFQUFFLGNBQVEsRUFBRSxDQUFD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