// @ts-nocheck
import __deepMerge from '../../shared/object/deepMerge';
import __glob from 'glob';
import __SFile from '@coffeekraken/s-file';
import __fs from 'fs';
import __path from 'path';
import __toRegex from 'to-regex';
import __isDirectory from '../is/directory';
import __expandGlob from '../../shared/glob/expandGlob';
/**
 * @name            resolveGlob
 * @namespace            node.glob
 * @type            Function
 * @status              beta
 *
 * This function simply resolve the passed glob pattern(s) and resolve his promise
 * with an Array of SFile instances to work with
 *
 * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for when using some "**" pattern
 * @param       {Object}            [settings={}]           An object of settings to configure your glob process
 * @return      {Array}                                  An array of SFile instances
 *
 * @setting     {String}        cwd                         The root directory where to start the glob search process
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
 * resolveGlob('/my/cool/pattern/*.js');
 *
 * @see         https://www.npmjs.com/package/glob
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveGlob(globs, settings = {}) {
    settings = __deepMerge({
        cwd: settings.cwd || process.cwd(),
        symlinks: true,
        nodir: true,
        contentRegExp: undefined
    }, settings);
    const filesArray = [];
    if (!Array.isArray(globs))
        globs = [globs];
    for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];
        let cwd = settings.cwd, globPattern, searchReg = settings.contentRegExp;
        // make sure it's a glob pattern
        if (__fs.existsSync(glob)) {
            const sFile = __SFile.new(glob, {
                file: {
                    cwd
                }
            });
            filesArray.push(sFile);
            continue;
        }
        const splits = glob.split(':').map((split) => {
            return split.replace(`${cwd}/`, '').replace(cwd, '');
        });
        if (splits[1]) {
            searchReg = __toRegex(splits[1]);
        }
        globPattern = splits[0];
        globPattern = __path.resolve(cwd, globPattern);
        const finalPatterns = __expandGlob(globPattern);
        let pathes = [];
        finalPatterns.forEach((pattern) => {
            pathes = pathes.concat(__glob.sync(pattern, Object.assign({ cwd, dot: true }, settings)));
        });
        // check if need to search for inline content
        if (searchReg) {
            pathes = pathes.filter((path) => {
                if (__isDirectory(path))
                    return false;
                const content = __fs.readFileSync(path, 'utf8');
                const matches = content.match(searchReg);
                if (matches) {
                    return true;
                }
                return false;
            });
        }
        pathes.forEach((path) => {
            const sFile = __SFile.new(path, {
                file: {
                    cwd
                }
            });
            filesArray.push(sFile);
        });
    }
    // resolve the promise
    return filesArray;
}
export default resolveGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFFeEQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sWUFBWSxNQUFNLDhCQUE4QixDQUFDO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2QyxRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbEMsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsSUFBSTtRQUNYLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixNQUFNLFVBQVUsR0FBYyxFQUFFLENBQUM7SUFFakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVB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