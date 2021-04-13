import __deepMerge from '../../shared/object/deepMerge';
import __getFilename from '../fs/filename';
import { ISFileCtorSettings } from '@coffeekraken/s-file';
import __SJsFile, { ISJsFileCompileSettings } from '../js/SJsFile';
import { ISTsCompilerParams } from '@coffeekraken/s-ts-compiler';

/**
 * @name            STsFile
 * @namespace       sugar.node.typescript
 * @type            Class
 * @extends         SFile
 * @status              beta
 *
 * This represent a typescript file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISTsFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import STsFile from '@coffeekraken/sugar/node/typescript/STsFile';
 * const file = new STsFile('/my/cool/file.ts');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

type ISTsFileCompileSettings = ISJsFileCompileSettings;

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
    return (<any>this)._settings.tsFile;
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
