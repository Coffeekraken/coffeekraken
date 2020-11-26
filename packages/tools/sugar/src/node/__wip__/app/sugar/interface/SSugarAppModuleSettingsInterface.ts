// @ts-nocheck

const __SInterface = require('../../../class/SInterface');
/**
 * @name                SSugarAppModuleSettingsInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the base Sugar UI module settings object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarAppModuleSettingsInterface extends __SInterface {
  static definition = {
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
