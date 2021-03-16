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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const json_1 = __importDefault(require("../package/json"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const unique_1 = __importDefault(require("../array/unique"));
const sugar_1 = __importDefault(require("../config/sugar"));
/**
 * @name                SFrontspec
 * @namespace           sugar.node.doc
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class represent the ```frontspec.json``` file and allows you to generate it from some sources (glob pattern(s))
 * and save it inside a directory you choose.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your docMap instance:
 *
 * @setting       {String}      [filename='frontspec.json']       Specify the filename you want
 * @setting       {String}      [outputDir=packageRoot()]         Specify the directory where you want to save your docMap.json file when using the ```save``` method
 * @setting       {Integer}     [dirDepth=3]                      Specify the maximum directories the scan will go down
 * @setting       {Boolean}     [cache=false]                     Specify if you want to take advantage of some cache or not
 * @setting       {Object}      [sources={}                       Specify some sources folders where the scan process will go search for frontspec.json files
 * @setting       {String}      [sources.[name].rootDir=__packageRoot()]     Specify the directory where to go search from
 * @setting       {Integer}     [sources.[name].dirDepth=3]                  Specify the maximum directories the scan will go down
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SFrontspec from '@coffeekraken/sugar/node/doc/SFrontspec';
 * const frontspec = new SFrontspec({
 *  outputDir: '/my/cool/directory'
 * });
 * const result = await frontspec.read();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspec extends s_promise_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            id: 'SFrontspec',
            search: sugar_1.default('build.frontspec.search'),
            filename: sugar_1.default('build.frontspec.filename'),
            outputDir: sugar_1.default('build.frontspec.outputDir'),
            dirDepth: sugar_1.default('build.frontspec.dirDepth'),
            cache: sugar_1.default('build.frontspec.cache'),
            sources: sugar_1.default('build.frontspec.sources')
        }, settings));
        /**
         * @name          _entries
         * @type           Array<Object>
         * @private
         *
         * This store the frontspec.json entries
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._entries = {};
    }
    /**
     * @name          search
     * @type          Function
     *
     * This method allows you to search for frontspec.json files and get back the array of pathes where to
     * find the found files
     *
     * @todo      update documentation
     *
     * @param       {Object}        [settings={}]       A settings object to configure your reading process
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    search(settings = {}) {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            settings = deepMerge_1.default(this._settings, {}, settings);
            // let filenamesArray = settings.filename;
            // if (!Array.isArray(filenamesArray)) filenamesArray = [filenamesArray];
            // generate the glob pattern to use
            const patterns = [];
            Object.keys(settings.sources).forEach((sourceName) => {
                const sourceObj = deepMerge_1.default(settings, settings.sources[sourceName]);
                const filenamesArray = !Array.isArray(sourceObj.search)
                    ? [sourceObj.search]
                    : sourceObj.search;
                const patternObj = {
                    rootDir: sourceObj.rootDir,
                    patterns: []
                };
                for (let i = 0; i <= (sourceObj.dirDepth || settings.dirDepth); i++) {
                    filenamesArray.forEach((filename) => {
                        const p = `${'*/'.repeat(i)}${filename}`;
                        patternObj.patterns.push(p);
                    });
                }
                patterns.push(patternObj);
            });
            let files = [];
            for (let i = 0; i < patterns.length; i++) {
                const patternObj = patterns[i];
                const foundFiles = glob_1.default
                    .sync(`{${patternObj.patterns.join(',')}}`, {
                    cwd: patternObj.rootDir,
                    symlinks: true
                })
                    .map((filePath) => {
                    return path_1.default.resolve(patternObj.rootDir, filePath);
                });
                files = [...files, ...foundFiles];
            }
            files = unique_1.default(files);
            resolve(files);
        }, {
            id: settings.id + '.find'
        });
    }
    /**
     * @name					json
     * @type 					Function
     *
     * Generate the frontspec JSON by searching for "childs" one as well as generating the "root" one
     * stored at the root of your package.
     *
     * @param       {Object}        [settings={}]         A setting object to override the instance ones passed in the constructor
     * @return      {SPromise}                            An SPromise instance that will be resolved with the frontspec JSON once jsond
     *
     * @since 					2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    json(settings = {}) {
        settings = deepMerge_1.default(this._settings, {}, settings);
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            try {
                // initiating the frontspecJson object
                const packageJson = json_1.default();
                delete packageJson.dependencies;
                delete packageJson.devDependencies;
                delete packageJson.scripts;
                let frontspecJson = {
                    package: packageJson,
                    children: {}
                };
                // search for files
                const files = yield this.search(settings);
                if (!files)
                    resolve(frontspecJson);
                const rootFilePath = `${packageRoot_1.default()}/${settings.filename}`;
                if (files.indexOf(rootFilePath) !== -1) {
                    frontspecJson = require(rootFilePath).default;
                    frontspecJson.package = json_1.default();
                    frontspecJson.children = {};
                }
                files.forEach((filePath) => {
                    // checking if it's the root one
                    if (filePath !== rootFilePath) {
                        // build the relative path to the package
                        let relPath = path_1.default.relative(packageRoot_1.default(), filePath);
                        const outPath = path_1.default.relative(packageRoot_1.default(), `${this._settings.outputDir}/${this._settings.filename}`);
                        // if the founded file is the same as the output one
                        if (relPath === outPath)
                            return;
                        // reading the file
                        const content = require(filePath).default;
                        // relPath = relPath
                        //   .replace(`/${settings.filename}`, '')
                        //   .replace(settings.filename, '');
                        // save the child frontspec
                        frontspecJson.children[relPath] = content;
                    }
                });
                // resolve the frontspec Json
                resolve(frontspecJson);
            }
            catch (e) {
                reject(e.toString());
            }
        }), {
            id: settings.id + '.json'
        });
    }
}
exports.default = SFrontspec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2Zyb250c3BlYy9TRnJvbnRzcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLHdFQUFpRDtBQUNqRCxvRUFBOEM7QUFDOUMsc0VBQWdEO0FBQ2hELDJEQUE0QztBQUM1QyxnREFBMEI7QUFHMUIsZ0RBQTBCO0FBQzFCLDZEQUF1QztBQUN2Qyw0REFBNEM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILE1BQXFCLFVBQVcsU0FBUSxtQkFBVTtJQWFoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLFlBQVk7WUFDaEIsTUFBTSxFQUFFLGVBQWEsQ0FBQyx3QkFBd0IsQ0FBQztZQUMvQyxRQUFRLEVBQUUsZUFBYSxDQUFDLDBCQUEwQixDQUFDO1lBQ25ELFNBQVMsRUFBRSxlQUFhLENBQUMsMkJBQTJCLENBQUM7WUFDckQsUUFBUSxFQUFFLGVBQWEsQ0FBQywwQkFBMEIsQ0FBQztZQUNuRCxLQUFLLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO1lBQzdDLE9BQU8sRUFBRSxlQUFhLENBQUMseUJBQXlCLENBQUM7U0FDbEQsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBcENKOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7SUEyQmQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNsQixPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENB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