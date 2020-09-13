const __SInterface = require('../../../class/SInterface');

/**
 * @name                STermAppInterface
 * @namespace           node.termapp.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a terminal app process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STermAppInterface extends __SInterface {
  static definitionObj = {
    name: {
      type: 'String',
      alias: 'n',
      description: 'STerm application name',
      default: 'sugarapp',
      level: 1
    }
  };
};
