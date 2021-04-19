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
        define(["require", "exports", "@coffeekraken/s-promise", "@coffeekraken/s-sugar/config", "@coffeekraken/s-class", "@coffeekraken/sugar/shared/object/deepMerge", "./interface/SNotificationSettingsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const config_1 = __importDefault(require("@coffeekraken/s-sugar/config"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const SNotificationSettingsInterface_1 = __importDefault(require("./interface/SNotificationSettingsInterface"));
    class SNotification extends s_class_1.default {
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
        constructor(settings) {
            super(deepMerge_1.default({
                notification: {}
            }, settings || {}));
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
        static registerAdapter(adapter) {
            if (this._registeredAdapters[adapter.id]) {
                throw new Error(`Sorry but the "<yellow>${adapter.id}</yellow>" SNotification adapter you try to register already exists...`);
            }
            this._registeredAdapters[adapter.id] = adapter;
        }
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
        static getAdapter(adapterId) {
            if (!this._registeredAdapters[adapterId]) {
                throw new Error(`Sorry but the "<yellow>${adapterId}</yellow>" SNotification adapter you try to get does not exists...`);
            }
            return this._registeredAdapters[adapterId];
        }
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
        get notificationSettings() {
            return this._settings.notification;
        }
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
        notify(notificationObj, settings) {
            return new s_promise_1.default(({ resolve, reject, pipeFrom }) => __awaiter(this, void 0, void 0, function* () {
                // mix settings
                const set = (deepMerge_1.default(this.notificationSettings, settings));
                // check if this instance is enabled
                if (!set.enable)
                    return resolve();
                const notificationDefaultSettings = config_1.default('notification');
                const baseNotificationObj = Object.assign({}, (notificationObj.type
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
                set.adapters.forEach((adapterId) => __awaiter(this, void 0, void 0, function* () {
                    // get the adapter
                    const adapter = SNotification.getAdapter(adapterId);
                    // get the adapter settings if exists
                    const adapterSettings = this.notificationSettings.adaptersSettings[adapterId] || {};
                    // call the notify adapter function
                    const adapterPromise = adapter.notify(Object.assign(Object.assign({}, baseNotificationObj), notificationObj), adapterSettings);
                    pipeFrom(adapterPromise);
                }));
                // resolve the notification process
                resolve(true);
            }));
        }
    }
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
    exports.default = SNotification;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx3RUFBaUQ7SUFDakQsMEVBQXlEO0lBQ3pELG9FQUE2QztJQUM3Qyw0RkFBc0U7SUFDdEUsZ0hBQTBGO0lBbUQxRixNQUFNLGFBQWMsU0FBUSxpQkFBUTtRQWdGbEM7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxRQUEwQztZQUNwRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxZQUFZLEVBQUUsRUFBRTthQUNqQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQTdFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQThCO1lBQ25ELElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDeEMsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQkFBMEIsT0FBTyxDQUFDLEVBQUUsd0VBQXdFLENBQzdHLENBQUM7YUFDSDtZQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2pELENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQWlCO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMEJBQTBCLFNBQVMsb0VBQW9FLENBQ3hHLENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLG9CQUFvQjtZQUN0QixPQUFhLElBQUksQ0FBQyxTQUFV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