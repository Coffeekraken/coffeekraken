import __SFile from '../fs/SFile';
import __md5 from '../crypt/md5';
import __SDuration from '../time/SDuration';
import __path from 'path';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __sugarConfig from '../config/sugar';
import __SFileCache from '../cache/SFileCache';
import __toString from '../string/toString';
import __wait from '../time/wait';
import __getFilename from '../fs/filename';
import __STsCompiler from './compile/STsCompiler';

import __SInterface from '../interface/SInterface';
import __STsFileInterface from './interface/STsFileInterface';
import {
  ISTsCompilerParams,
  ISTsCompilerOptionalParams
} from './compile/STsCompiler';
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

interface ISTsFileCompileOptionalSettings {}
interface ISTsFileCompileSettings {}

interface ISTsFileOptionalSettings {
  compile?: ISTsFileCompileOptionalSettings;
}
interface ISTsFileSettings {
  compile: ISTsFileCompileOptionalSettings;
}
interface ISTsFileCtorSettings {
  tsFile?: ISTsFileOptionalSettings;
}
interface ISTsFile {
  compile(
    params: ISTsCompilerOptionalParams,
    settings?: ISTsFileOptionalSettings
  );
}

// @ts-ignore
class STsFile extends __SFile implements ISTsFile {
  static interfaces = {
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
  compile(
    params: ISTsCompilerOptionalParams,
    settings?: ISTsFileOptionalSettings
  ) {
    settings = __deepMerge(this.tsFileSettings, settings);

    // init the promise
    return new __SPromise(
      async ({ resolve, reject, emit, pipeFrom, pipeTo, on }) => {
        pipeTo(this);

        emit('log', {
          type: 'separator'
        });

        // notify start
        emit('log', {
          value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
        });

        const duration = new __SDuration();

        await __wait(0);

        try {
          emit('log', {
            value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
          });

          const compiler = new __STsCompiler();
          pipeFrom(compiler);

          const res = await compiler.compile(
            {
              ...params
            },
            this.tsFileSettings.compile || {}
          );

          return resolve(res);
        } catch (e) {
          return reject(e.toString());
        }

        return true;
      }
    );
  }
}

export default STsFile;
