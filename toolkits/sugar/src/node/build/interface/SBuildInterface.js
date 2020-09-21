const __SInterface = require('../../class/SInterface');
const __sugarConfig = require('../../config/sugar');

/**
 * @name                SBuildInterface
 * @namespace           sugar.node.build.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a build process/cli, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildInterface extends __SInterface {
  static definitionObj = {
    input: {
      type: 'String',
      alias: 'i',
      description: 'Input files glob pattern',
      required: false,
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      required: true,
      level: 1
    },
    watch: {
      type: 'String|Object',
      alias: 'w',
      description: 'Watch files glob pattern or settings object',
      level: 1
    },
    buildType: {
      type: 'String',
      alias: 't',
      description:
        'Define the build type between "css", "js", and others to come',
      required: true,
      level: 1
    },
    buildLevel: {
      type: 'String',
      alias: 'l',
      description:
        'Define the build level between "bare", "style" and "default"',
      required: true,
      default: 'default',
      level: 1
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      description: 'Generate the production ready files',
      default: false,
      level: 1
    },
    sugarJsonDirs: {
      type: 'String|Array<String>',
      description: 'Specify the directory where to search for sugar.json files',
      default: __sugarConfig('core.sugarJson.dirs'),
      level: 1
    },
    sugarJsonImports: {
      type: 'String|Array<String>',
      description:
        'Specify what you want to import. Can be "all" or an Array of NPM packages names',
      default: __sugarConfig('core.sugarJson.imports'),
      level: 1
    },
    sugarJsonExclude: {
      type: 'Array<String>',
      description:
        'Specify some NPM packages you want to exclude by adding his name into this array',
      default: __sugarConfig('core.sugarJson.exclude'),
      level: 1
    }
  };
};
