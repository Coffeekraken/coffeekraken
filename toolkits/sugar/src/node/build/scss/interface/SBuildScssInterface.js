const __SInterface = require('../../../class/SInterface');
const __SBuildInterface = require('../../interface/SBuildInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');

/**
 * @name                SBuildScssInterface
 * @namespace           node.build.scss.interface
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
  static definitionObj = __deepMerge(__SBuildInterface.definitionObj, {
    input: {
      default: __sugarConfig('build.scss.input')
    },
    outputDir: {
      default: __sugarConfig('build.scss.outputDir')
    },
    watch: {
      default: __sugarConfig('build.scss.watch')
    },
    style: {
      type: 'String',
      alias: 's',
      description: 'Output style (nested,expanded,compact,compressed)',
      default: __sugarConfig('build.scss.style') || 'expanded',
      level: 1
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('build.scss.map') || true,
      level: 1
    },
    prod: {
      default: __sugarConfig('build.scss.prod') || false
    },
    buildType: {
      default: 'css'
    },
    'import.sugar': {
      type: 'Boolean',
      description: 'Import the coffeekraken sugar toolkit',
      default: __sugarConfig('build.scss.import.sugar') || true,
      level: 1
    },
    'vendor.sass': {
      type: 'Object',
      description: 'Object passed to the sass compiler',
      default: __sugarConfig('build.scss.vendor.sass') || {},
      level: 2
    }
  });
};
