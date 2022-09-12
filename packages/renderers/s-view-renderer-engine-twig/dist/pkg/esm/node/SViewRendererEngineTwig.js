var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __execPhp } from '@coffeekraken/sugar/exec';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __path from 'path';
import __SViewRendererTwigEngineSettingsInterface from './interface/SViewRendererEngineTwigSettingsInterface';
export default class SViewRendererEngineTwig {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            if (!__fs.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            if (!__fs.existsSync(viewRendererSettings.cacheDir)) {
                __fs.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            let viewDotPath = viewPath;
            __unique([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewDotPath = viewDotPath.replace(`${path}/`, '');
            });
            viewDotPath = viewDotPath
                .split('/')
                .join('.')
                .replace('.blade.php', '');
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = __execPhp(__path.resolve(__packageRootDir(__dirname()), 'src/php/compile.php'), {
                rootDirs: __unique([...viewRendererSettings.rootDirs]),
                viewDotPath,
                data,
                cacheDir: viewRendererSettings.cacheDir,
            }, {
                paramsThroughFile: true,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: 'ehheineij',
            });
            resPro.catch((e) => {
                // @TODO            make the 'log' event displayed on the terminal
                emit('log', {
                    type: __SLog.TYPE_ERROR,
                    value: e,
                });
                resolve({
                    error: e,
                });
            });
            const res = yield resPro;
            resolve({
                value: res,
            });
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
SViewRendererEngineTwig.id = 'twig';
SViewRendererEngineTwig.extensions = ['twig'];
SViewRendererEngineTwig.settingsInterface = __SViewRendererTwigEngineSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLDBDQUEwQyxNQUFNLHNEQUFzRCxDQUFDO0FBaUI5RyxNQUFNLENBQUMsT0FBTyxPQUFPLHVCQUF1QjtJQU14QyxZQUFZLFFBQW9EO1FBRmhFLGFBQVEsR0FBcUMsRUFBRSxDQUFDO1FBRzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQ0YsUUFBZ0IsRUFDaEIsT0FBWSxFQUFFLEVBQ2Qsa0JBQTBCLEVBQzFCLG9CQUE0QztRQUU1QyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLE1BQU0sQ0FDVCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDcEYsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMxQyxTQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDM0IsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLFdBQVc7aUJBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFFOUMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUNwQixNQUFNLENBQUMsT0FBTyxDQUNWLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzdCLHFCQUFxQixDQUN4QixFQUNEO2dCQUNJLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxXQUFXO2dCQUNYLElBQUk7Z0JBQ0osUUFBUSxFQUFFLG9CQUFvQixDQUFDLFFBQVE7YUFDMUMsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsV0FBVzthQUNyQixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2Ysa0VBQWtFO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVTtvQkFDdkIsS0FBSyxFQUFFLENBQUM7aUJBQ1gsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQztvQkFDSixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQztnQkFDSixLQUFLLEVBQUUsR0FBRzthQUNiLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQW5GTSwwQkFBRSxHQUFHLE1BQU0sQ0FBQztBQUNaLGtDQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0Qix5Q0FBaUIsR0FBRywwQ0FBMEMsQ0FBQyJ9