const __SInterface = require('../../../class/SInterface');
const __SBuildInterface = require('../../interface/SBuildInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');

/**
 * @name                SBuildJsCliInterface
 * @namespace           sugar.node.build.js.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildJsCliInterface extends __SInterface {
  static definitionObj = __deepMerge(__SBuildInterface.definitionObj, {
    input: {
      default: __sugarConfig('build.js.input')
    },
    outputDir: {
      default: __sugarConfig('build.js.outputDir')
    },
    watch: {
      default: __sugarConfig('build.js.watch')
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('build.js.map') || true,
      level: 1
    },
    pack: {
      type: 'Boolean',
      alias: 'p',
      description: 'Pack the files using webpack or just pass babel on them',
      default: __sugarConfig('build.js.pack') || true,
      level: 1
    },
    prod: {
      default: __sugarConfig('build.js.prod') || false
    },
    buildType: {
      default: 'js'
    }
  });
};
