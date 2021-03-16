// @shared

import __deepMerge from '../object/deepMerge';
import __SClass from '../class/SClass';
import __isNode from '../is/node';
import __sugarConfig from '../../node/config/sugar';
import __SPromise, { ISPromise } from '@coffeekraken/s-promise';

import __SNotificationSettingsInterface from './interface/SNotificationSettingsInterface';

/**
 * @name                SNotification
 * @namespace           sugar.js.notification
 * @type                Class
 * @extends             SClass
 * @status              alpha
 *
 * This class represent a simple notification system that can handle multiple notifications
 * adapters like "node", "console" and more to come if needed
 *
 * @param       {ISNotificationSettings}            [settings={}]           Specify some settings to configure your notification instance
 *
 * @todo        doc
 *
 * @example         js
 * import SNotification from '@coffeekraken/sugar/js/notification/SNotification';
 * const notif = new SNotification();
 * notif.notify({
 *      title: 'Hello world',
 *      message: 'Something cool'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISNotificationSettings {
  enable: boolean;
  adapters: string[];
  adaptersSettings: Record<string, any>;
  types: Record<string, any>;
}

export interface ISNotificationObj {
  type?: 'success' | 'error' | 'warning' | 'kill' | 'default' | undefined;
  title?: string;
  message?: string;
  icon?: string;
  [key: string]: any;
}

export interface ISNotificationAdapter {
  id: string;
  name: string;
  notify(notificationObj: ISNotificationObj, settings?: any): Promise<any>;
}

export interface ISNotification {}

class SNotification extends __SClass implements ISNotification {
  static interfaces = {
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
  static _registeredAdapters: Record<string, ISNotificationAdapter> = {};

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
  static registerAdapter(adapter: ISNotificationAdapter) {
    if (this._registeredAdapters[adapter.id]) {
      throw new Error(
        `Sorry but the "<yellow>${adapter.id}</yellow>" SNotification adapter you try to register already exists...`
      );
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
  static getAdapter(adapterId: string) {
    if (!this._registeredAdapters[adapterId]) {
      throw new Error(
        `Sorry but the "<yellow>${adapterId}</yellow>" SNotification adapter you try to get does not exists...`
      );
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
  get notificationSettings(): ISNotificationSettings {
    return (<any>this._settings).notification;
  }

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
  constructor(settings?: Partial<ISNotificationSettings>) {
    super(
      __deepMerge(
        {
          notification: {}
        },
        settings || {}
      )
    );
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
  notify(
    notificationObj: Partial<ISNotificationObj>,
    settings?: Partial<ISNotificationSettings>
  ): Promise<any> {
    return new __SPromise(async ({ resolve, reject, pipeFrom }) => {
      // mix settings
      const set = <ISNotificationSettings>(
        __deepMerge(this.notificationSettings, settings)
      );

      // check if this instance is enabled
      if (!set.enable) return resolve();

      const notificationDefaultSettings = __sugarConfig('notification');

      let baseNotificationObj: Partial<ISNotificationObj> = {
        ...(notificationObj.type
          ? notificationDefaultSettings.types[
              notificationObj.type || 'default'
            ] || {}
          : {})
      };

      // handle tokens
      if (baseNotificationObj.message && notificationObj.message) {
        notificationObj.message = baseNotificationObj.message.replace(
          '[message]',
          notificationObj.message
        );
      } else if (!notificationObj.message) baseNotificationObj.message = ' ';
      if (baseNotificationObj.title && notificationObj.title) {
        notificationObj.title = baseNotificationObj.title.replace(
          '[title]',
          notificationObj.title
        );
      } else if (!notificationObj.title) baseNotificationObj.title = ' ';

      // loop on each adapters
      set.adapters.forEach(async (adapterId) => {
        // get the adapter
        const adapter = SNotification.getAdapter(adapterId);

        // get the adapter settings if exists
        const adapterSettings: any =
          this.notificationSettings.adaptersSettings[adapterId] || {};
        // call the notify adapter function
        const adapterPromise = adapter.notify(
          {
            ...baseNotificationObj,
            ...notificationObj
          },
          adapterSettings
        );
        pipeFrom(adapterPromise);
      });

      // resolve the notification process
      resolve(true);
    });
  }
}

export default SNotification;
