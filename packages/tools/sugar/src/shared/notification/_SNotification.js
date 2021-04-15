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
        define(["require", "exports", "@coffeekraken/s-promise", "../config/sugar", "@coffeekraken/s-class", "../object/deepMerge", "./interface/SNotificationSettingsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const sugar_1 = __importDefault(require("../config/sugar"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
                const notificationDefaultSettings = sugar_1.default('notification');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NOb3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfU05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHdFQUFpRDtJQUNqRCw0REFBNEM7SUFDNUMsb0VBQTZDO0lBQzdDLG9FQUE4QztJQUM5QyxnSEFBMEY7SUFtRDFGLE1BQU0sYUFBYyxTQUFRLGlCQUFRO1FBZ0ZsQzs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFFBQTBDO1lBQ3BELEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLFlBQVksRUFBRSxFQUFFO2FBQ2pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFDSixDQUFDO1FBN0VEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBOEI7WUFDbkQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN4QyxNQUFNLElBQUksS0FBSyxDQUNiLDBCQUEwQixPQUFPLENBQUMsRUFBRSx3RUFBd0UsQ0FDN0csQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDakQsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBaUI7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDeEMsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQkFBMEIsU0FBUyxvRUFBb0UsQ0FDeEcsQ0FBQzthQUNIO1lBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksb0JBQW9CO1lBQ3RCLE9BQWEsSUFBSSxDQUFDLFNB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