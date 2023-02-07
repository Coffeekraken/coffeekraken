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
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __chdir, __copySync } from '@coffeekraken/sugar/fs';
import { __isDirectory } from '@coffeekraken/sugar/is';
import __SCliFsCopyParamsInterface from '../../node/fs/interface/SCliFsCopyParamsInterface';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliFsCopyParamsInterface.apply(stringArgs);
        let files = [finalParams.src];
        if (finalParams.glob) {
            const paths = __SGlob.resolve(finalParams.glob, {
                cwd: finalParams.src,
                nodir: false,
            });
            files = paths.map((f) => f.relPath);
        }
        files.forEach((path, i) => {
            const relPath = path;
            if (finalParams.glob)
                path = `${finalParams.src}/${path}`;
            const type = __isDirectory(path) ? 'directory' : 'file';
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${path}</cyan> to <cyan>${finalParams.glob
                    ? `${finalParams.dest}/${relPath}`
                    : finalParams.dest}</cyan>`,
            });
            // copy the file/directory
            __copySync(path, finalParams.glob
                ? `${finalParams.dest}/${relPath}`
                : finalParams.dest);
            if (finalParams.chdir && files.length === i + 1) {
                __chdir(finalParams.dest);
            }
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLDJCQUEyQixNQUFNLG1EQUFtRCxDQUFDO0FBRTVGLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLFdBQVcsR0FBRywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbEUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDNUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxHQUFHO2dCQUNwQixLQUFLLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztZQUNILEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztZQUVyQixJQUFJLFdBQVcsQ0FBQyxJQUFJO2dCQUFFLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFFMUQsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUV4RCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLHVDQUF1QyxJQUFJLFVBQVUsSUFBSSxvQkFDNUQsV0FBVyxDQUFDLElBQUk7b0JBQ1osQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7b0JBQ2xDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFDdEIsU0FBUzthQUNaLENBQUMsQ0FBQztZQUVILDBCQUEwQjtZQUMxQixVQUFVLENBQ04sSUFBSSxFQUNKLFdBQVcsQ0FBQyxJQUFJO2dCQUNaLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFO2dCQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDekIsQ0FBQztZQUVGLElBQUksV0FBVyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9