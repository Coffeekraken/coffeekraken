const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __glob = require('glob');
const __SFsFile = require('../fs/SFsFile');
const __extractGlob = require('./extractGlob');
const __isGlob = require('../is/glob');
const __isPath = require('../is/path');
const __fs = require('fs');
const __toRegex = require('to-regex');
const __isDirectory = require('../is/directory');

/**
 * @name            resolveGlob
 * @namespace       sugar.node.glob
 * @type            Function
 * @async
 *
 * This function simply resolve the passed glob pattern(s) and resolve his promise
 * with an Array of SFsFile instances to work with
 *
 * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
 * @param       {Object}            [settings={}]           An object of settings to configure your glob process
 * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
 *
 * @setting     {String}        rootDir                     The root directory where to start the glob search process
 * @setting     {Object}        ...glob                     All the glob (https://www.npmjs.com/package/glob) options are supported
 *
 * @todo          document the special ":" syntax available
 *
 * @example         js
 * const resolveGlob = require('@coffeekraken/sugar/node/glob/resolveGlob');
 * await resolveGlob('/my/cool/pattern/*.js');
 *
 * @see         https://www.npmjs.com/package/glob
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function resolveGlob(globs, settings = {}) {
  return new __SPromise(
    (resolve, reject, trigger, cancel) => {
      settings = __deepMerge(
        {
          rootDir: settings.cwd || process.cwd(),
          symlinks: true,
          nodir: true
        },
        settings
      );

      let filesArray = [];

      if (!Array.isArray(globs)) globs = [globs];

      for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];

        let rootDir = settings.rootDir,
          globPattern,
          searchReg;

        const splits = glob.split(':');
        splits.forEach((split) => {
          if (
            split.substr(0, 1) === '/' &&
            split.match(/.*\/[igmsuy]{0,6}]?/)
          ) {
            const regSplits = split.split('/').splice(1);
            const regString = regSplits[0];
            const flags = regSplits[regSplits.length - 1];
            searchReg = __toRegex(regString, {
              flags
            });
          } else if (__isGlob(split)) {
            globPattern = split;
          } else if (__isPath(split, true)) {
            rootDir = split;
          }
        });

        let pathes = __glob.sync(globPattern, {
          cwd: rootDir,
          ...settings
        });

        // check if need to search for inline content
        if (searchReg) {
          pathes = pathes.filter((path) => {
            if (__isDirectory(path)) return false;
            const content = __fs.readFileSync(path, 'utf8');
            if (searchReg.test(content)) return true;
            return false;
          });
        }

        pathes.forEach((path) => {
          const sFsFile = new __SFsFile(path, {
            rootDir
          });
          filesArray.push(sFsFile);
        });
      }

      // resolve the promise
      resolve(filesArray);
    },
    {
      id: 'resolveGlob'
    }
  );
};
