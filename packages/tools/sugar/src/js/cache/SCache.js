// @ts-nocheck
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
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SCacheAdapter_1 = __importDefault(require("./adapters/SCacheAdapter"));
    var convert_1 = __importDefault(require("../time/convert"));
    var node_1 = __importDefault(require("../is/node"));
    var md5_1 = __importDefault(require("../crypt/md5"));
    var toString_1 = __importDefault(require("../string/toString"));
    return /** @class */ (function () {
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
                ls: '@coffeekraken/sugar/js/cache/adapters/SCacheLsAdapter',
                fs: "../../cache/adapters/SCacheFsAdapter"
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
                var adapter, adptr;
                return __generator(this, function (_a) {
                    var _b;
                    switch (_a.label) {
                        case 0:
                            // check if we have already an adapter setted for this instance
                            if (this._adapter)
                                return [2 /*return*/, this._adapter];
                            adapter = this._settings.adapter;
                            if (!(typeof adapter === 'string' && this._defaultAdaptersPaths[adapter])) return [3 /*break*/, 2];
                            return [4 /*yield*/, (_b = 
                                /* webpackChunkName: "SCacheAdapter" */ this._defaultAdaptersPaths[adapter], __syncRequire ? Promise.resolve().then(function () { return __importStar(require(_b)); }) : new Promise(function (resolve_1, reject_1) { require([_b], resolve_1, reject_1); }).then(__importStar))];
                        case 1:
                            adptr = _a.sent();
                            if (adptr.default)
                                adptr = adptr.default;
                            this._adapter = new adptr(this._settings);
                            return [3 /*break*/, 3];
                        case 2:
                            if (adapter instanceof SCacheAdapter_1.default) {
                                this._adapter = adapter;
                            }
                            _a.label = 3;
                        case 3: 
                        // return the adapter
                        return [2 /*return*/, this._adapter];
                    }
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
         * @param               {Boolean}             [valueOnly=true]  Specify if you want the value only or the all cache object
         * @return              {Promise}                               A promise that will be resolved once the item has been getted
         *
         * @example             js
         * const myValue = myCache.get('coolValue');
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SCache.prototype.get = function (name, valueOnly) {
            if (valueOnly === void 0) { valueOnly = true; }
            return __awaiter(this, void 0, void 0, function () {
                var adapter, rawValue, value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // check the name
                            if (typeof name !== 'string') {
                                name = md5_1.default(toString_1.default(name)).toString();
                            }
                            return [4 /*yield*/, this.getAdapter()];
                        case 1:
                            adapter = _a.sent();
                            return [4 /*yield*/, adapter.get(this._name + "." + name)];
                        case 2:
                            rawValue = _a.sent();
                            // check that we have a value back
                            if (!rawValue || typeof rawValue !== 'string')
                                return [2 /*return*/, null];
                            value = adapter.parse
                                ? adapter.parse(rawValue)
                                : this._parse(rawValue);
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
                            if (valueOnly)
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
                var adapter, existingValue, finalSettings, deleteAt, valueToSave, stringifiedValueToSave;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // check the name
                            if (typeof name !== 'string') {
                                name = md5_1.default(toString_1.default(name)).toString();
                            }
                            // test name
                            if (!/^[a-zA-Z0-9_\-\+\.]+$/.test(name)) {
                                throw new Error("You try to set an item named \"<yellow>" + name + "</yellow>\" in the \"" + this._name + "\" SCache instance but an item name can contain only these characters <green>[a-zA-Z0-9_-.]</green> but you've passed \"<red>" + name + "</red>\"...");
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
                                created: existingValue ? existingValue.created : new Date().getTime(),
                                updated: new Date().getTime(),
                                deleteAt: deleteAt,
                                settings: finalSettings
                            };
                            stringifiedValueToSave = adapter.stringify
                                ? adapter.stringify(valueToSave)
                                : this._stringify(valueToSave);
                            // use the adapter to save the value
                            return [2 /*return*/, adapter.set(this._name + "." + name, stringifiedValueToSave)];
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
                            return [2 /*return*/, adapter.delete(this._name + "." + name)];
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
                            return [2 /*return*/, adapter.clear(this._name)];
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
});
