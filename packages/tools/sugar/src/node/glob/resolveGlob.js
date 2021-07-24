// @ts-nocheck
import __SFile from '@coffeekraken/s-file';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';
import __isDirectory from '../is/directory';
import __excludeGlobs from '../path/excludeGlobs';
export default function resolveGlob(globs, settings = {}) {
    settings = __deepMerge({
        cwd: settings.cwd || process.cwd(),
        symlinks: true,
        nodir: false,
        contentRegExp: undefined,
        SFile: true,
        exclude: [],
        defaultExcludes: true
    }, settings);
    const filesArray = [];
    if (!Array.isArray(globs))
        globs = [globs];
    for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];
        let cwd = settings.cwd, globPattern, searchReg = settings.contentRegExp;
        // make sure it's a glob pattern
        if (__fs.existsSync(glob)) {
            if (settings.SFile) {
                const sFile = __SFile.new(glob, {
                    file: {
                        cwd
                    }
                });
                filesArray.push(sFile);
            }
            else {
                filesArray.push(glob);
            }
            continue;
        }
        const splits = glob.split(':').map((split) => {
            return split.replace(`${cwd}/`, '').replace(cwd, '');
        });
        if (splits[1]) {
            // searchReg = __toRegex(splits[1]);
            const innerReg = splits[1].replace(/^\//, '').replace(/\/[a-zA-Z]{0,10}$/, '');
            let flags = splits[1].match(/\/[a-zA-Z]{1,10}$/g);
            if (flags) {
                flags = flags[0].replace('/', '');
            }
            searchReg = new RegExp(innerReg, flags);
        }
        globPattern = splits[0];
        globPattern = __path.resolve(cwd, globPattern);
        const finalPatterns = __expandGlob(globPattern);
        let pathes = [];
        finalPatterns.forEach((pattern) => {
            var _a;
            pathes = pathes.concat(__glob.sync(pattern, Object.assign({ cwd, nodir: settings.nodir, dot: true, follow: settings.symlinks, ignore: [
                    ...((_a = settings.exclude) !== null && _a !== void 0 ? _a : []),
                    ...settings.defaultExcludes ? __excludeGlobs() : []
                ] }, settings)));
        });
        // check if need to search for inline content
        if (searchReg) {
            pathes = pathes.filter((path) => {
                if (__isDirectory(path))
                    return false;
                try {
                    const content = __fs.readFileSync(path, 'utf8').toString();
                    const matches = content.match(searchReg);
                    // if (path.includes('/doc/getStarted')) {
                    //   console.log(path, searchReg, searchReg.test(content), matches);
                    // }
                    if (matches && matches.length) {
                        return true;
                    }
                    return false;
                }
                catch (e) {
                    return false;
                }
            });
        }
        pathes.forEach((path) => {
            if (__isDirectory(path)) {
                filesArray.push(path);
                return;
            }
            if (settings.SFile) {
                const sFile = __SFile.new(path, {
                    file: {
                        cwd
                    }
                });
                filesArray.push(sFile);
            }
            else {
                filesArray.push(path);
            }
        });
    }
    // resolve the promise
    return filesArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUF5Q2xELE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLEtBQXdCLEVBQUUsV0FBMEMsRUFBRTtJQUN4RyxRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbEMsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsS0FBSztRQUNaLGFBQWEsRUFBRSxTQUFTO1FBQ3hCLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxlQUFlLEVBQUUsSUFBSTtLQUN0QixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQXlCLEVBQUUsQ0FBQztJQUU1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7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