import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';
/**
 * @name            bladeViewEngine
 * @namespace       s-render.engines
 * @type            ISViewEngine
 *
 * This is the blade.php view engine that allows you
 * to render .blade.php views.
 *
 * @see             https://github.com/jenssegers/blade
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'blade',
    settings: {},
    render(viewPath, data = {}, settings) {
        return new __SPromise(({ resolve, reject, emit }) => {
            if (!__fs.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            if (!__fs.existsSync(settings.cacheDir)) {
                __fs.mkdirSync(settings.cacheDir, { recursive: true });
            }
            let viewDotPath = viewPath;
            __unique([...settings.rootDirs]).forEach((path) => {
                viewDotPath = viewDotPath.replace(`${path}/`, '');
            });
            viewDotPath = viewDotPath.split('/').join('.').replace('.blade.php', '');
            resolve(__execPhp(__dirname() + '/compile.php', {
                rootDirs: __unique([...settings.rootDirs]),
                viewDotPath,
                data,
                cacheDir: settings.cacheDir,
            }, {
                paramsThroughFile: true,
            }));
        }, {
            eventEmitter: {
                bind: this,
            },
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGVWaWV3RW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxhZGVWaWV3RW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQU10QixPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUUvRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFNBQVMsTUFBTSxzQ0FBc0MsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7R0FXRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsT0FBTztJQUNYLFFBQVEsRUFBRSxFQUFFO0lBQ1osTUFBTSxDQUFDLFFBQWdCLEVBQUUsT0FBWSxFQUFFLEVBQUUsUUFBZ0M7UUFDckUsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxNQUFNLENBQUMsNENBQTRDLFFBQVEsNkJBQTZCLENBQUMsQ0FBQzthQUNwRztZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDMUQ7WUFFRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDM0IsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDOUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXpFLE9BQU8sQ0FDSCxTQUFTLENBQ0wsU0FBUyxFQUFFLEdBQUcsY0FBYyxFQUM1QjtnQkFDSSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLFdBQVc7Z0JBQ1gsSUFBSTtnQkFDSixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7YUFDOUIsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FDSixDQUFDO1FBQ04sQ0FBQyxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9