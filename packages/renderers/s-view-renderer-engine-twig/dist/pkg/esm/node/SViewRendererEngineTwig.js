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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';
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
            __unique([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewPath = viewPath.replace(`${path}/`, '');
            });
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = __execPhp(__path.resolve(__packageRoot(__dirname()), 'src/php/compile.php'), {
                rootDirs: __unique([...viewRendererSettings.rootDirs]),
                viewPath,
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
                console.log(e, {
                    viewPath,
                    data,
                });
                emit('log', {
                    type: __SLog.TYPE_ERROR,
                    value: e,
                });
            });
            const res = yield resPro;
            resolve(res);
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
SViewRendererEngineTwig.id = 'twig';
SViewRendererEngineTwig.extensions = ['.twig'];
SViewRendererEngineTwig.settingsInterface = __SViewRendererTwigEngineSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLHNDQUFzQyxDQUFDO0FBQzdELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTywwQ0FBMEMsTUFBTSxzREFBc0QsQ0FBQztBQWlCOUcsTUFBTSxDQUFDLE9BQU8sT0FBTyx1QkFBdUI7SUFNeEMsWUFBWSxRQUFvRDtRQUZoRSxhQUFRLEdBQXFDLEVBQUUsQ0FBQztRQUc1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUNGLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLGtCQUEwQixFQUMxQixvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxNQUFNLENBQ1QsNENBQTRDLFFBQVEsNkJBQTZCLENBQ3BGLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBRUgsa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUU5QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQ1YsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzFCLHFCQUFxQixDQUN4QixFQUNEO2dCQUNJLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxRQUFRO2dCQUNSLElBQUk7Z0JBQ0osUUFBUSxFQUFFLG9CQUFvQixDQUFDLFFBQVE7YUFDMUMsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsV0FBVzthQUNyQixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2Ysa0VBQWtFO2dCQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDWCxRQUFRO29CQUNSLElBQUk7aUJBQ1AsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVO29CQUN2QixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUE3RU0sMEJBQUUsR0FBRyxNQUFNLENBQUM7QUFDWixrQ0FBVSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkIseUNBQWlCLEdBQUcsMENBQTBDLENBQUMifQ==