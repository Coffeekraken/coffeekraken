import { __globalNodeModulesPath } from '@coffeekraken/sugar/npm';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
export default function packagePath(name, settings) {
    const set = __deepMerge({
        cwd: process.cwd(),
        monorepo: true,
        global: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    let monoDir, globalDir;
    monoDir = `${__packageRootDir(set.cwd, {
        highest: true,
    })}/node_modules`;
    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.cwd}/node_modules/${name}/package.json`)) {
        return __fs.realpathSync(`${set.cwd}/node_modules/${name}`);
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.rootDir) &&
        __fs.existsSync(`${monoDir}/${name}/package.json`)) {
        return __fs.realpathSync(`${monoDir}/${name}`);
    }
    globalDir = __globalNodeModulesPath();
    if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
        return __fs.realpathSync(`${globalDir}/${name}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUErQnRCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQXlCLFdBQVcsQ0FDekM7UUFDSSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNsQixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO0tBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFFdkIsT0FBTyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLGVBQWUsQ0FBQztJQUVsQiw0REFBNEQ7SUFDNUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLElBQUksZUFBZSxDQUFDLEVBQUU7UUFDakUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDL0Q7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUE7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUNwRDtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsU0FBUyxHQUFHLHVCQUF1QixFQUFFLENBQUM7SUFFdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUNwRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwRDtBQUNMLENBQUMifQ==