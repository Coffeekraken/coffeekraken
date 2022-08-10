import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import __packageRoot from '../path/packageRoot';
import __globalNodeModulesPath from './globalNodeModulesPath';
export default function packagePath(name, settings) {
    const set = __deepMerge({
        rootDir: __SugarConfig.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });
    let monoDir, globalDir;
    monoDir = `${__packageRoot(process.cwd(), {
        highest: true,
    })}/node_modules`;
    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.rootDir}/${name}/package.json`)) {
        return `${set.rootDir}/${name}`;
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.rootDir) &&
        __fs.existsSync(`${monoDir}/${name}/package.json`)) {
        return `${monoDir}/${name}`;
    }
    globalDir = __globalNodeModulesPath();
    if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
        return `${globalDir}/${name}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLHVCQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBK0I5RCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sR0FBRyxHQUF5QixXQUFXLENBQUM7UUFDMUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3pDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFFdkIsT0FBTyxHQUFHLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN0QyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLGVBQWUsQ0FBQztJQUVsQiw0REFBNEQ7SUFDNUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUFFO1FBQ3hELE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ25DO0lBRUQsSUFDSSxHQUFHLENBQUMsUUFBUTtRQUNaLE9BQU8sTUFBSyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxDQUFBO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFDcEQ7UUFDRSxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQy9CO0lBRUQsU0FBUyxHQUFHLHVCQUF1QixFQUFFLENBQUM7SUFFdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUNwRSxPQUFPLEdBQUcsU0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ2pDO0FBQ0wsQ0FBQyJ9