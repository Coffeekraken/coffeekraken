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
exports.SScssFileCtorSettingsInterface = exports.SScssFileSettingsInterface = void 0;
const s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const csso_1 = __importDefault(require("csso"));
const path_1 = __importDefault(require("path"));
const postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
const query_ast_1 = __importDefault(require("query-ast"));
const sass_1 = __importDefault(require("sass"));
const scss_parser_1 = require("scss-parser");
const stripCssComments_1 = __importDefault(require("../../shared/css/stripCssComments"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const SDuration_1 = __importDefault(require("../../shared/time/SDuration"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const filename_1 = __importDefault(require("../fs/filename"));
const SFile_1 = __importDefault(require("../fs/SFile"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./compile/interface/SScssCompilerParamsInterface"));
const findImportStatements_1 = __importDefault(require("./utils/findImportStatements"));
const getSharedResourcesString_1 = __importDefault(require("./utils/getSharedResourcesString"));
const putUseStatementsOnTop_1 = __importDefault(require("./utils/putUseStatementsOnTop"));
/**
 * @name      SScssFileSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @status              beta
 *
 * Scss file settings interface
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssFileSettingsInterface extends s_interface_1.default {
}
exports.SScssFileSettingsInterface = SScssFileSettingsInterface;
SScssFileSettingsInterface.definition = {};
/**
 * @name      SScssFileCtorSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @status              beta
 *
 * Scss file constructor settings interface
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssFileCtorSettingsInterface extends s_interface_1.default {
}
exports.SScssFileCtorSettingsInterface = SScssFileCtorSettingsInterface;
SScssFileCtorSettingsInterface.definition = {
    scssFile: {
        interface: SScssFileSettingsInterface,
        type: 'Object',
        required: true
    }
};
// @ts-ignore
class SScssFile extends SFile_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(path, settings = {}) {
        super(path, deepMerge_1.default({
            id: filename_1.default(path),
            scssFile: {}
        }, settings));
        /**
         * @name        dependencyType
         * @type        String
         * @values      main, import, use
         * @default     main
         *
         * Store the dependendy type of this file.
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._import = {
            type: 'main'
        };
        /**
         * @name          mixinsAndVariables
         * @type          String
         * @get
         *
         * Get the mixins and variables from the file content
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._mixinsAndVariables = undefined;
        /**
         * @name              compile
         * @type              Function
         *
         * Simply compile the file using the settings that you can pass as argument
         *
         * @param         {ISScssFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
         *
         * @setting       {Boolean}           [minify=false]          Specify if you want to minify the output
         * @setting       {Boolean}           [stripComments=false]       Specify if you want to remove all the comments from the output
         * @setting       {Boolean}              [cache=true]             Specify if you want to make use of the cache or not
         * @setting       {Boolean}           [clearCache=false]          Specify if you want to clear the cache before compilation
         * @setting       {String}            [sharedResources=null]      Specify some scss code that you want to be present in every compiled files
         * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isCompiling = false;
        this._currentCompilationSettings = {};
        this._currentCompilationParams = {};
        this._cache = new s_cache_1.default(this.constructor.name);
    }
    /**
     * @name      scssFileSettings
     * @type      ISScssFileSettings
     * @get
     *
     * Access the scssFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get scssFileSettings() {
        return this._settings.scssFile;
    }
    get mixinsAndVariables() {
        // cache
        if (this._mixinsAndVariables)
            return this._mixinsAndVariables;
        // extract the things that can be used
        // by others like mixins and variables declarations$
        const ast = scss_parser_1.parse(this.content);
        const $ = query_ast_1.default(ast);
        this._mixinsAndVariables = '';
        const nodes = $('stylesheet')
            .children()
            .filter((node) => {
            return ((node.node.type === 'atrule' &&
                node.node.value[0].value === 'mixin') ||
                node.node.type === 'declaration');
        });
        nodes.nodes.forEach((node) => {
            this._mixinsAndVariables += `\n${scss_parser_1.stringify(node.node)}`;
        });
        return this._mixinsAndVariables;
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.scssFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
        // @weird:ts-compilation-issue
        const completeParams = this.applyInterface('compilerParams', params);
        // init the promise
        return new s_promise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            if (params.watch) {
                this.watch();
            }
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            emit('notification', {
                // @weird:ts-compilation-issue
                title: `${this.id} compilation started`
            });
            emit('log', {
                clear: true,
                type: 'time'
            });
            // sass settings
            const sassSettings = Object.assign({ outputStyle: completeParams.style || sugar_1.default('scss.compile.style'), sourceMap: completeParams.map !== undefined
                    ? completeParams.map
                    : sugar_1.default('scss.compile.map'), includePaths: [
                    this.dirPath,
                    ...sugar_1.default('scss.compile.includePaths')
                ] }, (completeParams.sass || {}));
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            // if (completeParams.clearCache) await this._cache.clear();
            let toCompile = this.content;
            // get all the imports from the toCompile string
            const imports = findImportStatements_1.default(toCompile, {
                import: true,
                use: false
            });
            imports.forEach((importObj) => {
                // @ts-ignore
                toCompile = toCompile.replace(importObj.raw, `// ${importObj.raw}`);
            });
            // @ts-ignore
            this._sharedResources = getSharedResourcesString_1.default(
            // @ts-ignore
            completeParams.sharedResources);
            if (this._sharedResources) {
                toCompile = [this._sharedResources, toCompile].join('\n');
            }
            toCompile = putUseStatementsOnTop_1.default(toCompile);
            // // leverage cache
            // if (completeParams.cache) {
            //   const cachedValue = await this._cache.get(this.path, {
            //     context: {
            //       toCompile
            //       // params: completeParams
            //     }
            //   });
            //   if (cachedValue && cachedValue.css) {
            //     emit('log', {
            //       value: `<magenta>[cached]</magenta> "<cyan>${this.relPath}</cyan>"`
            //     });
            //     return resolve({
            //       css: this._processResultCss(cachedValue.css, completeParams),
            //       ...duration.end()
            //     });
            //   }
            // }
            let renderObj;
            emit('log', {
                value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
            });
            try {
                renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
            }
            catch (e) {
                return reject(e);
            }
            let resultCss = renderObj.css.toString();
            const tmpFile = new SFile_1.default(`%tmpDir/scss/compile.scss`, {
                file: {
                    checkExistence: false
                }
            });
            yield tmpFile.writeSync(resultCss);
            // post css
            resultCss = yield postcss_preset_env_1.default.process(resultCss, {
                from: tmpFile.path,
                to: tmpFile.path
            });
            // save in cache
            // if (completeParams.cache) {
            //   // @ts-ignore
            //   await this._cache.set(
            //     this.path,
            //     {
            //       css: renderObj.css.toString()
            //     },
            //     {
            //       context: {
            //         toCompile
            //         // params: completeParams
            //       }
            //     }
            //   );
            // }
            // replace the imports
            resultCss = [
                ...imports.map((importObj) => {
                    let path = `@import '${importObj.path.replace(/\.s[ca]ss$/, '.css')}';`;
                    if (!path.match(/\.css';$/)) {
                        path = path.replace(`';`, `.css';`);
                    }
                    return path;
                }),
                resultCss
            ].join('\n');
            resultCss = this._processResultCss(resultCss, completeParams);
            // check if need to save
            if (completeParams.save && completeParams.outputDir) {
                // build the save path
                const savePath = path_1.default.resolve(completeParams.outputDir, this.path
                    .replace(`${completeParams.rootDir}/`, '')
                    .replace(/\.s[ac]ss$/, '.css')
                    .replace(/_([a-zA-Z0-9-_\.]+\.css)$/, '$1'));
                emit('log', {
                    type: 'file',
                    action: 'save',
                    to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                    file: this.toObject()
                });
                this.writeSync(resultCss, {
                    path: savePath
                });
                // notify end
                emit('log', {
                    type: 'file',
                    action: 'saved',
                    to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                    file: this.toObject()
                });
            }
            const durationEnd = duration.end();
            // notify end
            emit('log', {
                value: `<green>[success]</green> File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${durationEnd.formatedDuration}</yellow>`
            });
            emit('log', {
                type: 'separator'
            });
            emit('notification', {
                type: 'success',
                // @weird:ts-compilation-issue
                title: `${this.id} compilation success`
            });
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
                this._isCompiling = false;
                return;
            }
            return resolve(Object.assign({ css: this._processResultCss(resultCss, completeParams) }, durationEnd));
        }));
    }
    _processResultCss(css, params) {
        // remove @charset "UTF-8";
        css = css.replace(/@charset "UTF-8";/gm, '');
        if (params.stripComments) {
            css = stripCssComments_1.default(css);
        }
        if (params.minify) {
            css = csso_1.default.minify(css, {
                comments: false
            }).css;
        }
        // remove empty lines
        css = css.split(/^\s*[\r\n]/gm).join('');
        return css;
    }
    update() {
        this._mixinsAndVariables = undefined;
        super.update();
    }
}
SScssFile.interfaces = {
    compilerParams: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SScssFileCtorSettingsInterface
    }
};
SScssFile.COMPILED_CSS = {};
SScssFile.FILES = {};
exports.default = SScssFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3Qyx3RUFBaUQ7QUFDakQsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQiw0RUFBb0Q7QUFDcEQsMERBQTZDO0FBQzdDLGdEQUEwQjtBQUMxQiw2Q0FHcUI7QUFDckIseUZBQW1FO0FBQ25FLDhFQUF3RDtBQUN4RCw0RUFBc0Q7QUFDdEQsc0VBQXNEO0FBQ3RELDhEQUEyQztBQUMzQyx3REFBMEQ7QUFDMUQsNEVBQXFEO0FBQ3JELG9IQUE4RjtBQUU5Rix3RkFBa0U7QUFDbEUsZ0dBQTBFO0FBQzFFLDBGQUFvRTtBQUVwRTs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwwQkFBMkIsU0FBUSxxQkFBWTs7QUFBNUQsZ0VBRUM7QUFEUSxxQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUd6Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw4QkFBK0IsU0FBUSxxQkFBWTs7QUFBaEUsd0VBUUM7QUFQUSx5Q0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRSwwQkFBMEI7UUFDckMsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQTZDSixhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsZUFBTztJQWdEN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBbUMsRUFBRTtRQUM3RCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUF6Q0o7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQU8sR0FBUTtZQUNiLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQztRQWlD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