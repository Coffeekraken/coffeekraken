import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SJsCompilerInterface
 * @namespace           sugar.node.js.compile.interface
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
class SJsCompilerInterface extends __SInterface {
  static definition = {
    input: {
      type: 'String|Array<String>',
      default: __sugarConfig('js.compile.input'),
      alias: 'i'
    },
    outputDir: {
      type: 'String',
      default: __sugarConfig('js.compile.outputDir'),
      alias: 'o'
    },
    rootDir: {
      type: 'String',
      alias: 'r',
      default: __sugarConfig('js.compile.rootDir')
    },
    format: {
      type: 'String',
      alias: 'f',
      values: ['iife', 'cjs', 'esm'],
      default: __sugarConfig('js.compile.format')
    },
    bundle: {
      type: 'Boolean',
      alias: 'b',
      default: __sugarConfig('js.compile.bundle')
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('js.compile.map') || true,
      level: 1
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      default: __sugarConfig('js.compile.prod')
    },
    stripComments: {
      type: 'Boolean',
      default: __sugarConfig('js.compile.stripComments')
    },
    minify: {
      type: 'Boolean',
      default: __sugarConfig('js.compile.minify')
    },
    banner: {
      type: 'String',
      description:
        'Specify a banner (usually a comment) that you want to put on top of your generated code',
      default: __sugarConfig('js.compile.banner')
    },
    save: {
      type: 'Boolean',
      default: __sugarConfig('js.compile.save')
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: __sugarConfig('js.compile.watch')
    },
    serve: {
      type: 'Boolean',
      default: __sugarConfig('js.compile.serve')
    },
    host: {
      type: 'String',
      default: __sugarConfig('js.compile.host')
    },
    port: {
      type: 'Integer',
      default: __sugarConfig('js.compile.port')
    },
    esbuild: {
      type: 'Object',
      description: 'Object passed to the esbuild compiler',
      default: __sugarConfig('js.compile.esbuild') || {},
      level: 2
    }
  };
}

export default SJsCompilerInterface;
