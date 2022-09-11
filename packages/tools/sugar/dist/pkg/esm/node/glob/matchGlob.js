import __fs from 'fs';
import __toRegex from 'to-regex';
import __minimatch from 'minimatch';
import __deepMerge from '../../shared/object/deepMerge';
import __isDirectory from '../is/directory';
import __expandGlob from '../../shared/glob/expandGlob';
import __path from 'path';
export default function __matchGlob(input, glob, settings) {
    var _a, _b;
    settings = __deepMerge({
        cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
        symlinks: true,
        nodir: true,
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
            flags,
        });
        if (!fileContent.match(searchReg))
            return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFDakMsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sWUFBWSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQWdDMUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBc0M7O0lBRXRDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksR0FBRyxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsbUNBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDeEQ7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNwQixPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQy9CLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsUUFBUSxDQUFDLEdBQUcsbUNBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRS9ELE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0MsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN2QixRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE1BQU07U0FDVDtLQUNKO0lBQ0QsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNqRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDLFlBQVksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRWhFLElBQUksS0FBSyxFQUFFO1FBQ1AsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkUsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDbkMsS0FBSztTQUNSLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9