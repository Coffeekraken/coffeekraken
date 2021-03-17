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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NOb3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfU05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHNFQUFpRDtJQUNqRCxrRUFBb0Q7SUFDcEQsMkRBQXVDO0lBQ3ZDLGtFQUE4QztJQUM5Qyw4R0FBMEY7SUFtRDFGO1FBQTRCLGlDQUFRO1FBZ0ZsQzs7Ozs7Ozs7O1dBU0c7UUFDSCx1QkFBWSxRQUEwQzttQkFDcEQsa0JBQ0UsbUJBQVcsQ0FDVDtnQkFDRSxZQUFZLEVBQUUsRUFBRTthQUNqQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRjtRQUNILENBQUM7UUE3RUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0ksNkJBQWUsR0FBdEIsVUFBdUIsT0FBOEI7WUFDbkQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN4QyxNQUFNLElBQUksS0FBSyxDQUNiLDZCQUEwQixPQUFPLENBQUMsRUFBRSw0RUFBd0UsQ0FDN0csQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDakQsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNJLHdCQUFVLEdBQWpCLFVBQWtCLFNBQWlCO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkJBQTBCLFNBQVMsd0VBQW9FLENBQ3hHLENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFZRCxzQkFBSSwrQ0FB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