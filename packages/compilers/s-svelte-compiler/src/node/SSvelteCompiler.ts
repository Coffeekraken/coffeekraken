// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDuration from '@coffeekraken/sugar/shared/time/SDuration';
import __SCompiler, {
  ISCompiler
} from '@coffeekraken/sugar/node/compiler/SCompiler';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SSvelteCompilerInterface from './interface/SSvelteCompilerInterface';
import __STsCompiler from '@coffeekraken/s-ts-compiler';

// @ts-ignore
const __svelte = require('svelte/compiler'); // eslint-disable-line

export interface ISSvelteCompilerCtorSettings {
  svelteCompiler?: Partial<ISSvelteCompilerSettings>;
}
export interface ISSvelteCompilerSettings {}

export interface ISSvelteCompilerParams {
  input: string | string[];
  outputDir: string;
  rootDir: string;
  map: boolean;
  prod: boolean;
  stripComments: boolean;
  minify: boolean;
  banner: string;
  save: boolean;
  watch: boolean;
  svelte: any;
}

export type ISSvelteCompiler = ISCompiler;

/**
 * @name                SSvelteCompiler
 * @namespace           sugar.node.svelte
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "svelte" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISSvelteCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISSvelteCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSvelteCompiler from '@coffeekraken/sugar/node/scss/compile/SSvelteCompiler';
 * const compiler = new SSvelteCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.svelte');
 *
 * @see             https://svelte.dev/docs#Compile_time
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompiler extends __SCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SSvelteCompilerInterface
    }
  };

  /**
   * @name      svelteCompilerSettings
   * @type      ISSvelteCompilerSettings
   * @get
   *
   * Access to the svelte compiler settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get svelteCompilerSettings(): ISSvelteCompilerSettings {
    return (<any>this)._settings.svelteCompiler;
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams: Partial<ISSvelteCompilerParams>,
    settings: ISSvelteCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          svelteCompiler: {}
        },
        settings || {}
      )
    );
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
    params: ISSvelteCompilerParams,
    settings: Partial<ISSvelteCompilerSettings> = {}
  ) {
    return new __SPromise(
      async ({ resolve, reject, pipe, emit, on }) => {
        settings = __deepMerge(this.svelteCompilerSettings, {}, settings);

        const input = Array.isArray(params.input)
          ? params.input
          : [params.input];

        // prod
        if (params.prod) {
          params.style = 'compressed';
          params.minify = true;
          params.stripComments = true;
        }

        const pool = __fsPool(input, {
          watch: params.watch
        });

        // handle cancel
        on('cancel', () => {
          pool.cancel();
        });

        pool.on(params.watch ? 'update' : 'files', async (files) => {
          files = Array.isArray(files) ? files : [files];

          for (let i = 0; i < files.length; i++) {
            const file = files[i];

            console.log(file.content);

            console.log(params);

            // preprocess
            const preprocessResult = await __svelte.preprocess(
              file.content,
              {
                style: async (input) => {
                  return {
                    code: input.content
                  };

                  // if (
                  //   !input.attributes ||
                  //   !input.attributes.type ||
                  //   input.attributes.type !== 'text/scss'
                  // ) {
                  //   return {
                  //     code: input.content
                  //   };
                  // }

                  // if (input.content.trim() === '') {
                  //   return '';
                  // }

                  // // create a temp file
                  // const tmpSScssFile = new __SScssFile(
                  //   '%tmpDir/svelte/compile.scss',
                  //   {
                  //     file: {
                  //       checkExistence: false
                  //     }
                  //   }
                  // );
                  // tmpSScssFile.writeSync(input.content);

                  // emit('log', {
                  //   value: `<yellow>[scss]</yellow> Processing scss`
                  // });

                  // const compileRes = await tmpSScssFile.compile({
                  //   save: false,
                  //   map: false
                  // });

                  // if (compileRes.css) {
                  //   emit('log', {
                  //     value: `<green>[scss]</green> Scss processed <green>successfully</green>`
                  //   });

                  //   return {
                  //     code: compileRes.css
                  //   };
                  // } else {
                  //   return compileRes;
                  // }
                },
                script: async (input) => {
                  if (
                    !input.attributes ||
                    !input.attributes.type ||
                    input.attributes.type !== 'text/ts'
                  ) {
                    return {
                      code: input.content
                    };
                  }

                  const compiler = new __STsCompiler();

                  // // create a temp file
                  // const tmpTsFile = new __STsFile('%tmpDir/ts/compile.ts', {
                  //   file: {
                  //     checkExistence: false
                  //   }
                  // });
                  // tmpTsFile.writeSync(input.content);

                  // emit('log', {
                  //   value: `<yellow>[ts]</yellow> Processing typescript`
                  // });

                  // const compilePromise = tmpTsFile.compile({
                  //   save: false,
                  //   // @ts-ignore
                  //   target: 'browser',
                  //   map: false
                  // });
                  // // const compiler = new __STsCompiler();
                  // // const compilePromise = compiler.compile({
                  // //   input: [tmpTsFile.path],
                  // //   rootDir: tmpTsFile.dirPath,
                  // //   save: false,
                  // //   transpileOnly: true,
                  // //   target: 'browser',
                  // //   map: false
                  // // });
                  // pipe(compilePromise, {
                  //   events: 'error'
                  // });
                  // const compileRes = await compilePromise;
                  // if (compileRes.js) {
                  //   emit('log', {
                  //     value: `<green>[ts]</green> Typescript processed <green>successfully</green>`
                  //   });

                  //   return {
                  //     code: compileRes.js
                  //   };
                  // } else {
                  //   return compileRes;
                  // }
                }
              },
              {}
            );

            // render svelte
            const result = __svelte.compile(preprocessResult.code, {
              filename: file.name,
              dev: !params.prod,
              customElement: true,
              preserveComments: !params.stripComments,
              preserveWhitespace: !params.prod,
              outputFilename: file.name,
              cssOutputFilename: file.name,
              ...(params.svelte || {})
            });

            result.warnings.forEach((warning) => {
              emit('warn', {
                value: warning.toString()
              });
            });

            // const compilePromise = file.compile(
            //   {
            //     ...params,
            //     watch: false
            //   },
            //   settings
            // );

            // try {
            //   pipe(compilePromise);
            //   const compileRes = await compilePromise;
            //   resultsObj[file.path] = compileRes;
            //   aggregateStrArray.push(compileRes.js);
            //   emit('file', compileRes);
            // } catch (e) {
            //   emit('warn', {
            //     value: e.toString()
            //   });
            // }
          }

          // if (params.watch) {
          //   emit('log', {
          //     value: `<blue>[watch]</blue> Watching for changes...`
          //   });
          // } else {
          //   resolve({
          //     files: resultsObj,
          //     js: aggregateStrArray.join('\n'),
          //     ...duration.end()
          //   });
          // }
        });

        // const resultsObj = {};
        // const aggregateStrArray: string[] = [];
        // const duration = new __SDuration();

        //

        // if (params.watch) {
        //   emit('log', {
        //     value: `<blue>[watch]</blue> Watching for changes...`
        //   });
        // }
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }
}

export default SSvelteCompiler;
