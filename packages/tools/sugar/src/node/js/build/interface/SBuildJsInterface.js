const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');

/**
 * @name                SBuildJsCliInterface
 * @namespace           sugar.node.js.interface
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
      default: __sugarConfig('build.js.input')
    },
    outputDir: {
      type: 'String',
      default: __sugarConfig('build.js.outputDir')
    },
    rootDir: {
      type: 'String',
      default: __sugarConfig('build.js.rootDir')
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('build.js.map'),
      level: 1
    },
    bundle: {
      type: 'Boolean',
      alias: 'b',
      description:
        'Pack the files into a final one or just process the passed file',
      default: __sugarConfig('build.js.bundle'),
      level: 1
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      description:
        'Specify the compiler that you want a "production" ready output',
      default: __sugarConfig('build.js.prod')
    },
    format: {
      type: 'String',
      values: ['iife', 'cjs', 'esm'],
      alias: 'f',
      description: 'Specify the format you want as output',
      default: __sugarConfig('build.js.format')
    },
    inject: {
      type: 'Array<String>',
      alias: 'i',
      description:
        'Specify some files to inject in each processed files. Usefull for shiming, etc...',
      default: __sugarConfig('build.js.inject')
    },
    loader: {
      type: 'Object',
      alias: 'l',
      description:
        'Specify some loader to use for specifiy extensions. Object format ```{".ext": "loader"}```',
      default: __sugarConfig('build.js.loader')
    },
    minify: {
      type: 'Boolean',
      alias: 'm',
      description:
        'Specify if you want to minify the output generated code or not',
      default: __sugarConfig('build.js.minify')
    },
    platform: {
      type: 'String',
      values: ['browser', 'node'],
      description: 'Specify the platform you want to build the code for',
      default: __sugarConfig('build.js.platform')
    },
    target: {
      type: 'Array<String>',
      description:
        'Specify the target(s) you want. Can be es2020, chrome{version}, firefox{version}, safari{version}, edge{version} or node{version}',
      default: __sugarConfig('build.js.target')
    },
    banner: {
      type: 'String',
      description:
        'Specify a banner (usually a comment) that you want to put on top of your generated code',
      default: __sugarConfig('build.js.banner')
    },
    mainFields: {
      type: 'Array<String>',
      description:
        'Specify the list of package.json properties you want the compiler to use to resolve dependencies. The order MATHER',
      default: __sugarConfig('build.js.mainFields')
    }
  };
};
