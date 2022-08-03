// @ts-nocheck
import __SFile from '@coffeekraken/s-file';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';
import __excludeGlobs from '../path/excludeGlobs';
export default function resolveGlob(globs, settings = {}) {
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
                    ...(settings.defaultExcludes ? __excludeGlobs() : []),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLGNBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQXdDbEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLEtBQXdCLEVBQ3hCLFdBQTBDLEVBQUU7SUFFNUMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLElBQUk7UUFDWCxhQUFhLEVBQUUsU0FBUztRQUN4QixLQUFLLEVBQUUsSUFBSTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsZUFBZSxFQUFFLElBQUk7S0FDeEIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUF5QixFQUFFLENBQUM7SUFFNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQ2xC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