"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const exec_php_1 = __importDefault(require("exec-php"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
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
exports.default = {
    settings: {},
    render(viewPath, data = {}, settings) {
        return new s_promise_1.default(({ resolve, reject }) => {
            if (!fs_1.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            // preparing the php execution
            exec_php_1.default(__dirname + '/compile.php', 
            // __path.resolve(__dirname, '../../../bin/php'),
            (error, php, outprint) => {
                if (error) {
                    return reject(error + ' ---- ' + outprint);
                }
                const viewFilename = filename_1.default(viewPath);
                // execute the php engine and get back the result
                php.compile(unique_1.default([...settings.rootDirs]), viewFilename.replace('.blade.php', '').split('/').join('.'), data, settings.cacheDir, (error, result, output, printed) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        const cmd = error
                            .toString()
                            .replace('Error: Command failed: ', '');
                        const res = child_process_1.default.spawnSync(cmd, [], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGVWaWV3RW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxhZGVWaWV3RW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELDRDQUFzQjtBQUN0Qix3REFBaUM7QUFDakMsb0ZBQWlFO0FBQ2pFLGtFQUEyQztBQUMzQyxxRkFBK0Q7QUFHL0Q7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxrQkFBZTtJQUNiLFFBQVEsRUFBRSxFQUFFO0lBQ1osTUFBTSxDQUFDLFFBQWdCLEVBQUUsT0FBWSxFQUFFLEVBQUUsUUFBd0I7UUFDL0QsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxNQUFNLENBQ1gsNENBQTRDLFFBQVEsNkJBQTZCLENBQ2xGLENBQUM7YUFDSDtZQUVELDhCQUE4QjtZQUM5QixrQkFBUyxDQUNQLFNBQVMsR0FBRyxjQUFjO1lBQzFCLGlEQUFpRDtZQUNqRCxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSyxFQUFFO29CQUNULE9BQU8sTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7aUJBQzVDO2dCQUVELE1BQU0sWUFBWSxHQUFHLGtCQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTdDLGlEQUFpRDtnQkFDakQsR0FBRyxDQUFDLE9BQU8sQ0FDVCxnQkFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDaEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDM0QsSUFBSSxFQUNKLFFBQVEsQ0FBQyxRQUFRLEVBQ2pCLENBQU8sS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQ3ZDLElBQUksS0FBSyxFQUFFO3dCQUNULE1BQU0sR0FBRyxHQUFHLEtBQUs7NkJBQ2QsUUFBUSxFQUFFOzZCQUNWLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxHQUFHLEdBQUcsdUJBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTs0QkFDNUMsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQyxDQUFDO3dCQUNILElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7NEJBQ3JCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDdkM7cUJBQ0Y7b0JBQ0QsK0JBQStCO29CQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUM7b0JBQ2pELG9EQUFvRDtvQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUMsQ0FBQSxDQUNGLENBQUM7WUFDSixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsRUFDRDtZQUNFLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMifQ==