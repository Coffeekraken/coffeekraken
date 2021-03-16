// @ts-nocheck

import __deepMerge from '../../shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __glob from 'glob';
import __SFile from '../fs/SFile';
import __extractGlob from './extractGlob';
import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
import __fs from 'fs';
import __toRegex from 'to-regex';
import __isDirectory from '../is/directory';
import __expandGlob from './expandGlob';

/**
 * @name            resolveGlob
 * @namespace       sugar.node.glob
 * @type            Function
 * @async
 * @status              beta
 *
 * This function simply resolve the passed glob pattern(s) and resolve his promise
 * with an Array of SFile instances to work with
 *
 * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for when using some "**" pattern
 * @param       {Object}            [settings={}]           An object of settings to configure your glob process
 * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
 *
 * @setting     {Number}        [maxDepth=-1]               Specify the maximum depth to use when
 * @setting     {String}        cwd                         The root directory where to start the glob search process
 * @setting     {Object}        ...glob                     All the glob (https://www.npmjs.com/package/glob) options are supported
 * @setting     {RegExp}        [contentRegex=null]         Specify a regex that will be used to filter the results by searching in the content
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo          document the special ":" syntax available
 *
 * @example         js
 * import resolveGlob from '@coffeekraken/sugar/node/glob/resolveGlob';
 * await resolveGlob('/my/cool/pattern/*.js');
 *
 * @see         https://www.npmjs.com/package/glob
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveGlob(globs, settings = {}) {
  return new __SPromise(
    ({ resolve, reject, emit }) => {
      settings = __deepMerge(
        {
          cwd: settings.cwd || process.cwd(),
          symlinks: true,
          nodir: true
        },
        settings
      );

      let filesArray = [];

      if (!Array.isArray(globs)) globs = [globs];

      for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];

        let cwd = settings.cwd,
          globPattern,
          searchReg = settings.contentRegex;

        const splits = glob.split(':').map((split) => {
          return split.replace(`${cwd}/`, '').replace(cwd, '');
        });

        globPattern = splits[0];

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
          }
        });

        globPattern = `${cwd}/${globPattern}`;

        let finalPatterns = __expandGlob(globPattern);

        let pathes = [];
        finalPatterns.forEach((pattern) => {
          pathes = pathes.concat(
            __glob.sync(pattern, {
              cwd,
              ...settings
            })
          );
        });

        // check if need to search for inline content
        if (searchReg) {
          pathes = pathes.filter((path) => {
            if (__isDirectory(path)) return false;
            const content = __fs.readFileSync(path, 'utf8');
            const matches = content.match(searchReg);
            if (matches) {
              return true;
            }
            return false;
          });
        }

        pathes.forEach((path) => {
          const sFile = __SFile.instanciate(path, {
            file: {
              cwd
            }
          });
          filesArray.push(sFile);
        });
      }

      // resolve the promise
      resolve(filesArray);
    },
    {
      id: 'resolveGlob'
    }
  );
}
export default resolveGlob;
