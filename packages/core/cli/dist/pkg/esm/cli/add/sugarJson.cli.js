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
import __SCliAddSugarJsonParamsInterface from '../../node/add/interface/SCliAddSugarJsonParamsInterface';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __fs from 'fs';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliAddSugarJsonParamsInterface.apply(stringArgs);
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[sugarJson]</yellow> Adding the sugar.json file with the recipe <cyan>${finalParams.recipe}</cyan>`,
        });
        if (__fs.existsSync(`${process.cwd()}/sugar.json`)) {
            const json = __readJsonSync(`${process.cwd()}/sugar.json`);
            json.recipe = finalParams.recipe;
            __writeJsonSync(`${process.cwd()}/sugar.json`, json);
        }
        else {
            __writeJsonSync(`${process.cwd()}/sugar.json`, {
                recipe: finalParams.recipe
            });
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGlDQUFpQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ3pHLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxXQUFXLEdBQUcsaUNBQWlDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDdEIsS0FBSyxFQUFFLGlGQUFpRixXQUFXLENBQUMsTUFBTSxTQUFTO1NBQ3RILENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDakMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNILGVBQWUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFO2dCQUMzQyxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07YUFDN0IsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==