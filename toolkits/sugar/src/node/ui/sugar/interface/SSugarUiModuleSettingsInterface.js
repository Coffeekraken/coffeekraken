const __SInterface = require('../../../class/SInterface');
/**
 * @name                SSugarUiModuleSettingsInterface
 * @namespace           node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the base Sugar UI module settings object
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarUiModuleSettingsInterface extends __SInterface {
  static definitionObj = {
    id: {
      type: 'String',
      description:
        'A simple one word id that will be used to identify this module',
      required: true
    },
    name: {
      type: 'String',
      description: 'The module name like "Build SCSS", etc...',
      required: true
    }
  };
};
