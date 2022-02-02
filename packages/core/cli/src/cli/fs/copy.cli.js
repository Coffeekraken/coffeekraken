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
import __SCliFsCopyParamsInterface from '../../node/fs/interface/SCliFsCopyParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __isDirectory from '@coffeekraken/sugar/node/is/directory';
import __SLog from '@coffeekraken/s-log';
import __SGlob from '@coffeekraken/s-glob';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliFsCopyParamsInterface.apply(stringArgs);
        let files = [finalParams.src];
        if (finalParams.glob) {
            const paths = __SGlob.resolve(finalParams.glob, {
                cwd: finalParams.src,
                nodir: false
            });
            files = paths.map(f => f.relPath);
        }
        files.forEach((path, i) => {
            const relPath = path;
            if (finalParams.glob)
                path = `${finalParams.src}/${path}`;
            const type = __isDirectory(path) ? 'directory' : 'file';
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${path}</cyan> to <cyan>${finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest}</cyan>`,
            });
            // copy the file/directory
            __copySync(path, finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest);
            if (finalParams.chdir && files.length === i + 1) {
                process.chdir(finalParams.dest);
                emit('chdir', finalParams.dest);
            }
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3B5LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2QsT0FBTywyQkFBMkIsTUFBTSxtREFBbUQsQ0FBQztBQUM1RixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGFBQWEsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRSxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWxFLElBQUksS0FBSyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtZQUNsQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzVDLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRztnQkFDcEIsS0FBSyxFQUFFLEtBQUs7YUFDZixDQUFDLENBQUM7WUFDSCxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQztRQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFFdEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRXJCLElBQUksV0FBVyxDQUFDLElBQUk7Z0JBQUUsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUUxRCxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBRXhELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsdUNBQXVDLElBQUksVUFBVSxJQUFJLG9CQUFvQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVM7YUFDdEssQ0FBQyxDQUFDO1lBRUgsMEJBQTBCO1lBQzFCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekYsSUFBSSxXQUFXLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUVkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==