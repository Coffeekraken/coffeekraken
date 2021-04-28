"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
            const notificationDefaultSettings = s_sugar_config_1.default('notification');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1ub3RpZmljYXRpb24vc3JjL3NoYXJlZC9TTm90aWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELGtGQUF5RDtBQUN6RCxvRUFBNkM7QUFDN0MsNEZBQXNFO0FBQ3RFLGdIQUEwRjtBQW1EMUYsTUFBTSxhQUFjLFNBQVEsaUJBQVE7SUFnRmxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBMEM7UUFDcEQsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUUsRUFBRTtTQUNqQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQTdFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQThCO1FBQ25ELElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN4QyxNQUFNLElBQUksS0FBSyxDQUNiLDBCQUEwQixPQUFPLENBQUMsRUFBRSx3RUFBd0UsQ0FDN0csQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBaUI7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4QyxNQUFNLElBQUksS0FBSyxDQUNiLDBCQUEwQixTQUFTLG9FQUFvRSxDQUN4RyxDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7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