import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SPostcssCompilerInterface
 * @namespace           sugar.node.css.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SJsCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SPostcssCompilerInterface extends __SInterface {
  static definition = {
    input: {
      type: 'Array<String>',
      path: {
        absolute: true,
        glob: 'resolve'
      },
      default: __sugarConfig('css.compile.input'),
      alias: 'i'
    },
    inDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      default: __sugarConfig('css.compile.inDir'),
      alias: 'o'
    },
    outDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true,
        create: true
      },
      default: __sugarConfig('css.compile.outDir'),
      alias: 'o'
    },
    rootDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      alias: 'r',
      default: __sugarConfig('css.compile.rootDir')
    },
    bundle: {
      type: 'Boolean',
      alias: 'b',
      default: __sugarConfig('css.compile.bundle')
    },
    bundleSuffix: {
      type: 'String',
      default: __sugarConfig('css.compile.bundleSuffix')
    },
    map: {
      type: 'Boolean|String',
      alias: 'm',
      values: [true, false, 'inline'],
      description:
        'Generate the sourcemap. If "true", generate a .map file alongside the dist one, if "inline", set the sourcemap inline',
      default: __sugarConfig('css.compile.map') || true,
      level: 1
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      default: __sugarConfig('css.compile.prod')
    },
    minify: {
      type: 'Boolean',
      default: __sugarConfig('css.compile.minify')
    },
    banner: {
      type: 'String',
      description:
        'Specify a banner (usually a comment) that you want to put on top of your generated code',
      default: __sugarConfig('css.compile.banner')
    },
    save: {
      type: 'Boolean',
      default: __sugarConfig('css.compile.save')
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: __sugarConfig('css.compile.watch')
    },
    postcss: {
      type: 'Object',
      description: 'Object passed to the postcss compiler',
      default: __sugarConfig('css.compile.postcss') || {},
      level: 2
    }
  };
}

export default SPostcssCompilerInterface;
