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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGVWaWV3RW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxhZGVWaWV3RW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQU10QixPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUUvRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFNBQVMsTUFBTSxzQ0FBc0MsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7R0FXRztBQUNILGVBQWU7SUFDWCxRQUFRLEVBQUUsRUFBRTtJQUNaLE1BQU0sQ0FBQyxRQUFnQixFQUFFLE9BQVksRUFBRSxFQUFFLFFBQWdDO1FBQ3JFLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxDQUFDLDRDQUE0QyxRQUFRLDZCQUE2QixDQUFDLENBQUM7YUFDcEc7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQzFEO1lBRUQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzNCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzlDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV6RSxPQUFPLENBQ0gsU0FBUyxDQUNMLFNBQVMsRUFBRSxHQUFHLGNBQWMsRUFDNUI7Z0JBQ0ksUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQyxXQUFXO2dCQUNYLElBQUk7Z0JBQ0osUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2FBQzlCLEVBQ0Q7Z0JBQ0ksaUJBQWlCLEVBQUUsSUFBSTthQUMxQixDQUNKLENBQ0osQ0FBQztRQUNOLENBQUMsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==