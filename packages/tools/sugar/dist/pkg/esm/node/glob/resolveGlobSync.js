// @ts-nocheck
import __SFile from '@coffeekraken/s-file';
import __excludedGlobs from './excludedGlobs';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';
export default function __resolveGlobSync(globs, settings = {}) {
    settings = __deepMerge({
        cwd: settings.cwd || process.cwd(),
        symlinks: true,
        nodir: true,
        contentRegExp: undefined,
        SFile: true,
        exclude: [],
        defaultExcludes: true,
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
                    cwd,
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
            const innerReg = splits[1]
                .replace(/^\//, '')
                .replace(/\/[a-zA-Z]{0,10}$/, '');
            let flags = splits[1].match(/\/[a-zA-Z]{1,10}$/g);
            if (flags) {
                flags = flags[0].replace('/', '');
            }
            searchReg = new RegExp(innerReg, flags !== null && flags !== void 0 ? flags : '');
        }
        globPattern = splits[0];
        globPattern = __path.resolve(cwd, globPattern);
        const finalPatterns = __expandGlob(globPattern);
        let pathes = [];
        finalPatterns.forEach((pattern) => {
            var _a;
            pathes = pathes.concat(__glob.sync(pattern, Object.assign({ cwd, nodir: settings.nodir, dot: true, follow: settings.symlinks, ignore: [
                    ...((_a = settings.exclude) !== null && _a !== void 0 ? _a : []),
                    ...(settings.defaultExcludes ? __excludedGlobs() : []),
                ] }, settings)));
        });
        // check if need to search for inline content
        if (searchReg) {
            pathes = pathes.filter((path) => {
                try {
                    const content = __fs.readFileSync(path, 'utf8').toString();
                    const matches = content.match(searchReg);
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
            if (settings.SFile) {
                const sFile = __SFile.new(path, {
                    cwd,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQTBDeEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDckMsS0FBd0IsRUFDeEIsV0FBMEMsRUFBRTtJQUU1QyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbEMsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsSUFBSTtRQUNYLGFBQWEsRUFBRSxTQUFTO1FBQ3hCLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxlQUFlLEVBQUUsSUFBSTtLQUN4QixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQXlCLEVBQUUsQ0FBQztJQUU1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFD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