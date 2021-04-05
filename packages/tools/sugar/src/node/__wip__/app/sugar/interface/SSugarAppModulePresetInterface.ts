// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSugarAppModulePresetInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe a sugar ui module object
 * structure and requirements
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppModulePresetInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      description: 'The preset name',
      required: true
    },
    description: {
      type: 'String',
      description: 'The preset description'
    },
    params: {
      type: 'Object',
      description:
        'An object of parameters that will be used in your module class instance',
      required: true,
      default: {}
    },
    settings: {
      type: 'Object',
      description:
        'An object of settings that will be used in your modules class instance',
      required: true,
      default: {}
    }
  };
}
SSugarAppModulePresetInterface.makeAvailableAsType();
export default SSugarAppModulePresetInterface;
