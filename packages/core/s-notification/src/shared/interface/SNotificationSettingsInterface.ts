import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name            SNotificationSettingsInterface
 * @namespace       sugar.js.notification.interface
 * @type            Class
 * @extends         SInterface
 *
 * Interface that describe the settings object you can pass to the SNofication constructor
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SNotificationSettingsInterface extends __SInterface {
  static definition = {
    adapters: {
      type: 'Array<String>',
      required: true,
      default: __SugarConfig.get('notification.adapters')
    },
    adaptersSettings: {
      type: 'Object',
      required: true,
      default: __SugarConfig.get('notification.adaptersSettings')
    },
    enable: {
      type: 'Boolean',
      required: true,
      default: __SugarConfig.get('notification.enable')
    },
    types: {
      type: 'Object',
      required: true,
      default: __SugarConfig.get('notification.types')
    }
  };
}
export default SNotificationSettingsInterface;
