const __toString = require('../../string/toString');
const __SActionsStreamAction = require('../SActionsStreamAction');
const __glob = require('glob');
const __deepMerge = require('../../object/deepMerge');
const __fs = require('fs');
const __isDirectory = require('../../is/directory');
const __isSymlink = require('../../is/symlink');
const __isGlob = require('is-glob');
const __isPath = require('../../is/path');
const __packageRoot = require('../../path/packageRoot');
const __SPromise = require('../../promise/SPromise');
const __SError = require('../../error/SError');
const __SInterface = require('../../class/SInterface');

class SFsFilesResolverStreamActionInterface extends __SInterface {
  static definitionObj = {
    input: {
      type: 'String|Array<String>',
      required: true
    }
  };
}

/**
 * @name            SFindInFileStreamAction
 * @namespace       sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you search inside files for a certain string/pattern
 * And get back the list of founded files.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFindInFileStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SFsFilesResolverStreamActionInterface;

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
          id: 'actionStream.action.fs.filesResolver',
          cache: false,
          ignoreFolders: [],
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
    return super.run(streamObj, (resolve, reject, trigger) => {
      const filesPathes = [];
      const streamObjArray = [];

      const inputs = Array.isArray(streamObj.input)
        ? streamObj.input
        : [streamObj.input];

      inputs.forEach((input) => {
        // extract the pattern to search
        const inputSplits = input.split(':');
        const searchPath = inputSplits[0];
        const searchPattern = inputSplits[1] ? inputSplits[1] : null;

        // check if the input path is a path or a glob
        if (!__isGlob(searchPath) && !__isPath(searchPath, true)) {
          filesPathes.push(searchPath);
          this.warn(
            `One of the passed inputs is either not a valid glob pattern, either not a valid file path and will be treated as a simple String...`
          );
          return;
        }

        const path = __glob.sync(searchPath, {
          ignore: settings.ignoreFolders.map((f) => {
            return `**/${f}/**`;
          })
        });

        const reg = new RegExp(`\s?${searchPattern}\s?`, 'gm');
        path.forEach((p) => {
          if (__isDirectory(p)) {
            const filesPathArray = __glob.sync(`${p}/*.*`);
            filesPathArray.forEach((filePath) => {
              if (searchPattern) {
                const content = __fs.readFileSync(filePath, 'utf8');
                const matches = content.match(reg);
                if (matches) {
                  if (filesPathes.indexOf(filePath) === -1)
                    filesPathes.push(filePath);
                }
              } else {
                if (filesPathes.indexOf(filePath) === -1)
                  filesPathes.push(filePath);
              }
            });
          } else if (!__isSymlink(p)) {
            if (searchPattern) {
              const content = __fs.readFileSync(p, 'utf8');
              const matches = content.match(reg);
              if (matches) {
                if (filesPathes.indexOf(p) === -1) filesPathes.push(p);
              }
            } else {
              if (filesPathes.indexOf(p) === -1) filesPathes.push(p);
            }
          }
        });
      });

      if (!filesPathes.length) {
        throw new __SError(
          `Sorry but your <primary>input</primary> streamObj property setted to "<cyan>${streamObj.input.replace(
            `${__packageRoot()}/`,
            ''
          )}</cyan>" does not resolve to any files...`
        );
      }

      if (settings.out !== 'array') {
        streamObj[settings.out || 'files'] = filesPathes;
        resolve(streamObj);
      } else {
        filesPathes.forEach((path) => {
          const stats = __fs.statSync(path);
          streamObjArray.push(
            Object.assign(
              {},
              {
                ...streamObj,
                input: path,
                inputStats: {
                  size: stats.size,
                  mtime: stats.mtime,
                  ctime: stats.ctime,
                  birthtime: stats.birthtime
                }
              }
            )
          );
        });
        resolve(streamObjArray);
      }
    });
  }
};
