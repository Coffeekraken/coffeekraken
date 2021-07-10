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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
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
            __execPhp(__dirname() + '/compile.php', 
            // __path.resolve(__dirname(), '../../../bin/php'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGVWaWV3RW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxhZGVWaWV3RW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFHakMsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBRS9ELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsZUFBZTtJQUNiLFFBQVEsRUFBRSxFQUFFO0lBQ1osTUFBTSxDQUFDLFFBQWdCLEVBQUUsT0FBWSxFQUFFLEVBQUUsUUFBZ0M7UUFDdkUsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLE1BQU0sQ0FDWCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDbEYsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN4RDtZQUVELDhCQUE4QjtZQUM5QixTQUFTLENBQ1AsU0FBUyxFQUFFLEdBQUcsY0FBYztZQUM1QixtREFBbUQ7WUFDbkQsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN2QixJQUFJLEtBQUssRUFBRTtvQkFDVCxPQUFPLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QztnQkFFRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2hELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxDQUFDO2dCQUNILFdBQVcsR0FBRyxXQUFXO3FCQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQ1QsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFN0IsaURBQWlEO2dCQUNqRCxHQUFHLENBQUMsT0FBTyxDQUNULFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ2hDLFdBQVcsRUFDWCxJQUFJLEVBQ0osUUFBUSxDQUFDLFFBQVEsRUFDakIsQ0FBTyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDdkMsSUFBSSxLQUFLLEVBQUU7d0JBQ1QsTUFBTSxHQUFHLEdBQUcsS0FBSzs2QkFDZCxRQUFRLEVBQUU7NkJBQ1YsT0FBTyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUMxQyxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUU7NEJBQzVDLEtBQUssRUFBRSxJQUFJO3lCQUNaLENBQUMsQ0FBQzt3QkFDSCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFOzRCQUNyQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7eUJBQ3ZDO3FCQUNGO29CQUNELCtCQUErQjtvQkFDL0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDO29CQUNqRCxvREFBb0Q7b0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZixDQUFDLENBQUEsQ0FDRixDQUFDO1lBQ0osQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLEVBQ0Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDIn0=