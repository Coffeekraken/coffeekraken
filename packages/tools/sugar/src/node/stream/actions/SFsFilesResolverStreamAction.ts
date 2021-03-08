// @ts-nocheck

import __path from 'path';
import __SActionsStreamAction from '../SActionsStreamAction';
import __glob from 'glob';
import __deepMerge from '../../object/deepMerge';
import __fs from 'fs';
import __packageRoot from '../../path/packageRoot';
import __SPromise from '@coffeekraken/s-promise';
import __SError from '../../error/SError';
import __SInterface from '../../class/SInterface';
import __extractGlob from '../../glob/extractGlob';
import __extractNoneGlob from '../../glob/extractNoneGlob';
import __getFilename from '../../fs/filename';
import __extension from '../../fs/extension';
import __resolveGlob from '../../glob/resolveGlob';

class SFsFilesResolverStreamActionInterface extends __SInterface {
  static definition = {
    input: {
      type: 'String|Array<String>',
      required: true
    }
  };
}

/**
 * @name            SFindInFileStreamAction
 * @namespace       node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              beta
 *
 * This class is a stream action that allows you search inside files for a certain string/pattern
 * And get back the list of founded files.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFindInFileStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interfaces = {
    this: SFsFilesResolverStreamActionInterface
  };

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          name: 'File resolver',
          id: 'SFsFilesResolverStreamAction',
          cache: false,
          ignoreFolders: ['__wip__', '__tests__'],
          out: 'array'
        },
        settings
      )
    );
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Override the base class run method
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(streamObj, settings = {}) {
    settings = __deepMerge(this._settings, settings);
    return super.run(streamObj, ({ resolve, reject, emit }) => {
      let filesPathesObj = [];
      const streamObjArray = [];

      let input;
      if (streamObj.input)
        input = Array.isArray(streamObj.input)
          ? streamObj.input
          : [streamObj.input];
      let inputs = [];

      inputs = [
        ...input.map((inputString) => {
          if (inputString.includes(':')) {
            return {
              rootDir: inputString.split(':')[0],
              glob: inputString.split(':')[1]
            };
          }
          return {
            rootDir: __extractNoneGlob(inputString),
            glob: __extractGlob(inputString)
          };
        })
      ];

      inputs.forEach((inputObj) => {
        // // check if the input path is a path or a glob
        // if (!__isGlob(searchPath) && !__isPath(searchPath, true)) {
        //   filesPathes.push(searchPath);
        //   this.warn(
        //     `One of the passed inputs is either not a valid glob pattern, either not a valid file path and will be treated as a simple String...`
        //   );
        //   return;
        // }

        const path = __glob
          .sync(inputObj.glob || '**/*', {
            cwd: inputObj.rootDir || __packageRoot(),
            ignore: settings.ignoreFolders.map((f) => {
              return `**/${f}/**`;
            })
          })
          .map((p) => {
            return {
              ...inputObj,
              relPath: p,
              path: __path.resolve(inputObj.rootDir, p),
              finename: __getFilename(p),
              extension: __extension(p)
            };
          });

        // append to the filePathes
        filesPathesObj = [...filesPathesObj, ...path];

        // const reg = new RegExp(`\s?${searchPattern}\s?`, 'gm');
        // path.forEach((p) => {
        //   if (__isDirectory(p)) {
        //     const filesPathArray = __glob.sync(`${p}/*.*`);
        //     filesPathArray.forEach((filePath) => {
        //       if (searchPattern) {
        //         const content = __fs.readFileSync(filePath, 'utf8');
        //         const matches = content.match(reg);
        //         if (matches) {
        //           if (filesPathes.indexOf(filePath) === -1)
        //             filesPathes.push(filePath);
        //         }
        //       } else {
        //         if (filesPathes.indexOf(filePath) === -1)
        //           filesPathes.push(filePath);
        //       }
        //     });
        //   } else if (!__isSymlink(p)) {
        //     if (searchPattern) {
        //       const content = __fs.readFileSync(p, 'utf8');
        //       const matches = content.match(reg);
        //       if (matches) {
        //         if (filesPathes.indexOf(p) === -1) filesPathes.push(p);
        //       }
        //     } else {
        //       if (filesPathes.indexOf(p) === -1) filesPathes.push(p);
        //     }
        //   }
        // });
      });

      if (!filesPathesObj.length) {
        throw new __SError(
          `Sorry but your <primary>input</primary> streamObj property setted to "<cyan>${streamObj.input.replace(
            `${__packageRoot()}/`,
            ''
          )}</cyan>" does not resolve to any files...`
        );
      }

      if (settings.out !== 'array') {
        streamObj[settings.out || 'files'] = filesPathesObj;
        resolve(streamObj);
      } else {
        filesPathesObj.forEach((pathObj) => {
          const stats = __fs.statSync(pathObj.path);
          streamObjArray.push(
            Object.assign(
              {},
              {
                ...streamObj,
                input: pathObj.path,
                inputObj: {
                  ...pathObj,
                  stats: {
                    size: stats.size,
                    mtime: stats.mtime,
                    ctime: stats.ctime,
                    birthtime: stats.birthtime
                  }
                }
              }
            )
          );
        });
        resolve(streamObjArray);
      }
    });
  }
}
