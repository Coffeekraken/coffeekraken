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
        return new SPromise_1.default((resolve, reject, trigger, cancel) => {
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
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=module.js.map