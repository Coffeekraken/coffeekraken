// @ts-nocheck

import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';
import __SCompiler, { ISCompiler } from '../../compiler/SCompiler';
import __SSvelteFile from '../SSvelteFile';

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

export interface ISSvelteCompilerCtorSettings {}

export interface ISSvelteCompilerParams {
  watch: boolean;
  outputDir: string;
  rootDir: string;
  save: boolean;
  map: boolean;
  svelte: any;
}
export interface ISSvelteCompilerOptionalParams {
  watch?: boolean;
  outputDir?: string;
  rootDir?: string;
  save?: boolean;
  map?: boolean;
  svelte?: any;
}

export interface ISSvelteCompiler extends ISCompiler {}

class SSvelteCompiler extends __SCompiler {
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   *
   */
  constructor(
    initialParams: ISSvelteCompilerOptionalParams,
    settings: ISSvelteCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          scssCompiler: {}
        },
        settings || {}
      )
    );

    // prod
    if (this.svelteCompilerSettings.prod) {
      this.svelteCompilerSettings.style = 'compressed';
      this.svelteCompilerSettings.minify = true;
      this.svelteCompilerSettings.stripComments = true;
    }
  }

  /**
   * @name              _compile
   * @type              Function
   * @async
   *
   * This method is the main one that allows you to actually compile the
   * code you pass either inline, either a file path.
   *
   * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _compile(
    params: ISScssCompilerParams,
    settings: ISScssCompilerOptionalSettings = {}
  ) {
    return new __SPromise(async ({ resolve, reject, pipe, emit }) => {
      settings = __deepMerge(this.svelteCompilerSettings, {}, settings);

      let input = Array.isArray(params.input) ? params.input : [params.input];

      const resultsObj = {};

      let filesPaths: string[] = [];

      // make input absolute
      input = __absolute(input);
      // process inputs
      input.forEach((inputStr) => {
        if (__isGlob(inputStr)) {
          filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
        } else {
          filesPaths.push(inputStr);
        }
      });

      const startTime = Date.now();

      for (let i = 0; i < filesPaths.length; i++) {
        let filePath = filesPaths[i];
        let file = new __SSvelteFile(filePath, {
          svelteFile: {
            compile: settings
          }
        });
        pipe(file);

        const resPromise = file.compile(params, {
          ...settings
        });
        const res = await resPromise;
        resultsObj[file.path] = res;
      }

      // resolve with the compilation result
      if (!params.watch) {
        resolve({
          files: resultsObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      } else {
        emit('files', {
          files: resultsObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      }
    });
  }
}

export default SSvelteCompiler;
