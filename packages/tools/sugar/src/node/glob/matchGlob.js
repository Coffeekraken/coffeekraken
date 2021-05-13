import __fs from 'fs';
import __toRegex from 'to-regex';
import __minimatch from 'minimatch';
import __deepMerge from '../../shared/object/deepMerge';
import __isDirectory from '../is/directory';
import __expandGlob from '../../shared/glob/expandGlob';
import __path from 'path';
export default function matchGlob(input, glob, settings) {
    var _a, _b;
    settings = __deepMerge({
        cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
        symlinks: true,
        nodir: true
    }, settings !== null && settings !== void 0 ? settings : {});
    if (Array.isArray(glob)) {
        for (let i = 0; i < glob.length; i++) {
            if (matchGlob(input, glob[i], settings))
                return true;
        }
        return false;
    }
    const splits = glob.split(':');
    const pattern = splits[0]
        .replace(`${settings.cwd}/`, '')
        .replace(settings.cwd, '');
    const regex = splits[1];
    const fullFilePath = __path.resolve((_b = settings.cwd) !== null && _b !== void 0 ? _b : '', input);
    const expandedGlobs = __expandGlob(pattern);
    let hasMatch = false;
    for (let i = 0; i < expandedGlobs.length; i++) {
        const g = expandedGlobs[i];
        if (__minimatch(input, g)) {
            hasMatch = true;
            break;
        }
    }
    if (!hasMatch)
        return false;
    if (!__fs.existsSync(fullFilePath))
        return false;
    if (settings.nodir && __isDirectory(fullFilePath))
        return false;
    if (regex) {
        const fileContent = __fs.readFileSync(fullFilePath, 'utf8').toString();
        const regSplits = regex.split('/').splice(1);
        const regString = regSplits[0];
        const flags = regSplits[regSplits.length - 1];
        const searchReg = __toRegex(regString, {
            flags
        });
        if (!fileContent.match(searchReg))
            return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hHbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF0Y2hHbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFDakMsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sWUFBWSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQThCMUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQy9CLEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBc0M7O0lBRXRDLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsR0FBRyxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsbUNBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO0tBQ1osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztTQUN0RDtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEIsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFBLFFBQVEsQ0FBQyxHQUFHLG1DQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUvRCxNQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzdDLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDekIsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNoQixNQUFNO1NBQ1A7S0FDRjtJQUNELElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDakQsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVoRSxJQUFJLEtBQUssRUFBRTtRQUNULE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQ3JDLEtBQUs7U0FDTixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUNqRDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyJ9