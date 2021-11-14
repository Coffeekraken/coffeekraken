import __SugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '../../../shared/object/deepMerge';
import __fs from 'fs';
export default function packageJson(name, settings) {
    const set = __deepMerge({
        rootDir: __SugarConfig.get('npm.rootDir'),
    });
    // check if the package exists
    if (!__fs.existsSync(`${set.rootDir}/${name}`) ||
        !__fs.existsSync(`${set.rootDir}/${name}/package.json`)) {
        throw new Error(`packageJson: Sorry but the package named "<yellow>${name}</yellow>" from which you try to get the package.json content seems to not exists...`);
    }
    // read the file
    const json = JSON.parse(__fs.readFileSync(`${set.rootDir}/${name}/package.json`, 'utf8'));
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUUzRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUEyQnRCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQXlCLFdBQVcsQ0FBQztRQUMxQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7S0FDNUMsQ0FBQyxDQUFDO0lBRUgsOEJBQThCO0lBQzlCLElBQ0ksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksZUFBZSxDQUFDLEVBQ3pEO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FDWCxxREFBcUQsSUFBSSxzRkFBc0YsQ0FDbEosQ0FBQztLQUNMO0lBRUQsZ0JBQWdCO0lBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUNuRSxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9