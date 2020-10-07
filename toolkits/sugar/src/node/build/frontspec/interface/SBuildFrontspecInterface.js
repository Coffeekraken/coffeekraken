const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');

/**
 * @name                SBuildScssInterface
 * @namespace           sugar.node.build.scss.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildScssInterface extends __SInterface {
  static definitionObj = {
    outputDir: {
      type: 'String',
      default: __sugarConfig('build.frontspecJson.outputDir'),
      required: true,
      alias: 'o',
      level: 1
    },
    filename: {
      type: 'String',
      default: __sugarConfig('build.frontspecJson.filename'),
      required: true,
      alias: 'n',
      level: 1
    },
    dirDepth: {
      type: 'Integer',
      default: __sugarConfig('build.frontspecJson.dirDepth'),
      required: true,
      alias: 'd',
      level: 1
    },
    cache: {
      type: 'Boolean',
      default: __sugarConfig('build.frontspecJson.cache'),
      alias: 'c',
      level: 1
    }
  };
};
