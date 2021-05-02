import __sugarConfig from '@coffeekraken/s-sugar-config';
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
      type: 'Array<String>',
      path: {
        absolute: true,
        glob: 'resolve'
      },
      default: __sugarConfig('js.compile.input'),
      alias: 'i'
    },
    inDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      default: __sugarConfig('js.compile.inDir'),
      alias: 'o'
    },
    outDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true,
        create: true
      },
      default: __sugarConfig('js.compile.outDir'),
      alias: 'o'
    },
    rootDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      alias: 'r',
      default: __sugarConfig('js.compile.rootDir')
    },
    format: {
      type: 'String',
      alias: 'f',
      values: ['iife', 'cjs', 'esm'],
      default: __sugarConfig('js.compile.format')
    },
    platform: {
      type: 'String',
      alias: 'p',
      values: ['node', 'browser'],
      default: __sugarConfig('js.compile.platform')
    },
    bundle: {
      type: 'Boolean',
      alias: 'b',
      default: __sugarConfig('js.compile.bundle')
    },
    bundleSuffix: {
      type: 'String',
      default: __sugarConfig('js.compile.bundleSuffix')
    },
    // tsconfig: {
    //   type: 'String',
    //   description:
    //     'Specify which tsconfig file you want to use when compiling ts files. Can be either a path to a valid tsconfig file, or a ts stack name like "node", "js" or "shared".',
    //   alias: 't',
    //   default: __sugarConfig('js.compile.tsconfig')
    // },
    map: {
      type: 'Boolean|String',
      alias: 'm',
      values: [true, false, 'inline'],
      description:
        'Generate the sourcemap. If "true", generate a .map file alongside the dist one, if "inline", set the sourcemap inline',
      default: __sugarConfig('js.compile.map') || true,
      level: 1
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      default: __sugarConfig('js.compile.prod')
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
    esbuild: {
      type: 'Object',
      description: 'Object passed to the esbuild compiler',
      default: __sugarConfig('js.compile.esbuild') || {},
      level: 2
    }
  };
}

export default SJsCompilerInterface;
