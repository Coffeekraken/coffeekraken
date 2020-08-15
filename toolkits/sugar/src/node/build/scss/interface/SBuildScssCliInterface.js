const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');

/**
 * @name                SBuildScssCliInterface
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
module.exports = class SBuildScssCliInterface extends __SInterface {
  static definitionObj = {
    input: {
      type: 'String',
      alias: 'i',
      description: 'Input files glob pattern',
      default: __sugarConfig('build.scss.input'),
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.scss.outputDir'),
      level: 1
    },
    watch: {
      type: 'String|Object',
      alias: 'w',
      description: 'Watch files glob pattern or settings object',
      default: __sugarConfig('build.scss.watch'),
      level: 1
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
      type: 'Boolean',
      alias: 'p',
      description: 'Generate the production ready files',
      default: __sugarConfig('build.scss.prod') || false,
      level: 1
    },
    sugarJsonDirs: {
      type: 'String|Array<String>',
      alias: 'a',
      description: 'Specify the directory where to search for sugar.json files',
      default: __sugarConfig('core.sugarJsonDirs'),
      level: 1
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
  };
};
