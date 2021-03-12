import __SJsFile from '../js/SJsFile';
import __deepMerge from '../object/deepMerge';
import __getFilename from '../fs/filename';

import __STsFileInterface from './interface/STsFileInterface';
import { ISTsCompilerParams } from './compile/STsCompiler';
import { ISFileCtorSettings } from '../fs/SFile';
import __STsCompilerParamsInterface from './compile/interface/STsCompilerParamsInterface';
import { ISJsFileCompileSettings } from '../js/SJsFile';

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

interface ISTsFileCompileSettings extends ISJsFileCompileSettings {}

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
class STsFile extends __SJsFile implements ISTsFile {
  // static interfaces = {
  //   compilerParams: {
  //     apply: false,
  //     class: __STsCompilerParamsInterface
  //   },
  //   this: {
  //     apply: true,
  //     class: __STsFileInterface
  //   }
  // };

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
}

export default STsFile;
