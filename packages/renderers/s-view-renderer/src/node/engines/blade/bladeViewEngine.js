var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __execPhp from 'exec-php';
import __childProcess from 'child_process';
import __unique from '@coffeekraken/sugar/shared/array/unique';
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
        return new __SPromise(({ resolve, reject }) => {
            if (!__fs.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            if (!__fs.existsSync(settings.cacheDir)) {
                __fs.mkdirSync(settings.cacheDir, { recursive: true });
            }
            // preparing the php execution
            __execPhp(__dirname + '/compile.php', 
            // __path.resolve(__dirname, '../../../bin/php'),
            (error, php, outprint) => {
                if (error) {
                    return reject(error + ' ---- ' + outprint);
                }
                let viewDotPath = viewPath;
                __unique([...settings.rootDirs]).forEach((path) => {
                    viewDotPath = viewDotPath.replace(`${path}/`, '');
                });
                viewDotPath = viewDotPath
                    .split('/')
                    .join('.')
                    .replace('.blade.php', '');
                // execute the php engine and get back the result
                php.compile(__unique([...settings.rootDirs]), viewDotPath, data, settings.cacheDir, (error, result, output, printed) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        const cmd = error
                            .toString()
                            .replace('Error: Command failed: ', '');
                        const res = __childProcess.spawnSync(cmd, [], {
                            shell: true
                        });
                        if (res && res.stdout) {
                            return resolve(res.stdout.toString());
                        }
                    }
                    // get the best result possible
                    const ret = result || printed || output || error;
                    // resolve the promise with the best result possible
                    resolve(ret);
                }));
            });
        }, {
            eventEmitter: {
                bind: this
            }
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGVWaWV3RW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxhZGVWaWV3RW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFHakMsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBRy9EOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsZUFBZTtJQUNiLFFBQVEsRUFBRSxFQUFFO0lBQ1osTUFBTSxDQUFDLFFBQWdCLEVBQUUsT0FBWSxFQUFFLEVBQUUsUUFBZ0M7UUFDdkUsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLE1BQU0sQ0FDWCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDbEYsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN4RDtZQUNELDhCQUE4QjtZQUM5QixTQUFTLENBQ1AsU0FBUyxHQUFHLGNBQWM7WUFDMUIsaURBQWlEO1lBQ2pELENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsT0FBTyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQztpQkFDNUM7Z0JBRUQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNoRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsQ0FBQztnQkFDSCxXQUFXLEdBQUcsV0FBVztxQkFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDO3FCQUNULE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRTdCLGlEQUFpRDtnQkFDakQsR0FBRyxDQUFDLE9BQU8sQ0FDVCxRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUNoQyxXQUFXLEVBQ1gsSUFBSSxFQUNKLFFBQVEsQ0FBQyxRQUFRLEVBQ2pCLENBQU8sS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQ3ZDLElBQUksS0FBSyxFQUFFO3dCQUNULE1BQU0sR0FBRyxHQUFHLEtBQUs7NkJBQ2QsUUFBUSxFQUFFOzZCQUNWLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxHQUFHLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFOzRCQUM1QyxLQUFLLEVBQUUsSUFBSTt5QkFDWixDQUFDLENBQUM7d0JBQ0gsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTs0QkFDckIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3lCQUN2QztxQkFDRjtvQkFDRCwrQkFBK0I7b0JBQy9CLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQztvQkFDakQsb0RBQW9EO29CQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFBLENBQ0YsQ0FBQztZQUNKLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxFQUNEO1lBQ0UsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyJ9