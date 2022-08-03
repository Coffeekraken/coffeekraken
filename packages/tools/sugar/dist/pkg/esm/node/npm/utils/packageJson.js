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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sV0FBVyxNQUFNLGtDQUFrQyxDQUFDO0FBRTNELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQTJCdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLElBQVksRUFDWixRQUF3QztJQUV4QyxNQUFNLEdBQUcsR0FBeUIsV0FBVyxDQUFDO1FBQzFDLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztLQUM1QyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsSUFDSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFDekQ7UUFDRSxNQUFNLElBQUksS0FBSyxDQUNYLHFEQUFxRCxJQUFJLHNGQUFzRixDQUNsSixDQUFDO0tBQ0w7SUFFRCxnQkFBZ0I7SUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQ25FLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=