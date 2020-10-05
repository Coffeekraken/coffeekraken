const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __glob = require('glob');
const __SFsFile = require('../fs/SFsFile');
const __extractGlob = require('./extractGlob');

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
 * @setting     {Object}        ...minimatch                All the minimatch (https://www.npmjs.com/package/minimatch) options are supported
 * @setting     {String}        rootDir                     The root directory where to start the glob search process
 * @setting     {Boolean}       symlinks                    Follow or not the symlinks
 * @setting     {Object}        ...glob                     All the glob (https://www.npmjs.com/package/glob) options are supported
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
          symlinks: true
        },
        settings
      );

      let filesArray = [];

      if (!Array.isArray(globs)) globs = [globs];

      for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];

        let rootDir = settings.rootDir,
          globPattern;

        if (glob.includes(':')) {
          globPattern = glob.split(':')[1];
          rootDir = glob.split(':')[0];
        } else {
          globPattern = settings.rootDir
            ? glob.replace(`${settings.rootDir}/`, '')
            : __extractGlob(glob);
        }

        const pathes = __glob.sync(globPattern, {
          cwd: rootDir,
          ...settings
        });

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
