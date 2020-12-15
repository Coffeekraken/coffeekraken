"use strict";
// @ts-nocheck
// @shared
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
            ls: '@coffeekraken/sugar/js/cache/adapters/SCacheLsAdapter',
            fs: `../../cache/adapters/SCacheFsAdapter`
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
                let adptr = yield Promise.resolve().then(() => __importStar(require(
                /* webpackChunkName: "SCacheAdapter" */ this._defaultAdaptersPaths[adapter])));
                if (adptr.default)
                    adptr = adptr.default;
                this._adapter = new adptr(this._settings);
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
     * @param               {Boolean}             [valueOnly=true]  Specify if you want the value only or the all cache object
     * @return              {Promise}                               A promise that will be resolved once the item has been getted
     *
     * @example             js
     * const myValue = myCache.get('coolValue');
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(name, valueOnly = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // check the name
            if (typeof name !== 'string') {
                name = md5_1.default(toString_1.default(name)).toString();
            }
            // get the adapter
            const adapter = yield this.getAdapter();
            // using the specified adapter to get the value back
            const rawValue = yield adapter.get(`${this._name}.${name}`);
            // check that we have a value back
            if (!rawValue || typeof rawValue !== 'string')
                return null;
            // parse the raw value back to an object
            const value = adapter.parse
                ? adapter.parse(rawValue)
                : this._parse(rawValue);
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
            if (valueOnly)
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
            if (!/^[a-zA-Z0-9_\-\+\.]+$/.test(name)) {
                throw new Error(`You try to set an item named "<yellow>${name}</yellow>" in the "${this._name}" SCache instance but an item name can contain only these characters <green>[a-zA-Z0-9_-.]</green> but you've passed "<red>${name}</red>"...`);
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
            return adapter.set(`${this._name}.${name}`, stringifiedValueToSave);
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
            return adapter.delete(`${this._name}.${name}`);
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
            return adapter.clear(this._name);
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
//# sourceMappingURL=SCache.js.map