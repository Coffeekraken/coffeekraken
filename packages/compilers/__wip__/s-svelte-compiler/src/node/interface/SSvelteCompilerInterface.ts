import __SugarConfig from '@coffeekraken/s-sugar-config';
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
      default: __SugarConfig.get('svelte.compile.input'),
      alias: 'i'
    },
    inDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      default: __SugarConfig.get('svelte.compile.inDir')
    },
    outDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true,
        create: true
      },
      default: __SugarConfig.get('svelte.compile.outDir'),
      alias: 'o'
    },
    rootDir: {
      type: 'String',
      path: {
        absolute: true,
        exists: true
      },
      default: __SugarConfig.get('svelte.compile.rootDir')
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __SugarConfig.get('svelte.compile.map') ?? true,
      level: 1
    },
    prod: {
      type: 'Boolean',
      default: __SugarConfig.get('svelte.compile.prod')
    },
    minify: {
      type: 'Boolean',
      default: __SugarConfig.get('svelte.compile.minify')
    },
    banner: {
      type: 'String',
      description:
        'Specify a banner (usually a comment) that you want to put on top of your generated code',
      default: __SugarConfig.get('svelte.compile.banner')
    },
    save: {
      type: 'Boolean',
      default: __SugarConfig.get('svelte.compile.save')
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: __SugarConfig.get('svelte.compile.watch')
    },
    tsconfig: {
      type: 'String|Object',
      description:
        'Specify either directly a tsconfig object or a tsconfig valid path',
      default: __SugarConfig.get('svelte.compile.tsconfig')
    },
    svelte: {
      type: 'Object',
      description: 'Object passed to the svelte compiler',
      default: __SugarConfig.get('svelte.compile.svelte') || {},
      level: 2
    }
  };
}

export default SSvelteCompilerParamsInterface;
