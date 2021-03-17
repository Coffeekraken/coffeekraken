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
const SFile_1 = __importDefault(require("../fs/SFile"));
const findImportStatements_1 = __importDefault(require("./utils/findImportStatements"));
const scss_parser_1 = require("scss-parser");
const scss_parser_2 = require("scss-parser");
const query_ast_1 = __importDefault(require("query-ast"));
const sass_1 = __importDefault(require("sass"));
const SDuration_1 = __importDefault(require("../../shared/time/SDuration"));
const path_1 = __importDefault(require("path"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
const putUseStatementsOnTop_1 = __importDefault(require("./utils/putUseStatementsOnTop"));
const csso_1 = __importDefault(require("csso"));
const stripCssComments_1 = __importDefault(require("../../shared/css/stripCssComments"));
const getSharedResourcesString_1 = __importDefault(require("./utils/getSharedResourcesString"));
const filename_1 = __importDefault(require("../fs/filename"));
const postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
const SInterface_1 = __importDefault(require("../../shared/interface/SInterface"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./compile/interface/SScssCompilerParamsInterface"));
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
class SScssFileSettingsInterface extends SInterface_1.default {
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
class SScssFileCtorSettingsInterface extends SInterface_1.default {
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
         * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
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
            this._mixinsAndVariables += `\n${scss_parser_2.stringify(node.node)}`;
        });
        return this._mixinsAndVariables;
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.scssFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUNsQyx3RkFBa0U7QUFFbEUsNkNBQW1EO0FBQ25ELDZDQUEyRDtBQUMzRCwwREFBNkM7QUFDN0MsZ0RBQTBCO0FBRTFCLDRFQUFzRDtBQUN0RCxnREFBMEI7QUFDMUIsd0VBQWlEO0FBQ2pELDhFQUF3RDtBQUN4RCw0REFBNEM7QUFDNUMsb0VBQTZDO0FBQzdDLDBGQUFvRTtBQUVwRSxnREFBMEI7QUFDMUIseUZBQW1FO0FBRW5FLGdHQUEwRTtBQUUxRSw4REFBMkM7QUFDM0MsNEVBQW9EO0FBR3BELG1GQUE2RDtBQUc3RCxvSEFBOEY7QUFFOUY7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsMEJBQTJCLFNBQVEsb0JBQVk7O0FBQTVELGdFQUVDO0FBRFEscUNBQVUsR0FBRyxFQUFFLENBQUM7QUFHekI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsOEJBQStCLFNBQVEsb0JBQVk7O0FBQWhFLHdFQVFDO0FBUFEseUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUE2Q0osYUFBYTtBQUNiLE1BQU0sU0FBVSxTQUFRLGVBQU87SUFnRDdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQW1DLEVBQUU7UUFDN0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxFQUFFO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBekNKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFPLEdBQVE7WUFDYixJQUFJLEVBQUUsTUFBTTtT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