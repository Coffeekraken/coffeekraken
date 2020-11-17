const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');

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
    input: {
      type: 'String',
      default: __sugarConfig('build.scss.input')
    },
    outputDir: {
      type: 'String',
      default: __sugarConfig('build.scss.outputDir')
    },
    rootDir: {
      type: 'String',
      default: __sugarConfig('build.scss.rootDir')
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
    cache: {
      type: 'Boolean',
      default: __sugarConfig('build.scss.cache')
    },
    clearCache: {
      type: 'Boolean',
      default: __sugarConfig('build.scss.clearCache')
    },
    stripComments: {
      type: 'Boolean',
      default: __sugarConfig('build.scss.stripComments')
    },
    minify: {
      type: 'Boolean',
      default: __sugarConfig('build.scss.minify')
    },
    prod: {
      type: 'Boolean',
      default: __sugarConfig('build.scss.prod')
    },
    sharedResources: {
      type: 'String|Array<String>',
      alias: 'r',
      description:
        'Specify some files to load in every imported files using @use or @import',
      default: __sugarConfig('build.scss.sharedResources'),
      level: 1
    },
    banner: {
      type: 'String',
      description:
        'Specify a banner (usually a comment) that you want to put on top of your generated code',
      default: __sugarConfig('build.scss.banner')
    },
    sass: {
      type: 'Object',
      description: 'Object passed to the sass compiler',
      default: __sugarConfig('build.scss.sass') || {},
      level: 2
    }
  };
};
