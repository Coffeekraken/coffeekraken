const __SInterface = require('../../class/SInterface');
const __SProcessInterface = require('../../process/SProcess');

/**
 * @name                SCliInterface
 * @namespace           node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput ```log``` method.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCliInterface extends __SInterface {
  static definitionObj = {
    interface: {
      type: 'SInterface',
      required: true,
      static: true
    },
    processClass: {
      type: 'SProcess',
      required: true,
      static: true
    },
    // definitionObj: {
    //   type: 'Object',
    //   required: true,
    //   static: true
    // },
    command: {
      type: 'String',
      required: true,
      static: true
    }
  };
};
