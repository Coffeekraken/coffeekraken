// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        define(["require", "exports", "@coffeekraken/s-promise", "../../node/config/sugar", "../class/SClass", "../object/deepMerge", "./interface/SNotificationSettingsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    var sugar_1 = __importDefault(require("../../node/config/sugar"));
    var SClass_1 = __importDefault(require("../class/SClass"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SNotificationSettingsInterface_1 = __importDefault(require("./interface/SNotificationSettingsInterface"));
    var SNotification = /** @class */ (function (_super) {
        __extends(SNotification, _super);
        /**
         * @name        constructor
         * @type        Function
         * @constructor
         *
         * Constructor
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SNotification(settings) {
            return _super.call(this, deepMerge_1.default({
                notification: {}
            }, settings || {})) || this;
        }
        /**
         * @name            registerAdapter
         * @type            Function
         * @static
         *
         * This static method allows you to register a new adapter to make use
         * of it easily through the SNotification instance
         *
         * @param       {ISNotificationAdapter}     adapter         The adapter you want to register
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SNotification.registerAdapter = function (adapter) {
            if (this._registeredAdapters[adapter.id]) {
                throw new Error("Sorry but the \"<yellow>" + adapter.id + "</yellow>\" SNotification adapter you try to register already exists...");
            }
            this._registeredAdapters[adapter.id] = adapter;
        };
        /**
         * @name            getAdapter
         * @type            Function
         * @static
         *
         * This static method allows you to get a registered adapter by his id
         *
         * @param       {String}     adapterId          The adapter id you want to get back
         * @return      {ISNotificationAdapter}       The adapter requested
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SNotification.getAdapter = function (adapterId) {
            if (!this._registeredAdapters[adapterId]) {
                throw new Error("Sorry but the \"<yellow>" + adapterId + "</yellow>\" SNotification adapter you try to get does not exists...");
            }
            return this._registeredAdapters[adapterId];
        };
        Object.defineProperty(SNotification.prototype, "notificationSettings", {
            /**
             * @name        notificationSettings
             * @type        ISNotificationSettings
             * @get
             *
             * Access the notification settings
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._settings.notification;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @name          notify
         * @type          Function
         * @async
         *
         * This method allows you to emit a notification using the specified adapters in the settings.
         * You can override the settings by passing a new ISNotificationSettings argument that will
         * be used only for this notify process.
         *
         * @param     {ISNotificationObj}       notificationObj       The notification object you want to emit
         * @param     {Partial<ISNotificationSettings>}     [settings={}]     Some settings you want to override for this particular notification emition
         * @return    {Promise}                                    A promise that will be resolved once the notification has been emited
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SNotification.prototype.notify = function (notificationObj, settings) {
            var _this = this;
            return new s_promise_1.default(function (_a) {
                var resolve = _a.resolve, reject = _a.reject, pipeFrom = _a.pipeFrom;
                return __awaiter(_this, void 0, void 0, function () {
                    var set, notificationDefaultSettings, baseNotificationObj;
                    var _this = this;
                    return __generator(this, function (_b) {
                        set = (deepMerge_1.default(this.notificationSettings, settings));
                        // check if this instance is enabled
                        if (!set.enable)
                            return [2 /*return*/, resolve()];
                        notificationDefaultSettings = sugar_1.default('notification');
                        baseNotificationObj = __assign({}, (notificationObj.type
                            ? notificationDefaultSettings.types[notificationObj.type || 'default'] || {}
                            : {}));
                        // handle tokens
                        if (baseNotificationObj.message && notificationObj.message) {
                            notificationObj.message = baseNotificationObj.message.replace('[message]', notificationObj.message);
                        }
                        else if (!notificationObj.message)
                            baseNotificationObj.message = ' ';
                        if (baseNotificationObj.title && notificationObj.title) {
                            notificationObj.title = baseNotificationObj.title.replace('[title]', notificationObj.title);
                        }
                        else if (!notificationObj.title)
                            baseNotificationObj.title = ' ';
                        // loop on each adapters
                        set.adapters.forEach(function (adapterId) { return __awaiter(_this, void 0, void 0, function () {
                            var adapter, adapterSettings, adapterPromise;
                            return __generator(this, function (_a) {
                                adapter = SNotification.getAdapter(adapterId);
                                adapterSettings = this.notificationSettings.adaptersSettings[adapterId] || {};
                                adapterPromise = adapter.notify(__assign(__assign({}, baseNotificationObj), notificationObj), adapterSettings);
                                pipeFrom(adapterPromise);
                                return [2 /*return*/];
                            });
                        }); });
                        // resolve the notification process
                        resolve(true);
                        return [2 /*return*/];
                    });
                });
            });
        };
        SNotification.interfaces = {
            settings: {
                apply: true,
                on: '_settings.notification',
                class: SNotificationSettingsInterface_1.default
            }
        };
        /**
         * @name            _registeredAdapters
         * @type            Object<ISNotificationAdapter>
         * @static
         * @private
         *
         * Store all the registered adapters
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SNotification._registeredAdapters = {};
        return SNotification;
    }(SClass_1.default));
    exports.default = SNotification;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NOb3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvbm90aWZpY2F0aW9uL19TTm90aWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsc0VBQWlEO0lBQ2pELGtFQUFvRDtJQUNwRCwyREFBdUM7SUFDdkMsa0VBQThDO0lBQzlDLDhHQUEwRjtJQW1EMUY7UUFBNEIsaUNBQVE7UUFnRmxDOzs7Ozs7Ozs7V0FTRztRQUNILHVCQUFZLFFBQTBDO21CQUNwRCxrQkFDRSxtQkFBVyxDQUNUO2dCQUNFLFlBQVksRUFBRSxFQUFFO2FBQ2pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGO1FBQ0gsQ0FBQztRQTdFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSSw2QkFBZSxHQUF0QixVQUF1QixPQUE4QjtZQUNuRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkJBQTBCLE9BQU8sQ0FBQyxFQUFFLDRFQUF3RSxDQUM3RyxDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNqRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0ksd0JBQVUsR0FBakIsVUFBa0IsU0FBaUI7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDeEMsTUFBTSxJQUFJLEtBQUssQ0FDYiw2QkFBMEIsU0FBUyx3RUFBb0UsQ0FDeEcsQ0FBQzthQUNIO1lBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFD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