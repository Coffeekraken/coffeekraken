// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packageRoot from './rootPath';
import __fs from 'fs';
import __standardizeJson from '../../shared/npm/utils/standardizeJson';
const __packageJson = {};
function json(from = process.cwd(), settings) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const finalSettings = Object.assign({ highest: false, standardize: false }, settings !== null && settings !== void 0 ? settings : {});
        const hash = __objectHash(Object.assign({ from }, finalSettings));
        if (__packageJson[hash]) {
            return resolve(__packageJson[hash]);
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
        resolve(json);
    }));
}
export default json;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sYUFBYSxNQUFNLFlBQVksQ0FBQztBQUN2QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsT0FBTyxpQkFBaUIsTUFBTSx3Q0FBd0MsQ0FBQztBQWdDdkUsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLFNBQVMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBNEM7SUFFNUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBRWpDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsS0FBSyxFQUNkLFdBQVcsRUFBRSxLQUFLLElBQ2YsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNwQixDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsWUFBWSxpQkFDckIsSUFBSSxJQUNELGFBQWEsRUFDbEIsQ0FBQztRQUVILElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQzFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXpDLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsSUFBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsUUFBUTtRQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVyRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxlQUFlLElBQUksQ0FBQyJ9