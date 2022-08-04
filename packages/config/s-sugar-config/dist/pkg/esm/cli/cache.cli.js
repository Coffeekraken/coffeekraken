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
import __SPromise from '@coffeekraken/s-promise';
import __SCliConfigCacheParamsInterface from './interface/SCliConfigCacheParamsInterface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliConfigCacheParamsInterface.apply(stringArgs);
        const config = yield __SSugarConfig.load(finalParams.id);
        const filePath = yield config.instance.cache();
        // __fs.mkdirSync(finalParams.cacheDir, { recursive: true });
        // __fs.writeFileSync(
        //     `${finalParams.cacheDir}/${finalParams.id}.json`,
        //     JSON.stringify(config.instance.toJson(), null, 4),
        // );
        emit('log', {
            value: `<green>[cache]</green> The "<yellow>${finalParams.id}</yellow>" config has been cached <green>successfully</green> under <cyan>${filePath}</cyan>`,
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRzFGLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLFdBQVcsR0FBRyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFL0MsNkRBQTZEO1FBQzdELHNCQUFzQjtRQUN0Qix3REFBd0Q7UUFDeEQseURBQXlEO1FBQ3pELEtBQUs7UUFFTCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLHVDQUF1QyxXQUFXLENBQUMsRUFBRSw2RUFBNkUsUUFBUSxTQUFTO1NBQzdKLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9