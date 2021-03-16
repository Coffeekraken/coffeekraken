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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const fs_1 = __importDefault(require("fs"));
const exec_php_1 = __importDefault(require("exec-php"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const filename_1 = __importDefault(require("../../fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
const unique_1 = __importDefault(require("../../array/unique"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsYWRlVGVtcGxhdGVFbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZW1wbGF0ZS9lbmdpbmVzL1NCbGFkZVRlbXBsYXRlRW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFrRDtBQUNsRCx1RUFBaUQ7QUFDakQsd0VBQWlEO0FBQ2pELCtEQUErQztBQUMvQyw0Q0FBc0I7QUFDdEIsd0RBQWlDO0FBRWpDLHFFQUErQztBQUMvQyxpRUFBOEM7QUFFOUMsa0VBQTJDO0FBQzNDLGdFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQXFCLG9CQUFxQixTQUFRLHlCQUFpQjtJQXFEakU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxzQkFBc0I7WUFDMUIsUUFBUSxFQUFFLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztTQUMxQyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBL0NEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYztRQUM3QixJQUNFLGNBQWMsQ0FBQyxLQUFLLENBQ2xCLGdRQUFnUSxDQUNqUTtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsSUFDRSxjQUFjLENBQUMsS0FBSyxDQUNsQiw4REFBOEQsQ0FDL0Q7WUFFRCxPQUFPLElBQUksQ0FBQztRQUVkLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQXdCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxRQUFRLEVBQUUsRUFBRTtTQUNiLEVB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