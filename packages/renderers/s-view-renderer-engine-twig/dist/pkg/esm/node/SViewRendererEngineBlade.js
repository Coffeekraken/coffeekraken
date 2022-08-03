import __SPromise from '@coffeekraken/s-promise';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __path from 'path';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineBladeSettingsInterface';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, viewRendererSettings) {
        return new __SPromise(({ resolve, reject, emit }) => {
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
            resolve(__execPhp(__path.resolve(__packageRoot(__dirname()), 'src/php/compile.php'), {
                rootDirs: __unique([
                    ...viewRendererSettings.rootDirs,
                ]),
                viewDotPath,
                data,
                cacheDir: viewRendererSettings.cacheDir,
            }, {
                paramsThroughFile: true,
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sU0FBUyxNQUFNLHNDQUFzQyxDQUFDO0FBQzdELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTywyQ0FBMkMsTUFBTSx1REFBdUQsQ0FBQztBQUVoSCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQWlCdEUsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBd0I7SUFNekMsWUFBWSxRQUFxRDtRQUZqRSxhQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUc3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUNGLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLG9CQUE0QztRQUU1QyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLE1BQU0sQ0FDVCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDcEYsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMxQyxTQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDM0IsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLFdBQVc7aUJBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLE9BQU8sQ0FDSCxTQUFTLENBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FDVixhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDMUIscUJBQXFCLENBQ3hCLEVBQ0Q7Z0JBQ0ksUUFBUSxFQUFFLFFBQVEsQ0FBQztvQkFDZixHQUFHLG9CQUFvQixDQUFDLFFBQVE7aUJBQ25DLENBQUM7Z0JBQ0YsV0FBVztnQkFDWCxJQUFJO2dCQUNKLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRO2FBQzFDLEVBQ0Q7Z0JBQ0ksaUJBQWlCLEVBQUUsSUFBSTthQUMxQixDQUNKLENBQ0osQ0FBQztRQUNOLENBQUMsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUEvRE0sMkJBQUUsR0FBRyxPQUFPLENBQUM7QUFDYixtQ0FBVSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0IsMENBQWlCLEdBQUcsMkNBQTJDLENBQUMifQ==