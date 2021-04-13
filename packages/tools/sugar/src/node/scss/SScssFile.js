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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const filename_1 = __importDefault(require("../fs/filename"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
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
class SScssFile extends s_file_1.default {
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
            const duration = new s_duration_1.default();
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
            const tmpFile = new s_file_1.default(`%tmpDir/scss/compile.scss`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3Qyx3RUFBaUQ7QUFDakQsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQiw0RUFBb0Q7QUFDcEQsMERBQTZDO0FBQzdDLGdEQUEwQjtBQUMxQiw2Q0FHcUI7QUFDckIseUZBQW1FO0FBQ25FLDhFQUF3RDtBQUN4RCwwRUFBbUQ7QUFDbkQsc0VBQXNEO0FBQ3RELDhEQUEyQztBQUMzQyxrRUFBbUU7QUFDbkUsNEVBQXFEO0FBQ3JELG9IQUE4RjtBQUU5Rix3RkFBa0U7QUFDbEUsZ0dBQTBFO0FBQzFFLDBGQUFvRTtBQUVwRTs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwwQkFBMkIsU0FBUSxxQkFBWTs7QUFBNUQsZ0VBRUM7QUFEUSxxQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUd6Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw4QkFBK0IsU0FBUSxxQkFBWTs7QUFBaEUsd0VBUUM7QUFQUSx5Q0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRSwwQkFBMEI7UUFDckMsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQTZDSixhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsZ0JBQU87SUFnRDdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQW1DLEVBQUU7UUFDN0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxFQUFFO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBekNKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFPLEdBQVE7WUFDYixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUM7UUFp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