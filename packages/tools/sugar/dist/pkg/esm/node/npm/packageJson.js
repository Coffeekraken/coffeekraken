import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import __packageRoot from '../path/packageRoot';
import __globalNodeModulesPath from './globalNodeModulesPath';
export default function packageJson(name, settings) {
    const set = __deepMerge({
        rootDir: __SugarConfig.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });
    let json, monoDir, globalDir;
    monoDir = `${__packageRoot(process.cwd(), {
        highest: true,
    })}/node_modules`;
    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.rootDir}/${name}/package.json`)) {
        json = JSON.parse(__fs.readFileSync(`${set.rootDir}/${name}/package.json`, 'utf8'));
        return json;
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.rootDir) &&
        __fs.existsSync(`${monoDir}/${name}/package.json`)) {
        json = JSON.parse(__fs.readFileSync(`${monoDir}/${name}/package.json`, 'utf8'));
        return json;
    }
    globalDir = __globalNodeModulesPath();
    if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
        json = JSON.parse(__fs.readFileSync(`${globalDir}/${name}/package.json`, 'utf8'));
        return json;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLHVCQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBK0I5RCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sR0FBRyxHQUF5QixXQUFXLENBQUM7UUFDMUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3pDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDO0lBRTdCLE9BQU8sR0FBRyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdEMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxlQUFlLENBQUM7SUFFbEIsNERBQTREO0lBQzVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUN4RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FDbkUsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUE7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUNwRDtRQUNFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQy9ELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsU0FBUyxHQUFHLHVCQUF1QixFQUFFLENBQUM7SUFFdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUNwRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxJQUFJLElBQUksZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUNqRSxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUMifQ==