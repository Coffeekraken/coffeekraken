import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __globalNodeModulesPath from './globalNodeModulesPath';
export default function packagePath(name, settings) {
    const set = __deepMerge({
        rootDir: __SugarConfig.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });
    let monoDir, globalDir;
    monoDir = `${__packageRootDir(process.cwd(), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLHVCQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBK0I5RCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sR0FBRyxHQUF5QixXQUFXLENBQUM7UUFDMUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3pDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFFdkIsT0FBTyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3pDLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsZUFBZSxDQUFDO0lBRWxCLDREQUE0RDtJQUM1RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksZUFBZSxDQUFDLEVBQUU7UUFDeEQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7S0FDbkM7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUE7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUNwRDtRQUNFLE9BQU8sR0FBRyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7S0FDL0I7SUFFRCxTQUFTLEdBQUcsdUJBQXVCLEVBQUUsQ0FBQztJQUV0QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUFFO1FBQ3BFLE9BQU8sR0FBRyxTQUFTLElBQUksSUFBSSxFQUFFLENBQUM7S0FDakM7QUFDTCxDQUFDIn0=