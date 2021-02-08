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
var _a;
const STemplateEngine_1 = __importDefault(require("./STemplateEngine"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const fs_1 = __importDefault(require("fs"));
const exec_php_1 = __importDefault(require("exec-php"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const filename_1 = __importDefault(require("../../fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
const unique_1 = __importDefault(require("../../array/unique"));
module.exports = (_a = class SBladeTemplateEngine extends STemplateEngine_1.default {
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
         * @param       {Object}      [data={}]     An object of data to use for the render
         * @param       {Object}      [settings={}]     An object of settings to override the default one passed in the contructor
         * @return      {SPromise}                  An SPromise instance that will be resolved once the render has finished
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        render(viewPath, data = {}, settings = {}) {
            settings = deepMerge_1.default({
                rootDirs: []
            }, this._settings, settings);
            return new SPromise_1.default(({ resolve, reject, emit }) => {
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
    },
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
    _a.input = 'string',
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
    _a.names = ['blade.php', 'blade'],
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsYWRlVGVtcGxhdGVFbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxhZGVUZW1wbGF0ZUVuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBa0Q7QUFDbEQsdUVBQWlEO0FBQ2pELHNFQUFnRDtBQUNoRCwrREFBK0M7QUFDL0MsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUVqQyxxRUFBK0M7QUFDL0MsaUVBQThDO0FBRTlDLGtFQUEyQztBQUMzQyxnRUFBMEM7QUE0QjFDLHVCQUFTLE1BQU0sb0JBQXFCLFNBQVEseUJBQWlCO1FBcUQzRDs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSxzQkFBc0I7Z0JBQzFCLFFBQVEsRUFBRSxlQUFhLENBQUMsZ0JBQWdCLENBQUM7YUFDMUMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQS9DRDs7Ozs7Ozs7O1dBU0c7UUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWM7WUFDN0IsSUFDRSxjQUFjLENBQUMsS0FBSyxDQUNsQixnUUFBZ1EsQ0FDalE7Z0JBRUQsT0FBTyxJQUFJLENBQUM7WUFDZCxJQUNFLGNBQWMsQ0FBQyxLQUFLLENBQ2xCLDhEQUE4RCxDQUMvRDtnQkFFRCxPQUFPLElBQUksQ0FBQztZQUVkLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQXdCRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7Z0JBQ0UsUUFBUSxFQUFFLEVBQUU7YUFDYixFQUNELElBQUksQ0FBQyxTQUFTLEVBQ2QsUUFBUSxDQUNULENBQUM7WUFDRixPQUFPLElBQUksa0JBQVUsQ0FD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