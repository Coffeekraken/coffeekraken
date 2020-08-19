const __SInterface = require('../../class/SInterface');

/**
 * @name                SProcessDeamonSettingInterface
 * @namespace           node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for the passed "deamon" setting in a process
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SProcessDeamonSettingInterface extends __SInterface {
  static definitionObj = {
    class: {
      type: 'Class',
      required: true,
      description: 'The SDeamon based class to use'
    }
  };
};
