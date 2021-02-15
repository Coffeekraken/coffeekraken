"use strict";
// @shared
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
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SClass_1 = __importDefault(require("../class/SClass"));
const sugar_1 = __importDefault(require("../config/sugar"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SNotificationSettingsInterface_1 = __importDefault(require("./interface/SNotificationSettingsInterface"));
class SNotification extends SClass_1.default {
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
        return new SPromise_1.default(({ resolve, reject, pipeFrom }) => __awaiter(this, void 0, void 0, function* () {
            // mix settings
            const set = (deepMerge_1.default(this.notificationSettings, settings));
            // check if this instance is enabled
            if (!set.enable)
                return resolve();
            const notificationDefaultSettings = sugar_1.default('notification');
            let baseNotificationObj = Object.assign({}, (notificationObj.type
                ? notificationDefaultSettings.types[notificationObj.type] || {}
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
            for (let i = 0; i < set.adapters.length; i++) {
                const adapterId = set.adapters[i];
                // get the adapter
                const adapter = SNotification.getAdapter(adapterId);
                // get the adapter settings if exists
                const adapterSettings = this.notificationSettings.adaptersSettings[adapterId] || {};
                // call the notify adapter function
                const adapterPromise = adapter.notify(Object.assign(Object.assign({}, baseNotificationObj), notificationObj), adapterSettings);
                pipeFrom(adapterPromise);
                yield adapterPromise;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NOb3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfU05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7QUFFVixvRUFBOEM7QUFDOUMsNkRBQXVDO0FBRXZDLDREQUE0QztBQUM1QyxtRUFBNEQ7QUFFNUQsZ0hBQTBGO0FBd0QxRixNQUFNLGFBQWMsU0FBUSxnQkFBUTtJQWdGbEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEwQztRQUNwRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFlBQVksRUFBRSxFQUFFO1NBQ2pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBN0VEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBOEI7UUFDbkQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMEJBQTBCLE9BQU8sQ0FBQyxFQUFFLHdFQUF3RSxDQUM3RyxDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFpQjtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMEJBQTBCLFNBQVMsb0VBQW9FLENBQ3hHLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLG9CQUFvQjtRQUN0QixPQUFhLElBQUksQ0FBQyxTQUFV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