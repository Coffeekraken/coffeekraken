const __SActionsStreamAction = require('../SActionsStreamAction');
const __glob = require('glob');
const __sugarConfig = require('../../config/sugar');
const __clone = require('../../object/clone');
const __extractSame = require('../../string/extractSame');
const __getFilename = require('../../fs/filename');
const __findInFile = require('find-in-files');
const __globToRegex = require('glob-to-regexp');
const __fs = require('fs');
const __isDirectory = require('../../is/directory');
const __isSymlink = require('../../is/symlink');

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
    super(settings);
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
  run(streamObj, settings = this._settings) {
    // make sure we have a correct streamObj
    this.checkStreamObject(streamObj);

    return new Promise(async (resolve, reject) => {
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

        const path = __glob.sync(searchPath, {
          ignore: __sugarConfig('build.docNav.ignoreFolders').map((f) => {
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
