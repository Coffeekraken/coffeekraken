const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');

/**
 * @name                SBuildJsCliInterface
 * @namespace           node.build.js.interface
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
  static definitionObj = {
    input: {
      type: 'String',
      alias: 'i',
      description: 'Input files glob pattern',
      default: __sugarConfig('build.js.input'),
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.js.outputDir'),
      level: 1
    },
    watch: {
      type: 'String|Object',
      alias: 'w',
      description: 'Watch files glob pattern or settings object',
      default: __sugarConfig('build.js.watch'),
      level: 1
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
      type: 'Boolean',
      alias: 'p',
      description: 'Generate the production ready files',
      default: __sugarConfig('build.js.prod') || false,
      level: 1
    }
  };
};
