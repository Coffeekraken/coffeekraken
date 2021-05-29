var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SNotificationSettingsInterface from './interface/SNotificationSettingsInterface';
class SNotification extends __SClass {
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
        super(__deepMerge({
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
        return new __SPromise(({ resolve, reject, pipeFrom }) => __awaiter(this, void 0, void 0, function* () {
            // mix settings
            const set = (__deepMerge(this.notificationSettings, settings));
            // check if this instance is enabled
            if (!set.enable)
                return resolve();
            const notificationDefaultSettings = __SugarConfig.get('notification');
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
        class: __SNotificationSettingsInterface
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
export default SNotification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQW1EMUYsTUFBTSxhQUFjLFNBQVEsUUFBUTtJQWdGbEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEwQztRQUNwRCxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsWUFBWSxFQUFFLEVBQUU7U0FDakIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUE3RUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUE4QjtRQUNuRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQkFBMEIsT0FBTyxDQUFDLEVBQUUsd0VBQXdFLENBQzdHLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQWlCO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQkFBMEIsU0FBUyxvRUFBb0UsQ0FDeEcsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FB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