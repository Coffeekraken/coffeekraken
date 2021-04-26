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
            if (!fs_1.default.existsSync(settings.cacheDir)) {
                fs_1.default.mkdirSync(settings.cacheDir, { recursive: true });
            }
            // preparing the php execution
            exec_php_1.default(__dirname + '/compile.php', 
            // __path.resolve(__dirname, '../../../bin/php'),
            (error, php, outprint) => {
                if (error) {
                    return reject(error + ' ---- ' + outprint);
                }
                let viewDotPath = viewPath;
                unique_1.default([...settings.rootDirs]).forEach((path) => {
                    viewDotPath = viewDotPath.replace(`${path}/`, '');
                });
                viewDotPath = viewDotPath
                    .split('/')
                    .join('.')
                    .replace('.blade.php', '');
                // execute the php engine and get back the result
                php.compile(unique_1.default([...settings.rootDirs]), viewDotPath, data, settings.cacheDir, (error, result, output, printed) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGVWaWV3RW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxhZGVWaWV3RW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELDRDQUFzQjtBQUN0Qix3REFBaUM7QUFHakMsa0VBQTJDO0FBQzNDLHFGQUErRDtBQUcvRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILGtCQUFlO0lBQ2IsUUFBUSxFQUFFLEVBQUU7SUFDWixNQUFNLENBQUMsUUFBZ0IsRUFBRSxPQUFZLEVBQUUsRUFBRSxRQUFnQztRQUN2RSxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLE1BQU0sQ0FDWCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDbEYsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN2QyxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN4RDtZQUNELDhCQUE4QjtZQUM5QixrQkFBUyxDQUNQLFNBQVMsR0FBRyxjQUFjO1lBQzFCLGlEQUFpRDtZQUNqRCxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSyxFQUFFO29CQUNULE9BQU8sTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7aUJBQzVDO2dCQUVELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsZ0JBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2hELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxDQUFDO2dCQUNILFdBQVcsR0FBRyxXQUFXO3FCQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQ1QsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFN0IsaURBQWlEO2dCQUNqRCxHQUFHLENBQUMsT0FBTyxDQUNULGdCQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUNoQyxXQUFXLEVBQ1gsSUFBSSxFQUNKLFFBQVEsQ0FBQyxRQUFRLEVBQ2pCLENBQU8sS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQ3ZDLElBQUksS0FBSyxFQUFFO3dCQUNULE1BQU0sR0FBRyxHQUFHLEtBQUs7NkJBQ2QsUUFBUSxFQUFFOzZCQUNWLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxHQUFHLEdBQUcsdUJBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTs0QkFDNUMsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQyxDQUFDO3dCQUNILElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7NEJBQ3JCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDdkM7cUJBQ0Y7b0JBQ0QsK0JBQStCO29CQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUM7b0JBQ2pELG9EQUFvRDtvQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUMsQ0FBQSxDQUNGLENBQUM7WUFDSixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsRUFDRDtZQUNFLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMifQ==