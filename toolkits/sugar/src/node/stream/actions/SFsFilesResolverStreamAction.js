const __SActionsStreamAction = require('../SActionsStreamAction');
const __glob = require('glob');
const __deepMerge = require('../../object/deepMerge');
const __fs = require('fs');
const __isDirectory = require('../../is/directory');
const __isSymlink = require('../../is/symlink');
const __isGlob = require('is-glob');
const __isPath = require('../../is/path');
const __SPromise = require('../../promise/SPromise');
/**
 * @name            SFindInFileStreamAction
 * @namespace       node.stream.actions
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
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    input: {
      type: 'String|Array<String>',
      required: true
    }
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
          id: 'actionStream.action.fs.filesResolver',
          ignoreFolders: []
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
    return super.run(streamObj, async (resolve, reject) => {
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
                  filesPathes.push(filePath);
                }
              } else {
                filesPathes.push(filePath);
              }
            });
          } else if (!__isSymlink(p)) {
            if (searchPattern) {
              const content = __fs.readFileSync(p, 'utf8');
              const matches = content.match(reg);
              if (matches) {
                filesPathes.push(p);
              }
            } else {
              filesPathes.push(p);
            }
          }
        });
      });

      if (!filesPathes.length) {
        reject(
          new Error(
            `Sorry but your <primary>input</primary> streamObj property setted to "<cyan>${streamObj.input}</cyan>" does not resolve to any files...`
          )
        );
      }

      if (settings.out === 'array') {
        filesPathes.forEach((path) => {
          streamObjArray.push(
            Object.assign(
              {},
              {
                ...streamObj,
                input: path
              }
            )
          );
        });
        resolve(streamObjArray);
      } else {
        streamObj[settings.property || 'files'] = filesPathes;
        resolve(streamObj);
      }
    });
  }
};
