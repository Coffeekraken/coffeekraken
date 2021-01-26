import __SInterface from '../../../interface/SInterface';
import __sugarConfig from '../../../config/sugar';

/**
 * @name                SSvelteCompilerParamsInterface
 * @namespace           sugar.node.svelte.compile.interface
 * @type                Class
 * @extends             SInterface
 * @wip
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
      type: 'String|Array<String>',
      default: __sugarConfig('svelte.compile.input'),
      alias: 'i'
    },
    outputDir: {
      type: 'String',
      default: __sugarConfig('svelte.compile.outputDir'),
      alias: 'o'
    },
    rootDir: {
      type: 'String',
      default: __sugarConfig('svelte.compile.rootDir')
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('svelte.compile.map') || true,
      level: 1
    },
    prod: {
      type: 'Boolean',
      default: __sugarConfig('svelte.compile.prod')
    },
    stripComments: {
      type: 'Boolean',
      default: __sugarConfig('svelte.compile.stripComments')
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
      default: __sugarConfig('svelte.compile.watch')
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
