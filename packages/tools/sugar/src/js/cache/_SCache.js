// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        define(["require", "exports", "../class/SClass", "../object/deepMerge", "../time/convert", "../crypt/md5", "../string/toString", "./interface/SCacheSettingsInterface", "../is/class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("../class/SClass"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var convert_1 = __importDefault(require("../time/convert"));
    var md5_1 = __importDefault(require("../crypt/md5"));
    var toString_1 = __importDefault(require("../string/toString"));
    var SCacheSettingsInterface_1 = __importDefault(require("./interface/SCacheSettingsInterface"));
    var class_1 = __importDefault(require("../is/class"));
    var SCache = /** @class */ (function (_super) {
        __extends(SCache, _super);
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
        function SCache(id, settings) {
            if (settings === void 0) { settings = {}; }
            var _this = _super.call(this, deepMerge_1.default({
                cache: {}
            }, settings)) || this;
            // make sure we have a name
            if (!id) {
                throw new Error("The SCache instance need an id. To set it, pass the \"id\" as the first argument of the constructor...");
            }
            // store the id
            if (!/^[a-zA-Z0-9-_\.]+$/.test(id)) {
                throw new Error("The name of an SCache instance can contain only letters like <green>[a-zA-Z0-9_-.]</green> but you've passed \"<red>" + name + "</red>\"...");
            }
            _this._settings.id = id;
            return _this;
        }
        Object.defineProperty(SCache.prototype, "cacheSettings", {
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
            get: function () {
                return this._settings.cache;
            },
            enumerable: false,
            configurable: true
        });
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
        SCache.registerAdapter = function (adapter, id) {
            this.registeredAdapters[id || adapter.id] = adapter;
        };
        Object.defineProperty(SCache.prototype, "adapter", {
            get: function () {
                if (this._adapter)
                    return this._adapter;
                var adptr = this.constructor.registeredAdapters[this.cacheSettings.adapter];
                if (!adptr) {
                    throw "Sorry but it seems that the requested SCache adapter \"<yellow>" + this.cacheSettings.adapter + "</yellow>\" does not exists...";
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
            },
            enumerable: false,
            configurable: true
        });
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
            return __awaiter(this, void 0, void 0, function () {
                var set, adapter, rawValue, value, contextHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            set = __assign({ valueOnly: true }, (settings || {}));
                            // check the name
                            if (typeof name !== 'string') {
                                name = md5_1.default.encrypt(toString_1.default(name));
                            }
                            adapter = this.adapter;
                            return [4 /*yield*/, adapter.get(name)];
                        case 1:
                            rawValue = _a.sent();
                            // check that we have a value back
                            if (!rawValue || typeof rawValue !== 'string')
                                return [2 /*return*/, null];
                            value = adapter.parse
                                ? adapter.parse(rawValue)
                                : this._parse(rawValue);
                            contextHash = undefined;
                            if (set.context !== undefined)
                                contextHash = md5_1.default.encrypt(set.context);
                            if (!(contextHash &&
                                value.contextHash !== undefined &&
                                contextHash !== value.contextHash)) return [3 /*break*/, 3];
                            return [4 /*yield*/, adapter.delete(name)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, null];
                        case 3:
                            if (!(value.deleteAt !== -1 && value.deleteAt < new Date().getTime())) return [3 /*break*/, 6];
                            if (!value.deleteOnExpire) return [3 /*break*/, 5];
                            return [4 /*yield*/, adapter.delete(name)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: 
                        // return null cause the item is too old
                        return [2 /*return*/, null];
                        case 6:
                            // otherwise, this is good so return the item
                            // either the value only, or the full cache object
                            if (set.valueOnly)
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
        SCache.prototype.set = function (name, value, settings) {
            return __awaiter(this, void 0, void 0, function () {
                var set, contextHash, adapter, existingValue, finalSettings, deleteAt, valueToSave, stringifiedValueToSave;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            set = __assign({}, (settings || {}));
                            // check the name
                            if (typeof name !== 'string') {
                                name = md5_1.default(toString_1.default(name)).toString();
                            }
                            contextHash = null;
                            if (set.context !== undefined) {
                                contextHash = md5_1.default.encrypt(set.context);
                            }
                            adapter = this.adapter;
                            return [4 /*yield*/, this.get(name, __assign(__assign({}, set), { valueOnly: false }))];
                        case 1:
                            existingValue = _a.sent();
                            finalSettings = deepMerge_1.default({
                                ttl: this.cacheSettings.ttl,
                                deleteOnExpire: this.cacheSettings.deleteOnExpire
                            }, set);
                            deleteAt = finalSettings.ttl === -1
                                ? -1
                                : new Date().getTime() +
                                    convert_1.default(typeof finalSettings.ttl === 'number'
                                        ? finalSettings.ttl + "s"
                                        : finalSettings.ttl, 'ms');
                            valueToSave = {
                                name: name,
                                value: value,
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
                    adapter = this.adapter;
                    // delete the item
                    return [2 /*return*/, adapter.delete(name)];
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
                    adapter = this.adapter;
                    // clear the cache
                    return [2 /*return*/, adapter.clear()];
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
            return this.cacheSettings.parse(rawValue);
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
            return this.cacheSettings.stringify(object);
        };
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
        return SCache;
    }(SClass_1.default));
    exports.default = SCache;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NDYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIl9TQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR1YsMkRBQXVDO0lBQ3ZDLGtFQUE4QztJQUU5Qyw0REFBd0M7SUFFeEMscURBQWlDO0lBQ2pDLGdFQUE0QztJQUM1QyxnR0FBNEU7SUFDNUUsc0RBQW9DO0lBbURwQztRQUFxQiwwQkFBUTtRQW9EM0I7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsZ0JBQVksRUFBRSxFQUFFLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7WUFBN0IsWUFDRSxrQkFDRSxtQkFBVyxDQUNUO2dCQUNFLEtBQUssRUFBRSxFQUFFO2FBQ1YsRUFDRCxRQUFRLENBQ1QsQ0FDRixTQWdCRjtZQWRDLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0dBQXNHLENBQ3ZHLENBQUM7YUFDSDtZQUNELGVBQWU7WUFDZixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUNiLHlIQUFzSCxJQUFJLGdCQUFZLENBQ3ZJLENBQUM7YUFDSDtZQUVELEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7UUFDekIsQ0FBQztRQS9ERCxzQkFBSSxpQ0FBYTtZQVZqQjs7Ozs7Ozs7O2VBU0c7aUJBQ0g7Z0JBQ0UsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLEtBQUssQ0FBQztZQUNyQyxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNJLHNCQUFlLEdBQXRCLFVBQXVCLE9BQXVCLEVBQUUsRUFBVztZQUN6RCxJQUFJLENBQUMsa0JBQWtCLENB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