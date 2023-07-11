import __SBench from '@coffeekraken/s-bench';
import { __unique } from '@coffeekraken/sugar/array';
import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineBladeSettingsInterface.js';
export default class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new Promise((resolve) => {
            const bench = new __SBench(`SViewRendererEngineBlade.render.${viewPath.replace(__packageRootDir(), '')}`);
            bench.step(`beforeRender`);
            if (!__fs.existsSync(`${viewRendererSettings.cacheDir}/blade`)) {
                __fs.mkdirSync(`${viewRendererSettings.cacheDir}/blade`, {
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
            resPro.then((res) => {
                resolve({
                    value: res,
                });
                // if (res.match(//))
                bench.end();
            }, (e) => {
                // @TODO            make the 'log' event displayed on the terminal
                console.error(e);
                resolve({
                    error: e,
                });
                bench.end();
            });
        });
    }
}
SViewRendererEngineBlade.id = 'blade';
SViewRendererEngineBlade.extensions = ['blade.php'];
SViewRendererEngineBlade.settingsInterface = __SViewRendererBladeEngineSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTywyQ0FBMkMsTUFBTSwwREFBMEQsQ0FBQztBQW1CbkgsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBd0I7SUFNekMsWUFBWSxRQUFxRDtRQUZqRSxhQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUc3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUNGLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLGtCQUEwQixFQUMxQixvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUN0QixtQ0FBbUMsUUFBUSxDQUFDLE9BQU8sQ0FDL0MsZ0JBQWdCLEVBQUUsRUFDbEIsRUFBRSxDQUNMLEVBQUUsQ0FDTixDQUFDO1lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsUUFBUSxDQUFDLEVBQUU7Z0JBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLFFBQVEsRUFBRTtvQkFDckQsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzNCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDMUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxXQUFXO2lCQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUvQixrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBRTlDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FDcEIsTUFBTSxDQUFDLE9BQU8sQ0FDVixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixxQkFBcUIsQ0FDeEIsRUFDRDtnQkFDSSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsV0FBVztnQkFDWCxJQUFJO2dCQUNKLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRO2FBQzFDLEVBQ0Q7Z0JBQ0ksaUJBQWlCLEVBQUUsSUFBSTthQUMxQixDQUNKLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUNQLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ0osT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxHQUFHO2lCQUNiLENBQUMsQ0FBQztnQkFFSCxxQkFBcUI7Z0JBRXJCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoQixDQUFDLEVBQ0QsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDRixrRUFBa0U7Z0JBQ2xFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWpCLE9BQU8sQ0FBQztvQkFDSixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7Z0JBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztBQWpGTSwyQkFBRSxHQUFHLE9BQU8sQ0FBQztBQUNiLG1DQUFVLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzQiwwQ0FBaUIsR0FBRywyQ0FBMkMsQ0FBQyJ9