import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import __globalNodeModulesPath from '../npm/globalNodeModulesPath';
import __packageRootDir from '../path/packageRootDir';
export default function packagePathSync(name, settings) {
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
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.cwd) &&
        __fs.existsSync(`${monoDir}/${name}/package.json`)) {
        return __fs.realpathSync(`${monoDir}/${name}`);
    }
    globalDir = __globalNodeModulesPath();
    if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
        return __fs.realpathSync(`${globalDir}/${name}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLHVCQUF1QixNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFpQ3RELE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUNuQyxJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQXlCLFdBQVcsQ0FDekM7UUFDSSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNsQixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO0tBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFFdkIsT0FBTyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLGVBQWUsQ0FBQztJQUVsQiw0REFBNEQ7SUFDNUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLElBQUksZUFBZSxDQUFDLEVBQUU7UUFDakUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDL0Q7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLENBQUE7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUNwRDtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsU0FBUyxHQUFHLHVCQUF1QixFQUFFLENBQUM7SUFFdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUNwRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwRDtBQUNMLENBQUMifQ==