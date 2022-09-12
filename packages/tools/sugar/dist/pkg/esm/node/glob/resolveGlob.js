// @ts-nocheck
import __SFile from '@coffeekraken/s-file';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';
import { __excludedGlobs } from '@coffeekraken/sugar/glob';
export default function __resolveGlob(globs, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUF3QzNELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUNqQyxLQUF3QixFQUN4QixXQUEwQyxFQUFFO0lBRTVDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNsQyxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsYUFBYSxFQUFFLFNBQVM7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsRUFBRTtRQUNYLGVBQWUsRUFBRSxJQUFJO0tBQ3hCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBeUIsRUFBRSxDQUFDO0lBRTVDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMs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