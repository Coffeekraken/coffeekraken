// @ts-nocheck

import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';

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
export class SSvelteCompilerParamsInterface extends __SInterface {
  static definition = {
    input: {
      type: 'String|Array<String>',
      default: __sugarConfig('scss.compile.input'),
      alias: 'i'
    },
    outputDir: {
      type: 'String',
      default: __sugarConfig('scss.compile.outputDir'),
      alias: 'o'
    },
    rootDir: {
      type: 'String',
      default: __sugarConfig('scss.compile.rootDir')
    },
    save: {
      type: 'Boolean',
      default: false
    },
    watch: {
      type: 'Boolean',
      default: false
    },
    compileOnChange: {
      type: 'Boolean',
      default: true
    },
    style: {
      type: 'String',
      alias: 's',
      description: 'Output style (nested,expanded,compact,compressed)',
      default: __sugarConfig('scss.compile.style') || 'expanded',
      level: 1
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('scss.compile.map') || true,
      level: 1
    },
    cache: {
      type: 'Boolean',
      default: __sugarConfig('scss.compile.cache')
    },
    clearCache: {
      type: 'Boolean',
      default: __sugarConfig('scss.compile.clearCache')
    },
    stripComments: {
      type: 'Boolean',
      default: __sugarConfig('scss.compile.stripComments')
    },
    minify: {
      type: 'Boolean',
      default: __sugarConfig('scss.compile.minify')
    },
    prod: {
      type: 'Boolean',
      default: __sugarConfig('scss.compile.prod')
    },
    sharedResources: {
      type: 'String|Array<String>',
      alias: 'r',
      description:
        'Specify some files to load in every imported files using @use or @import',
      default: __sugarConfig('scss.compile.sharedResources'),
      level: 1
    },
    banner: {
      type: 'String',
      description:
        'Specify a banner (usually a comment) that you want to put on top of your generated code',
      default: __sugarConfig('scss.compile.banner')
    },
    sass: {
      type: 'Object',
      description: 'Object passed to the sass compiler',
      default: __sugarConfig('scss.compile.sass') || {},
      level: 2
    }
  };
}

export interface ISSvelteCompilerParams {
  watch: boolean;
  outputDir: string;
  rootDir: string;
  save: boolean;
  cache: boolean;
  clearCache: boolean;
  svelte: any;
  map: boolean;
  compileOnChange: boolean;
}
export interface ISScssCompilerOptionalParams {
  watch?: boolean;
  outputDir?: string;
  rootDir?: string;
  save?: boolean;
  cache?: boolean;
  clearCache?: boolean;
  svelte?: any;
  map?: boolean;
  compileOnChange?: boolean;
}
