var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __dirName from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __fs from 'fs';
import __SCliAddManifestJsonParamsInterface from '../../node/add/interface/SCliAddManifestJsonParamsInterface';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliAddManifestJsonParamsInterface.apply(stringArgs);
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[manifestJson]</yellow> Adding the manifest.json file`,
        });
        const packageJson = __packageJson();
        if (__fs.existsSync(`${process.cwd()}/manifest.json`)) {
            const json = __readJsonSync(`${process.cwd()}/manifest.json`);
            json.short_name = packageJson.name;
            json.name = packageJson.description;
            __writeJsonSync(`${process.cwd()}/manifest.json`, json);
        }
        else {
            const json = __readJsonSync(`${__packageRoot(__dirName())}/src/cli/add/data/manifest.json`);
            json.short_name = packageJson.name;
            json.name = packageJson.description;
            __writeJsonSync(`${process.cwd()}/manifest.json`, json);
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxvQ0FBb0MsTUFBTSw2REFBNkQsQ0FBQztBQUMvRyxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUV0RSxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxXQUFXLEdBQUcsb0NBQW9DLENBQUMsS0FBSyxDQUMxRCxVQUFVLENBQ2IsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDdEIsS0FBSyxFQUFFLCtEQUErRDtTQUN6RSxDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxhQUFhLEVBQUUsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLEVBQUU7WUFDbkQsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDcEMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzRDthQUFNO1lBQ0gsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUN2QixHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FDakUsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDcEMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzRDtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9