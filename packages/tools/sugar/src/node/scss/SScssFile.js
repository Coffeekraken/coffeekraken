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
const SDuration_1 = __importDefault(require("../time/SDuration"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const SCache_1 = __importDefault(require("../cache/SCache"));
const putUseStatementsOnTop_1 = __importDefault(require("./utils/putUseStatementsOnTop"));
const csso_1 = __importDefault(require("csso"));
const stripCssComments_1 = __importDefault(require("../css/stripCssComments"));
const getSharedResourcesString_1 = __importDefault(require("./utils/getSharedResourcesString"));
const filename_1 = __importDefault(require("../fs/filename"));
const postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
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
        this._cache = new SCache_1.default(this.constructor.name);
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
        return new SPromise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            emit('notification', {
                title: `${this.id} compilation started`
            });
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
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
            renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
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
            emit('notification', {
                type: 'success',
                title: `${this.id} compilation success`
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUNsQyx3RkFBa0U7QUFFbEUsNkNBQW1EO0FBQ25ELDZDQUEyRDtBQUMzRCwwREFBNkM7QUFDN0MsZ0RBQTBCO0FBRTFCLGtFQUE0QztBQUM1QyxnREFBMEI7QUFDMUIsbUVBQTZDO0FBQzdDLG9FQUE4QztBQUM5Qyw0REFBNEM7QUFDNUMsNkRBQXVDO0FBQ3ZDLDBGQUFvRTtBQUVwRSxnREFBMEI7QUFDMUIsK0VBQXlEO0FBRXpELGdHQUEwRTtBQUUxRSw4REFBMkM7QUFDM0MsNEVBQW9EO0FBR3BELHlFQUFtRDtBQUduRCxvSEFBOEY7QUFFOUY7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsMEJBQTJCLFNBQVEsb0JBQVk7O0FBQTVELGdFQUVDO0FBRFEscUNBQVUsR0FBRyxFQUFFLENBQUM7QUFHekI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsOEJBQStCLFNBQVEsb0JBQVk7O0FBQWhFLHdFQVFDO0FBUFEseUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUE2Q0osYUFBYTtBQUNiLE1BQU0sU0FBVSxTQUFRLGVBQU87SUFnRDdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQW1DLEVBQUU7UUFDN0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxFQUFFO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBekNKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFPLEdBQVE7WUFDYixJQUFJLEVBQUUsTUFBTTtT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