// @ts-nocheck
import __packageRoot from './rootPath';
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';
import __standardizeJson from '../../shared/npm/utils/standardizeJson';
import __objectHash from '../../shared/object/objectHash';
let __packageJson = {};
function jsonSync(from = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, standardize: false }, settings !== null && settings !== void 0 ? settings : {});
    const hash = __objectHash(Object.assign({ from }, finalSettings));
    if (__packageJson[hash]) {
        return __packageJson[hash];
    }
    const path = `${__packageRoot(from, finalSettings.highest)}/package.json`;
    if (!__fs.existsSync(path))
        return false;
    let json = __readJsonSync(path);
    if (finalSettings.standardize) {
        json = __standardizeJson(json);
    }
    // cache
    if (!__packageJson[hash])
        __packageJson[hash] = json;
    return json;
}
export default jsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvblN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc29uU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sWUFBWSxDQUFDO0FBQ3ZDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLGlCQUFpQixNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZFLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBK0IxRCxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDdkIsU0FBUyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUE0QztJQUNoRixNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLEtBQUssRUFDZCxXQUFXLEVBQUUsS0FBSyxJQUNmLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLFlBQVksaUJBQ3JCLElBQUksSUFDRCxhQUFhLEVBQ2xCLENBQUM7SUFHSCxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyQixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtJQUVELE1BQU0sSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztJQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV6QyxJQUFJLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFO1FBQzNCLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQztJQUVELFFBQVE7SUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFckQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=