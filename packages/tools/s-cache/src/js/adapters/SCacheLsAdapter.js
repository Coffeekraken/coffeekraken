// @ts-nocheck
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
        define(["require", "exports", "../../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    /**
     * @name                                SCacheFsAdapter
     * @namespace           sugar.js.cache.adapters
     * @type                                Class
     *
     * A filesystem SCache adapter that allows you to store your cache items on the user system
     *
     * @todo      interface
     * @todo      doc
     *
     * @example             js
     * const cache = new SCache({
     *    ttl: 100,
     *    adapter: new SCacheLsAdapter({
     *    })
     * });
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SCacheLsAdapter = /** @class */ (function (_super) {
        __extends(SCacheLsAdapter, _super);
        /**
         * @name                              constructor
         * @type                              Function
         *
         * Construct the SCacheFsAdapter instance with the settings passed in object format. See description bellow.
         *
         * @param         {Object}          [settings={}]             An object to configure the SCacheFsAdapter instance. This is specific to each adapters.settings.settings...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SCacheLsAdapter(settings) {
            if (settings === void 0) { settings = {}; }
            return _super.call(this, deepMerge_1.default({}, settings)) || this;
        }
        /**
         * @name                          set
         * @type                          Function
         *
         * Set a cache item in the localstorage
         *
         * @param             {String}              name              The item name
         * @param             {Mixed}               value             The value to save
         * @param             {Object}              [settings={}]     A settings object to override the default ones defined on the SCache instance
         * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
         *
         * @example           js
         * await myCache.set('myCoolItem', { hello: 'world' }, {
         *    ttl: 40000
         * });
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SCacheLsAdapter.prototype.set = function (name, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // store data into localStorage
                    window.localStorage.setItem(this.cache.id + "." + name, value);
                    // write has been done correctly
                    return [2 /*return*/, true];
                });
            });
        };
        /**
         * @name                          get
         * @type                          Function
         *
         * Get a cache item in the localstorage
         *
         * @param             {String}              name              The item name
         * @return            {Object|Boolean}                        Return the objectToSave generated by the "this.processItem" method, or false if something goes wrong...
         *
         * @example           js
         * await myCache.get('myCoolItem');
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SCacheLsAdapter.prototype.get = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, window.localStorage.getItem(this.cache.id + "." + name)];
                });
            });
        };
        /**
         * @name                          delete
         * @type                          Function
         *
         * Delete a cache item on the filesystem
         *
         * @param             {String}              name              The item name
         * @return            {Boolean}                               true if all of, false if not...
         *
         * @example           js
         * await myCache.delete('myCoolItem');
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SCacheLsAdapter.prototype.delete = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // delete the item from the localStorage
                    window.localStorage.removeItem(this.cache.id + "." + name);
                    // return true cause all went well
                    return [2 /*return*/, true];
                });
            });
        };
        /**
         * @name                          clear
         * @type                          Function
         *
         * Clear all the items in the current cache
         *
         * @return            {Boolean}                               true if all of, false if not...
         *
         * @example           js
         * await myCache.clear;
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SCacheLsAdapter.prototype.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                var keys, keysToDelete;
                var _this = this;
                return __generator(this, function (_a) {
                    keys = Object.keys(window.localStorage);
                    keysToDelete = keys.filter(function (key) {
                        return key.startsWith(_this.cache.id + ".");
                    });
                    // loop on each keys to delete
                    keysToDelete.forEach(function (k) {
                        window.localStorage.removeItem(k);
                    });
                    // return true cause all went well
                    return [2 /*return*/, true];
                });
            });
        };
        /**
         * @name                      keys
         * @type                      Function
         * @async
         *
         * Return an array of all the items keys saved in this cache instance
         *
         * @return        {Promise}                     A promise resolved with the array of keys
         *
         * @example         js
         * const keys = await myCache.keys(); // => ['item1','item2']
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SCacheLsAdapter.prototype.keys = function () {
            return __awaiter(this, void 0, void 0, function () {
                var keys, cacheKeys;
                var _this = this;
                return __generator(this, function (_a) {
                    keys = Object.keys(window.localStorage);
                    cacheKeys = keys.filter(function (key) {
                        return key.startsWith(_this.cache.id + ".");
                    });
                    // return the cache keys
                    return [2 /*return*/, cacheKeys];
                });
            });
        };
        SCacheLsAdapter.id = 'ls';
        return SCacheLsAdapter;
    }(__SCacheAdapter));
    exports.default = SCacheLsAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlTHNBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NhY2hlTHNBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxxRUFBaUQ7SUFHakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSDtRQUE2QyxtQ0FBZTtRQUcxRDs7Ozs7Ozs7O1dBU0c7UUFDSCx5QkFBWSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO21CQUN2QixrQkFBTSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0csNkJBQUcsR0FBVCxVQUFVLElBQUksRUFBRSxLQUFLOzs7b0JBQ25CLCtCQUErQjtvQkFDL0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQUksSUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMvRCxnQ0FBZ0M7b0JBQ2hDLHNCQUFPLElBQUksRUFBQzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csNkJBQUcsR0FBVCxVQUFVLElBQUk7OztvQkFDWixzQkFBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBSSxJQUFNLENBQUMsRUFBQzs7O1NBQ2hFO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNHLGdDQUFNLEdBQVosVUFBYSxJQUFJOzs7b0JBQ2Ysd0NBQXdDO29CQUN4QyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBSSxJQUFNLENBQUMsQ0FBQztvQkFFM0Qsa0NBQWtDO29CQUNsQyxzQkFBTyxJQUFJLEVBQUM7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0csK0JBQUssR0FBWDs7Ozs7b0JBRVEsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUd4QyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUc7d0JBQ25DLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBSSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBRyxDQUFDLENBQUM7b0JBQzdDLENBQUMsQ0FBQyxDQUFDO29CQUVILDhCQUE4QjtvQkFDOUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7d0JBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztvQkFFSCxrQ0FBa0M7b0JBQ2xDLHNCQUFPLElBQUksRUFBQzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csOEJBQUksR0FBVjs7Ozs7b0JBRVEsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUd4QyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUc7d0JBQ2hDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBSSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBRyxDQUFDLENBQUM7b0JBQzdDLENBQUMsQ0FBQyxDQUFDO29CQUVILHdCQUF3QjtvQkFDeEIsc0JBQU8sU0FBUyxFQUFDOzs7U0FDbEI7UUF6SU0sa0JBQUUsR0FBRyxJQUFJLENBQUM7UUEwSW5CLHNCQUFDO0tBQUEsQUEzSUQsQ0FBNkMsZUFBZSxHQTJJM0Q7c0JBM0lvQixlQUFlIn0=