import __SFile from '../fs/SFile';
import __md5 from '../crypt/md5';
import __SDuration from '../time/SDuration';
import __path from 'path';
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '../object/deepMerge';
import __sugarConfig from '../config/sugar';
import __toString from '../string/toString';
import __wait from '../time/wait';
import __getFilename from '../fs/filename';
import __ts from 'typescript';
import { ESLint } from 'eslint';

import __SInterface from '../interface/SInterface';
import __STsFileInterface from './interface/STsFileInterface';
import { ISTsCompilerParams } from './compile/STsCompiler';
import { ISFileCtorSettings } from '../fs/SFile';
import __STsCompilerParamsInterface from './compile/interface/STsCompilerParamsInterface';

/**
 * @name            STsFile
 * @namespace       sugar.node.typescript
 * @type            Class
 * @extends         SFile
 * @status              beta
 *
 * This represent a typescript file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISTsFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import STsFile from '@coffeekraken/sugar/node/typescript/STsFile';
 * const file = new STsFile('/my/cool/file.ts');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

interface ISTsFileCompileSettings {}

interface ISTsFileSettings {
  compile: Partial<ISTsFileCompileSettings>;
}
interface ISTsFileCtorSettings extends ISFileCtorSettings {
  tsFile?: Partial<ISTsFileSettings>;
}
interface ISTsFile {
  compile(
    params: Partial<ISTsCompilerParams>,
    settings?: Partial<ISTsFileSettings>
  );
}

// @ts-ignore
class STsFile extends __SFile implements ISTsFile {
  static interfaces = {
    compilerParams: {
      apply: false,
      class: __STsCompilerParamsInterface
    },
    this: {
      apply: true,
      class: __STsFileInterface
    }
  };

  /**
   * @name      tsFileSettings
   * @type      ISTsFileSettings
   * @get
   *
   * Access the tsFile settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get tsFileSettings(): ISTsFileSettings {
    return (<any>this._settings).tsFile;
  }

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(path: string, settings: ISTsFileCtorSettings = {}) {
    super(
      path,
      __deepMerge(
        {
          id: __getFilename(path),
          tsFile: {}
        },
        settings
      )
    );
  }

  /**
   * @name              compile
   * @type              Function
   *
   * Simply compile the file using the settings that you can pass as argument
   *
   * @param         {ISTsFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isCompiling = false;
  _currentCompilationParams: Partial<ISTsCompilerParams> = {};
  compile(
    params: Partial<ISTsCompilerParams>,
    settings?: Partial<ISTsFileSettings>
  ) {
    settings = __deepMerge(this.tsFileSettings.compile, settings);
    this._currentCompilationParams = Object.assign({}, params);

    params = this.applyInterface('compilerParams', params);

    // init the promise
    return new __SPromise(
      async ({ resolve, reject, emit, pipe, pipeTo, on }) => {
        if (this._isCompiling) {
          emit('warn', {
            value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
          });
          return;
        }
        this._isCompiling = true;

        // listen for the end
        on('finally', () => {
          this._isCompiling = false;
        });

        pipeTo(this);

        emit('notification', {
          title: `${this.id} compilation started`
        });

        emit('log', {
          clear: true,
          type: 'time'
        });

        // notify start
        emit('log', {
          value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
        });

        let compilerOptions = params.compilerOptions;
        if (params.target)
          compilerOptions = this.getCompilerOptionsForTarget(params.target);

        const duration = new __SDuration();

        await __wait(0);

        let toCompile = this.content;

        try {
          emit('log', {
            value: `<yellow>[compiling]</yellow> File "<cyan>${this.relPath}</cyan>"`
          });

          // linting ts
          const eslint = new ESLint({
            ...__sugarConfig('eslint'),
            fix: true,
            ignore: false
          });
          const lintResult = await eslint.lintFiles([this.path]);
          if (
            lintResult &&
            lintResult[0].messages &&
            lintResult[0].messages.length
          ) {
            const formatter = await eslint.loadFormatter('codeframe');
            const resultText = formatter.format(lintResult);
            emit('notification', {
              type: 'error',
              title: `STsFile compilation error`,
              message: this.relPath
            });
            return reject(resultText);
          }

          // render typescript
          const result = __ts.transpileModule(this.content, {
            compilerOptions
          });

          if (!result.outputText) {
            return reject(
              `Something has gone wronge during the "<yellow>${this.relPath}</yellow>" typescript file compilation...`
            );
          }

          // check if need to save
          if (params.save) {
            // build the save path
            let savePath;
            if (params.outputDir === undefined) {
              savePath = this.path.replace(/\.ts$/, '.js');
            } else {
              savePath = __path.resolve(
                params.outputDir,
                this.path
                  .replace(`${params.rootDir}/`, '')
                  .replace(/\.ts$/, '.js')
              );
            }
            emit('log', {
              type: 'file',
              file: this.toObject(),
              to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
              action: 'save'
            });
            this.writeSync(result.outputText, {
              path: savePath
            });
            // if (params.map) {
            //   this.writeSync(result.js.map.toString(), {
            //     path: savePath.replace(/\.js$/, '.js.map')
            //   });
            //   emit('log', {
            //     type: 'file',
            //     action: 'saved',
            //     to: savePath
            //       .replace(/\.js$/, '.js.map')
            //       .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
            //     file: this.toObject()
            //   });
            // }

            // notify end
            const time = duration.end();

            emit('log', {
              type: 'file',
              action: 'saved',
              to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
              file: this.toObject()
            });
          }

          emit('log', {
            type: 'separator'
          });

          emit('notification', {
            type: 'success',
            title: `${this.id} compilation success`
          });

          // resolve only if not watching
          return resolve({
            js: result.outputText,
            ...duration.end()
          });
        } catch (e) {
          return reject(e);
        }
      }
    );
  }

  /**
   * @name        getCompilerOptionsForTarget
   * @type        Function
   *
   * Get back some compilerOptions specified to a certain target defined in the ts.config.ts file
   *
   * @param     {String}      target       The target to get
   * @return    {Object}                 The target compilerOptions object
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getCompilerOptionsForTarget(target) {
    const compilerOptions = __sugarConfig('ts.compile.compilerOptions');
    const definedTargets = __sugarConfig('ts.targets');
    if (!definedTargets) return compilerOptions;
    if (!definedTargets[target]) return compilerOptions;
    return __deepMerge(compilerOptions, definedTargets[target]);
  }
}

export default STsFile;
