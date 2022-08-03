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
import __SCliMonoListParamsInterface from '../node/interface/SCliMonoListParamsInterface';
import __SGlob from '@coffeekraken/s-glob';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliMonoListParamsInterface.apply(stringArgs);
        const root = __packageRoot(process.cwd(), {
            highest: true,
        });
        const rootPackageJson = __readJsonSync(`${root}/package.json`);
        const files = __SGlob.resolve(finalParams.packagesGlobs, {
            cwd: root,
        });
        emit('log', {
            value: `<cyan>${files.length}</cyan> packages found:`,
        });
        files.forEach((file) => {
            let version = 'unknown', name, path = file.relPath;
            if (file.relPath.match(/package\.json$/)) {
                const json = __readJsonSync(file.path);
                version = json.version;
                name = json.name;
                console.log(file.relPath);
                if (json.type !== 'module') {
                }
            }
            // emit('log', {
            //     value: `<yellow>${
            //         name ?? file.relPath.split('/').pop()
            //     }</yellow> (<${
            //         version === rootPackageJson.version ? 'green' : 'red'
            //     }>${version}</${
            //         version === rootPackageJson.version ? 'green' : 'red'
            //     }>) <cyan>${path}</cyan>`,
            // });
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLDZCQUE2QixNQUFNLCtDQUErQyxDQUFDO0FBQzFGLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBRXRFLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLFdBQVcsR0FBRyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEUsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QyxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFFSCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtZQUNyRCxHQUFHLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsU0FBUyxLQUFLLENBQUMsTUFBTSx5QkFBeUI7U0FDeEQsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25CLElBQUksT0FBTyxHQUFHLFNBQVMsRUFDbkIsSUFBSSxFQUNKLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRXhCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDdEMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtpQkFDM0I7YUFDSjtZQUVELGdCQUFnQjtZQUNoQix5QkFBeUI7WUFDekIsZ0RBQWdEO1lBQ2hELHNCQUFzQjtZQUN0QixnRUFBZ0U7WUFDaEUsdUJBQXVCO1lBQ3ZCLGdFQUFnRTtZQUNoRSxpQ0FBaUM7WUFDakMsTUFBTTtRQUNWLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=