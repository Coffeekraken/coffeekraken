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
const SViewEngine_1 = __importDefault(require("../SViewEngine"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const exec_php_1 = __importDefault(require("exec-php"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
class SBladeViewEngine extends SViewEngine_1.default {
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
    constructor(settings) {
        super(deepMerge_1.default({
            metas: {
                id: 'SBladeViewEngine'
            },
            bladeViewEngine: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
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
     * @name      bladeViewEngineSettings
     * @type      ISBladeViewEngineSettings
     * @get
     *
     * Access bladeViewEngineSettings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get bladeViewEngineSettings() {
        return this._settings.bladeViewEngine;
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
    render(viewPath, data = {}, settings) {
        const set = (deepMerge_1.default(this.bladeViewEngineSettings, settings !== null && settings !== void 0 ? settings : {}));
        return new s_promise_1.default(({ resolve, reject }) => {
            if (!fs_1.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            // preparing the php execution
            exec_php_1.default(__dirname + '/compile.php', 
            // __path.resolve(__dirname, '../../../bin/php'),
            (error, php, outprint) => {
                console.log(set);
                if (error) {
                    return reject(error + ' ---- ' + outprint);
                }
                const viewDirPath = folderPath_1.default(viewPath);
                const viewFilename = filename_1.default(viewPath);
                // settings.rootDirs.push(viewDirPath);
                // execute the php engine and get back the result
                php.compile(unique_1.default([...set.rootDirs]), viewFilename.replace('.blade.php', '').split('/').join('.'), data, set.cacheDir, (error, result, output, printed) => __awaiter(this, void 0, void 0, function* () {
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
}
exports.default = SBladeViewEngine;
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
SBladeViewEngine.input = 'string';
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
SBladeViewEngine.names = ['blade.php', 'blade'];
/**
 * @name      rootDirs
 * @type      string[]
 * @static
 *
 * This static property define some rootDirs that this engine can use
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBladeViewEngine.rootDirs = [path_1.default.resolve(__dirname, '../../../php/views/blade')];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsYWRlVmlld0VuZ2luZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCbGFkZVZpZXdFbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsaUVBQTJDO0FBQzNDLDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFFakQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQix3REFBaUM7QUFDakMsd0ZBQWtFO0FBQ2xFLG9GQUFpRTtBQUNqRSxrRUFBMkM7QUFDM0MscUZBQStEO0FBbUMvRCxNQUFxQixnQkFBaUIsU0FBUSxxQkFBYTtJQStFekQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFpRDtRQUMzRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsa0JBQWtCO2FBQ3ZCO1lBQ0QsZUFBZSxFQUFFLEVBQUU7U0FDcEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQS9ERDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQXNCO1FBQ3JDLElBQ0UsY0FBYyxDQUFDLEtBQUssQ0FDbEIsZ1FBQWdRLENBQ2pRO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxJQUNFLGNBQWMsQ0FBQyxLQUFLLENBQ2xCLDhEQUE4RCxDQUMvRDtZQUVELE9BQU8sSUFBSSxDQUFDO1FBRWQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx1QkFBdUI7UUFDekIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztJQUMvQyxDQUFDO0lBMEJEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUNKLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLFFBQTZDO1FBRTdDLE1BQU0sR0FBRyxHQUE4QixDQUNyQyxtQkFBVyxD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