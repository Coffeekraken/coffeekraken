import __SInterface from '../../interface/SInterface';

import SFileWatchSettingsInterface from './SFileWatchSettingsInterface';
import SFileWriteSettingsInterface from './SFileWriteSettingsInterface';
import SFileReadSettingsInterface from './SFileReadSettingsInterface';

/**
 * @name          SFileSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Settings infertage
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFileSettingsInterface extends __SInterface {
  static definition = {
    checkExistence: {
      type: 'Boolean',
      required: true,
      default: true
    },
    cwd: {
      type: 'String',
      required: true,
      default: process.cwd()
    },
    shrinkSizesTo: {
      type: 'Integer',
      required: true,
      default: 4
    },
    watch: {
      interface: SFileWatchSettingsInterface,
      type: 'Boolean|Object',
      required: true
    },
    writeSettings: {
      interface: SFileWriteSettingsInterface.override({
        path: {
          required: false
        }
      }),
      type: 'Object',
      required: true
    },
    readSettings: {
      interface: SFileReadSettingsInterface,
      type: 'Object',
      required: true
    }
  };
}
