const __SInterface = require('../../class/SInterface');
const __SOutputProcessInterface = require('./SOutputProcessInterface');
const __SProcessInterface = require('../../process/interface/SProcessInterface');
const SOutputLogInterface = require('./SOutputLogInterface');

/**
 * @name                SAppCommandInterface
 * @namespace           node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element used as a command in an SCommandPanel instance.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SAppCommandInterface extends __SInterface {
  static definitionObj = {
    ...__SOutputProcessInterface.definitionObj,
    process: {
      type: 'Object',
      required: true,
      definitionObj: __SProcessInterface.definitionObj
    }
  };

  static title = 'SApp Command Interface';
  static description =
    'This interface represent the minimum requirements that MUST have the instances passed in an SApp based application';
};
