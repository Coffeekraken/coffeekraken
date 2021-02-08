// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        define(["require", "exports", "../object/deepMerge", "./adapters/SCacheAdapter", "../time/convert", "../is/node", "../crypt/md5", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SCacheAdapter_1 = __importDefault(require("./adapters/SCacheAdapter"));
    var convert_1 = __importDefault(require("../time/convert"));
    var node_1 = __importDefault(require("../is/node"));
    var md5_1 = __importDefault(require("../crypt/md5"));
    var toString_1 = __importDefault(require("../string/toString"));
    /**
     * @name                                SCache
     * @namespace           sugar.js.cache
     * @type                                Class
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
    var SCache = /** @class */ (function () {
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
        function SCache(name, settings) {
            if (settings === void 0) { settings = {}; }
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
                ls: __dirname + "/adapters/SCacheLsAdapter",
                fs: __dirname + "/adapters/SCacheFsAdapter"
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
                throw new Error("The SCache instance need a name. To set it, pass the \"name\" as the first argument of the constructor...");
            }
            // store the name
            if (!/^[a-zA-Z0-9-_\.]+$/.test(name)) {
                throw new Error("The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed \"<red>" + name + "</red>\"...");
            }
            this._name = name;
            this._settings = deepMerge_1.default({
                name: name,
                ttl: -1,
                deleteOnExpire: true,
                adapter: node_1.default() ? 'fs' : 'ls',
                parse: JSON.parse,
                stringify: JSON.stringify
            }, settings);
        }
        Object.defineProperty(SCache.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @name                            adapter
         * @type                            SCacheAdapter
         *
         * Access this cache instance adapter
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SCache.prototype.getAdapter = function () {
            return __awaiter(this, void 0, void 0, function () {
                var adapter, adptr, adptrSettings;
                return __generator(this, function (_a) {
                    // check if we have already an adapter setted for this instance
                    if (this._adapter)
                        return [2 /*return*/, this._adapter];
                    adapter = this._settings.adapter;
                    // check the type
                    if (typeof adapter === 'string' && this._defaultAdaptersPaths[adapter]) {
                        adptr = require(this._defaultAdaptersPaths[adapter]);
                        if (adptr.default)
                            adptr = adptr.default;
                        adptrSettings = {};
                        if (this._settings.adapters && this._settings.adapters[adapter]) {
                            adptrSettings = this._settings.adapters[adapter];
                        }
                        this._adapter = new adptr(this, adptrSettings);
                    }
                    else if (adapter instanceof SCacheAdapter_1.default) {
                        this._adapter = adapter;
                    }
                    // return the adapter
                    return [2 /*return*/, this._adapter];
                });
            });
        };
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
        SCache.prototype.get = function (name, settings) {
            if (settings === void 0) { settings = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var adapter, rawValue, value, contextHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            settings = __assign({ valueOnly: true }, settings);
                            // check the name
                            if (typeof name !== 'string') {
                                name = md5_1.default(toString_1.default(name)).toString();
                            }
                            return [4 /*yield*/, this.getAdapter()];
                        case 1:
                            adapter = _a.sent();
                            return [4 /*yield*/, adapter.get(name)];
                        case 2:
                            rawValue = _a.sent();
                            // check that we have a value back
                            if (!rawValue || typeof rawValue !== 'string')
                                return [2 /*return*/, null];
                            value = adapter.parse
                                ? adapter.parse(rawValue)
                                : this._parse(rawValue);
                            // check the hash
                            if (settings.hash && value.hash && settings.hash !== value.hash) {
                                return [2 /*return*/, null];
                            }
                            // check context hash
                            if (settings.context && value.contextHash) {
                                contextHash = md5_1.default.encrypt(toString_1.default(settings.context));
                                if (contextHash !== value.contextHash)
                                    return [2 /*return*/, null];
                            }
                            if (!(value.deleteAt !== -1 && value.deleteAt < new Date().getTime())) return [3 /*break*/, 5];
                            if (!value.deleteOnExpire) return [3 /*break*/, 4];
                            return [4 /*yield*/, adapter.delete(name)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: 
                        // return null cause the item is too old
                        return [2 /*return*/, null];
                        case 5:
                            // otherwise, this is good so return the item
                            // either the value only, or the full cache object
                            if (settings.valueOnly)
                                return [2 /*return*/, value.value];
                            return [2 /*return*/, value];
                    }
                });
            });
        };
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
        SCache.prototype.set = function (name, value, settings) {
            if (settings === void 0) { settings = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var hash, settingsHash, contextHash, adapter, existingValue, finalSettings, deleteAt, valueToSave, stringifiedValueToSave;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // check the name
                            if (typeof name !== 'string') {
                                name = md5_1.default(toString_1.default(name)).toString();
                            }
                            hash = null;
                            settingsHash = settings.hash
                                ? !Array.isArray(settings.hash)
                                    ? [settings.hash]
                                    : settings.hash
                                : [];
                            hash = md5_1.default.encrypt(name + ("" + settingsHash.join('.')));
                            contextHash = null;
                            if (settings.context !== undefined) {
                                contextHash = md5_1.default.encrypt(toString_1.default(settings.context));
                            }
                            return [4 /*yield*/, this.getAdapter()];
                        case 1:
                            adapter = _a.sent();
                            return [4 /*yield*/, this.get(name, false)];
                        case 2:
                            existingValue = _a.sent();
                            finalSettings = deepMerge_1.default({
                                ttl: this._settings.ttl,
                                deleteOnExpire: this._settings.deleteOnExpire
                            }, settings);
                            deleteAt = finalSettings.ttl === -1
                                ? -1
                                : new Date().getTime() +
                                    convert_1.default(typeof finalSettings.ttl === 'number'
                                        ? finalSettings.ttl + "s"
                                        : finalSettings.ttl, 'ms');
                            valueToSave = {
                                name: name,
                                value: value,
                                hash: hash,
                                contextHash: contextHash,
                                created: existingValue ? existingValue.created : new Date().getTime(),
                                updated: new Date().getTime(),
                                deleteAt: deleteAt,
                                settings: finalSettings
                            };
                            stringifiedValueToSave = adapter.stringify
                                ? adapter.stringify(valueToSave)
                                : this._stringify(valueToSave);
                            // use the adapter to save the value
                            return [2 /*return*/, adapter.set(name, stringifiedValueToSave)];
                    }
                });
            });
        };
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
        SCache.prototype.exists = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.get(name)];
                        case 1:
                            value = _a.sent();
                            // return the status
                            if (value)
                                return [2 /*return*/, true];
                            return [2 /*return*/, false];
                    }
                });
            });
        };
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
        SCache.prototype.delete = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var adapter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getAdapter()];
                        case 1:
                            adapter = _a.sent();
                            // delete the item
                            return [2 /*return*/, adapter.delete(name)];
                    }
                });
            });
        };
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
        SCache.prototype.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                var adapter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getAdapter()];
                        case 1:
                            adapter = _a.sent();
                            // clear the cache
                            return [2 /*return*/, adapter.clear()];
                    }
                });
            });
        };
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
        SCache.prototype._parse = function (rawValue) {
            return this._settings.parse(rawValue);
        };
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
        SCache.prototype._stringify = function (object) {
            return this._settings.stringify(object);
        };
        return SCache;
    }());
    exports.default = SCache;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUE4QztJQUM5QywyRUFBdUQ7SUFDdkQsNERBQXdDO0lBQ3hDLG9EQUFrQztJQUNsQyxxREFBaUM7SUFDakMsZ0VBQTRDO0lBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSDtRQW9ERTs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxnQkFBWSxJQUFJLEVBQUUsUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTtZQXJFL0I7Ozs7Ozs7O2VBUUc7WUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWI7Ozs7Ozs7O2VBUUc7WUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1lBRWY7Ozs7Ozs7O2VBUUc7WUFDSCwwQkFBcUIsR0FBRztnQkFDdEIsRUFBRSxFQUFLLFNBQVMsOEJBQTJCO2dCQUMzQyxFQUFFLEVBQUssU0FBUyw4QkFBMkI7YUFDNUMsQ0FBQztZQUVGOzs7Ozs7OztlQVFHO1lBQ0gsYUFBUSxHQUFHLElBQUksQ0FBQztZQXlCZCwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxNQUFNLElBQUksS0FBSyxDQUNiLDJHQUF5RyxDQUMxRyxDQUFDO2FBQ0g7WUFDRCxpQkFBaUI7WUFDakIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxJQUFJLEtBQUssQ0FDYix5SEFBc0gsSUFBSSxnQkFBWSxDQUN2SSxDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUVsQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO2dCQUNFLElBQUksTUFB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