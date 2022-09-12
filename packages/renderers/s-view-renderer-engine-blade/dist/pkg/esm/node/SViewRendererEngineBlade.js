import __SBench from '@coffeekraken/s-bench';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __execPhp } from '@coffeekraken/sugar/exec';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __path from 'path';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineBladeSettingsInterface';
export default class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new __SPromise(({ resolve, reject, emit }) => {
            if (!__fs.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            __SBench.start('SViewRendererEngineBlade.render');
            __SBench.step('SViewRendererEngineBlade.render', `beforeRender.${viewPath}`);
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
            resPro.then((res) => {
                resolve({
                    value: res,
                });
                // if (res.match(//))
                __SBench.step('SViewRendererEngineBlade.render', `afterRender.${viewPath}`);
                __SBench.end('SViewRendererEngineBlade.render').log();
            }, (e) => {
                // @TODO            make the 'log' event displayed on the terminal
                emit('log', {
                    type: __SLog.TYPE_ERROR,
                    value: e,
                });
                resolve({
                    error: e,
                });
                __SBench.step('SViewRendererEngineBlade.render', `afterRender.${viewPath}`);
                __SBench.end('SViewRendererEngineBlade.render').log();
            });
        }, {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
SViewRendererEngineBlade.id = 'blade';
SViewRendererEngineBlade.extensions = ['blade.php'];
SViewRendererEngineBlade.settingsInterface = __SViewRendererBladeEngineSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLDJDQUEyQyxNQUFNLHVEQUF1RCxDQUFDO0FBaUJoSCxNQUFNLENBQUMsT0FBTyxPQUFPLHdCQUF3QjtJQU16QyxZQUFZLFFBQXFEO1FBRmpFLGFBQVEsR0FBc0MsRUFBRSxDQUFDO1FBRzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQ0YsUUFBZ0IsRUFDaEIsT0FBWSxFQUFFLEVBQ2Qsa0JBQTBCLEVBQzFCLG9CQUE0QztRQUU1QyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLE1BQU0sQ0FDVCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDcEYsQ0FBQzthQUNMO1lBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBRWxELFFBQVEsQ0FBQyxJQUFJLENBQ1QsaUNBQWlDLEVBQ2pDLGdCQUFnQixRQUFRLEVBQUUsQ0FDN0IsQ0FBQztZQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzNCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDMUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxXQUFXO2lCQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUvQixrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBRTlDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FDcEIsTUFBTSxDQUFDLE9BQU8sQ0FDVixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixxQkFBcUIsQ0FDeEIsRUFDRDtnQkFDSSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsV0FBVztnQkFDWCxJQUFJO2dCQUNKLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRO2FBQzFDLEVBQ0Q7Z0JBQ0ksaUJBQWlCLEVBQUUsSUFBSTthQUMxQixDQUNKLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUNQLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ0osT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxHQUFHO2lCQUNiLENBQUMsQ0FBQztnQkFFSCxxQkFBcUI7Z0JBRXJCLFFBQVEsQ0FBQyxJQUFJLENBQ1QsaUNBQWlDLEVBQ2pDLGVBQWUsUUFBUSxFQUFFLENBQzVCLENBQUM7Z0JBRUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFELENBQUMsRUFDRCxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNGLGtFQUFrRTtnQkFDbEUsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVU7b0JBQ3ZCLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FBQztnQkFFSCxPQUFPLENBQUM7b0JBQ0osS0FBSyxFQUFFLENBQUM7aUJBQ1gsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxJQUFJLENBQ1QsaUNBQWlDLEVBQ2pDLGVBQWUsUUFBUSxFQUFFLENBQzVCLENBQUM7Z0JBRUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFELENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQXhHTSwyQkFBRSxHQUFHLE9BQU8sQ0FBQztBQUNiLG1DQUFVLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzQiwwQ0FBaUIsR0FBRywyQ0FBMkMsQ0FBQyJ9