import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSvelteCompilerParamsInterface
 * @namespace           sugar.node.svelte.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SSvelteCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompilerParamsInterface extends __SInterface {
  static definition = {
    input: {
      type: 'Array<String>',
      path: {
        absolute: true,
        glob: 'resolve'
      },
      default: __sugarConfig('svelte.compile.input'),
      alias: 'i'
    },
    inDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      default: __sugarConfig('svelte.compile.inDir')
    },
    outDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      default: __sugarConfig('svelte.compile.outDir'),
      alias: 'o'
    },
    rootDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      default: __sugarConfig('svelte.compile.rootDir')
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('svelte.compile.map') ?? true,
      level: 1
    },
    prod: {
      type: 'Boolean',
      default: __sugarConfig('svelte.compile.prod')
    },
    minify: {
      type: 'Boolean',
      default: __sugarConfig('svelte.compile.minify')
    },
    banner: {
      type: 'String',
      description:
        'Specify a banner (usually a comment) that you want to put on top of your generated code',
      default: __sugarConfig('svelte.compile.banner')
    },
    save: {
      type: 'Boolean',
      default: __sugarConfig('svelte.compile.save')
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: __sugarConfig('svelte.compile.watch')
    },
    tsconfig: {
      type: 'String|Object',
      description:
        'Specify either directly a tsconfig object or a tsconfig valid path',
      default: __sugarConfig('svelte.compile.tsconfig')
    },
    svelte: {
      type: 'Object',
      description: 'Object passed to the svelte compiler',
      default: __sugarConfig('svelte.compile.svelte') || {},
      level: 2
    }
  };
}

export default SSvelteCompilerParamsInterface;
