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
    prod: {
      type: 'Boolean',
      alias: 'p',
      description: 'Generate the production ready files',
      default: false,
      level: 1
    },
    frontspec: {
      type: 'Boolean|Object',
      description:
        'Specify if you want to use the frontspec files to import automatically some "init" code from modules',
      default: __sugarConfig('build.frontspec'),
      level: 1
    }
  };
};
