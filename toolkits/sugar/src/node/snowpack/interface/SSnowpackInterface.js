const __SInterface = require('../../class/SInterface');
const __path = require('path');

/**
 * @name                SSnowpackInterface
 * @namespace           sugar.node.snowpack.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a snowpack process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSnowpackInterface extends __SInterface {
  static definitionObj = {
    config: {
      type: 'String',
      required: true,
      default: __path.resolve(__dirname, '../../../../snowpack.config.js'),
      level: 1
    },
    reload: {
      type: 'Boolean',
      level: 1
    },
    clean: {
      type: 'Boolean',
      level: 1
    }
  };
};
