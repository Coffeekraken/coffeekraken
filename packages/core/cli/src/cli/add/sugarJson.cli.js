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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJKc29uLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Z2FySnNvbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8saUNBQWlDLE1BQU0sMERBQTBELENBQUM7QUFDekcsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxjQUFjLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtRQUMxRCxNQUFNLFdBQVcsR0FBRyxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQUUsaUZBQWlGLFdBQVcsQ0FBQyxNQUFNLFNBQVM7U0FDdEgsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsRUFBRTtZQUNoRCxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUNqQyxlQUFlLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0gsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUU7Z0JBQzNDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTthQUM3QixDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9