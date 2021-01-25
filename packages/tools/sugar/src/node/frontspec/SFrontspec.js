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
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const json_1 = __importDefault(require("../package/json"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const unique_1 = __importDefault(require("../array/unique"));
const sugar_1 = __importDefault(require("../config/sugar"));
module.exports = class SFrontspec extends SPromise_1.default {
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
        return new SPromise_1.default(({ resolve, reject, emit }) => {
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
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
                    frontspecJson = require(rootFilePath);
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
                        const content = require(filePath);
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUFHZCxtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLHNFQUFnRDtBQUNoRCwyREFBNEM7QUFDNUMsZ0RBQTBCO0FBRzFCLGdEQUEwQjtBQUMxQiw2REFBdUM7QUFDdkMsNERBQTRDO0FBb0M1QyxpQkFBUyxNQUFNLFVBQVcsU0FBUSxrQkFBVTtJQWExQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLFlBQVk7WUFDaEIsTUFBTSxFQUFFLGVBQWEsQ0FBQyx3QkFBd0IsQ0FBQztZQUMvQyxRQUFRLEVBQUUsZUFBYSxDQUFDLDBCQUEwQixDQUFDO1lBQ25ELFNBQVMsRUFBRSxlQUFhLENBQUMsMkJBQTJCLENBQUM7WUFDckQsUUFBUSxFQUFFLGVBQWEsQ0FBQywwQkFBMEIsQ0FBQztZQUNuRCxLQUFLLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO1lBQzdDLE9BQU8sRUFBRSxlQUFhLENBQUMseUJBQXlCLENBQUM7U0FDbEQsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBcENKOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7SUEyQmQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNsQixPQUFPLElBQUksa0JBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVyRCwwQ0FBMEM7WUFDMUMseUVBQXlFO1lB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