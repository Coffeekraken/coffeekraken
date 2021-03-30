import __SFile from '../fs/SFile';
import __deepMerge from '../../shared/object/deepMerge';
import __sugarConfig from '../../shared/config/sugar';
import __onProcessExit from '../process/onProcessExit';
import __folderPath from '../fs/folderPath';
import __ensureDirSync from '../fs/ensureDirSync';
import __fs from 'fs';
import __path from 'path';
import __replacePathTokens from '../path/replacePathTokens';
import __uniqid from '../../shared/string/uniqid';

/**
 * @name            STsconfigFile
 * @namespace       sugar.node.ts
 * @type                Class
 * @extends           SFile
 * @status          wip
 *
 * This class represent a tsconfig file. This allows you to use these features
 * in addition to the SFile ones:
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISTsconfigFileSettings {
  clean: boolean;
}

export interface ISTsconfigFileCtorSettings {
  tsconfigFile: Partial<ISTsconfigFileSettings>;
}

export interface ISTsconfigFile {}

export default class STsconfigFile extends __SFile implements ISTsconfigFile {
  /**
   * @name          tsconfigFileSettings
   * @type          ISTsconfigFileSettings
   * @get
   *
   * Access the tsconfigFile settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get tsconfigFileSettings(): ISTsconfigFileSettings {
    return (<any>this)._settings.tsconfigFile;
  }

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(pathOrStack: string, settings?: ISTsconfigFileCtorSettings) {
    let path = pathOrStack;

    // check if the passed path is a stack name
    const stacks = __sugarConfig('ts.stacks');
    if (stacks[pathOrStack]) path = stacks[pathOrStack];

    super(
      path,
      __deepMerge(
        {
          file: {
            processors: {
              content: [
                (content) => {
                  if (this.tsconfigFileSettings.clean) {
                    Object.keys(content).forEach((prop) => {
                      if (prop.match(/^_/)) delete content[prop];
                    });
                  }
                  return content;
                }
              ]
            }
          },
          tsconfigFile: {
            clean: true
          }
        },
        settings ?? {}
      )
    );
  }

  /**
   * @name          convertToJson
   * @type          Function
   * @async
   *
   * This method simply check if the file is a json already.
   * If not, it will rename the file and cast the content to a proper json one.
   *
   * @return        {Promise}                 A promise resolved once the file has been correctly converted
   *
   * @since             2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  convertToJson(to?): Promise<__SFile> {
    return new Promise((resolve, reject) => {
      const newFile = this.convertToJsonSync(to);
      resolve(newFile);
    });
  }

  /**
   * @name          convertToJsonSync
   * @type          Function
   *
   * This method simply check if the file is a json already.
   * If not, it will rename the file and cast the content to a proper json one.
   *
   * @return        {Promise}                 A promise resolved once the file has been correctly converted
   *
   * @since             2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  convertToJsonSync(to?): __SFile {
    // check if this file is already a json one
    if (this.extension === 'json') return this;

    let destination = to;
    if (!to) {
      destination = __replacePathTokens(
        `%tmpDir/files/${this.constructor.name}/${
          this.nameWithoutExt
        }.${__uniqid()}.json`
      );
      __onProcessExit(() => {
        try {
          __fs.unlinkSync(destination);
        } catch (e) {}
      });
    }
    destination = __path.resolve(destination);

    // get the content
    let content = this.content;
    if (typeof content !== 'string') {
      try {
        content = JSON.stringify(content, null, 4);
      } catch (e) {}
    }

    // ensure folder exists
    __ensureDirSync(__folderPath(destination));

    // write new file
    __fs.writeFileSync(destination, <string>content);

    // return the new file instance
    // @ts-ignore
    return new this.constructor(destination, this._settings);
  }
}
