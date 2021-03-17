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
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const json_1 = __importDefault(require("../package/json"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const unique_1 = __importDefault(require("../../shared/array/unique"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBR2Qsd0VBQWlEO0FBQ2pELDhFQUF3RDtBQUN4RCxzRUFBZ0Q7QUFDaEQsMkRBQTRDO0FBQzVDLGdEQUEwQjtBQUcxQixnREFBMEI7QUFDMUIsdUVBQWlEO0FBQ2pELDREQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsTUFBcUIsVUFBVyxTQUFRLG1CQUFVO0lBYWhEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsWUFBWTtZQUNoQixNQUFNLEVBQUUsZUFBYSxDQUFDLHdCQUF3QixDQUFDO1lBQy9DLFFBQVEsRUFBRSxlQUFhLENBQUMsMEJBQTBCLENBQUM7WUFDbkQsU0FBUyxFQUFFLGVBQWEsQ0FBQywyQkFBMkIsQ0FBQztZQUNyRCxRQUFRLEVBQUUsZUFBYSxDQUFDLDBCQUEwQixDQUFDO1lBQ25ELEtBQUssRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7WUFDN0MsT0FBTyxFQUFFLGVBQWEsQ0FBQyx5QkFBeUIsQ0FBQztTQUNsRCxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFwQ0o7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQTJCZCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVCLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEs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