"use strict";
// @ts-nocheck
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
const STemplateEngine_1 = __importDefault(require("./STemplateEngine"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const sugar_1 = __importDefault(require("../../../shared/config/sugar"));
const fs_1 = __importDefault(require("fs"));
const exec_php_1 = __importDefault(require("exec-php"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const filename_1 = __importDefault(require("../../fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
const unique_1 = __importDefault(require("../../../shared/array/unique"));
/**
 * @name          SBladeTemplateEngine
 * @namespace     sugar.node.template.engines
 * @type          Class
 * @status              wip
 *
 * This class represent the blade php template engine that you can use by itself through this class, or through the ```STemplate``` class
 * that take care of a lot of works for you...
 *
 * @param       {Object}      [settings={}]       A settings object to configure your template engine. Each template engines can have different settings but here's the default one:
 * - cacheDir (@config.views.cacheDir) {String}: Specify the directory where you want to store the cache render files
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import SBladeTemplateEngine from '@coffeekraken/sugar/node/template/engines/SBladeTemplateEngine';
 * const engine = new SBladeTemplateEngine({});
 * await engine.render('/something/cool/myView.blade.php', {
 *    title: 'Hello'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBladeTemplateEngine extends STemplateEngine_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            id: 'SBladeTemplateEngine',
            cacheDir: sugar_1.default('views.cacheDir')
        }, settings));
    }
    /**
     * @name      canRender
     * @type      Function
     * @static
     *
     * Method that take as parameter the template string to analyze and send back true or false depending if the passed string is renderable by this engine
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static canRender(templateString) {
        if (templateString.match(/@(section|show|yield|extends|endsection|parent|verbatim|endverbatim|if|elseif|endif|unless|endunless|isset|endisset|empty|endempty|hasSection|sectionMissing|switch|case|endswitch|for|endfor|foreach|endforeach|forelse|endforelse|while|endwhile)(\(.*\))?/gm))
            return true;
        if (templateString.match(/\{\{\s?\$.*\}\}|\{\!\!\s?\$.*\!\!\}|\{\{\s?.*\(.*\)\s?\}\}/gm))
            return true;
        return false;
    }
    /**
     * @name        render
     * @type        Function
     * @async
     *
     * Main render method
     *
     * @param       {String}      viewPath      The view path to render. Has to be an absolute file path
     * @param       {Object}      [data={}]     An object of data to use for the render
     * @param       {Object}      [settings={}]     An object of settings to override the default one passed in the contructor
     * @return      {SPromise}                  An SPromise instance that will be resolved once the render has finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(viewPath, data = {}, settings = {}) {
        settings = deepMerge_1.default({
            rootDirs: []
        }, this._settings, settings);
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            if (!fs_1.default.existsSync(settings.cacheDir))
                fs_1.default.mkdirSync(settings.cacheDir, {
                    recursive: true
                });
            if (!fs_1.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            // preparing the php execution
            exec_php_1.default(__dirname + '/bladePhp/compile.php', 
            // __path.resolve(__dirname, '../../../bin/php'),
            (error, php, outprint) => {
                if (error) {
                    return reject(error + ' ---- ' + outprint);
                }
                const viewDirPath = folderPath_1.default(viewPath);
                const viewFilename = filename_1.default(viewPath);
                settings.rootDirs.push(viewDirPath);
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
            id: this._settings.id + '.render'
        });
    }
}
exports.default = SBladeTemplateEngine;
/**
 * @name      input
 * @type      String
 * @static
 *
 * Specify the input type this template engine want
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBladeTemplateEngine.input = 'string';
/**
 * @name      names
 * @type      Array<String>
 * @default   ['blade.php','blade']
 * @static
 *
 * Store all the names under which this engine is available
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBladeTemplateEngine.names = ['blade.php', 'blade'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsYWRlVGVtcGxhdGVFbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxhZGVUZW1wbGF0ZUVuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBa0Q7QUFDbEQsaUZBQTJEO0FBQzNELHdFQUFpRDtBQUNqRCx5RUFBeUQ7QUFDekQsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUNqQyxxRUFBK0M7QUFDL0MsaUVBQThDO0FBQzlDLGtFQUEyQztBQUMzQywwRUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFxQixvQkFBcUIsU0FBUSx5QkFBaUI7SUFxRGpFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsc0JBQXNCO1lBQzFCLFFBQVEsRUFBRSxlQUFhLENBQUMsZ0JBQWdCLENBQUM7U0FDMUMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQS9DRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWM7UUFDN0IsSUFDRSxjQUFjLENBQUMsS0FBSyxDQUNsQixnUUFBZ1EsQ0FDalE7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLElBQ0UsY0FBYyxDQUFDLEtBQUssQ0FDbEIsOERBQThELENBQy9EO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFFZCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUF3QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELElBQUksQ0FBQyxTQUFTLEVBQ2QsUUFBUSxDQUNULENBQUM7UUFDRixPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNyQyxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQ2hDLFNBQVMsRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUM7WUFFTCxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxNQUFNLENBQ1gsNENBQTRDLFFBQVEsNkJBQTZCLENBQ2xGLENBQUM7YUFDSDtZQUVELDhCQUE4QjtZQUM5QixrQkFBUyxDQUNQLFNBQVMsR0FBRyx1QkFBdUI7WUFDbkMsaURBQWlEO1lBQ2pELENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsT0FBTyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQztpQkFDNUM7Z0JBRUQsTUFBTSxXQUFXLEdBQUcsb0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxZQUFZLEdBQUcsa0JBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BDLGlEQUFpRDtnQkFDakQsR0FBRyxDQUFDLE9BQU8sQ0FDVCxnQkFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDaEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDM0QsSUFBSSxFQUNKLFFBQVEsQ0FBQyxRQUFRLEVBQ2pCLENBQU8sS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQ3ZDLElBQUksS0FBSyxFQUFFO3dCQUNULE1BQU0sR0FBRyxHQUFHLEtBQUs7NkJBQ2QsUUFBUSxFQUFFOzZCQUNWLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxHQUFHLEdBQUcsdUJBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTs0QkFDNUMsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQyxDQUFDO3dCQUNILElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7NEJBQ3JCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDdkM7cUJBQ0Y7b0JBQ0QsK0JBQStCO29CQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUM7b0JBQ2pELG9EQUFvRDtvQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUMsQ0FBQSxDQUNGLENBQUM7WUFDSixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxTQUFTO1NBQ2xDLENBQ0YsQ0FBQztJQUNKLENBQUM7O0FBMUpILHVDQTJKQztBQTFKQzs7Ozs7Ozs7O0dBU0c7QUFDSSwwQkFBSyxHQUFHLFFBQVEsQ0FBQztBQUV4Qjs7Ozs7Ozs7OztHQVVHO0FBQ0ksMEJBQUssR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyJ9