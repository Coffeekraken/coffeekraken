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
            if (completeParams.clearCache)
                yield this._cache.clear();
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
            // leverage cache
            if (completeParams.cache) {
                const cachedValue = yield this._cache.get(this.path, {
                    context: {
                        toCompile
                        // params: completeParams
                    }
                });
                if (cachedValue && cachedValue.css) {
                    emit('log', {
                        value: `<magenta>[cached]</magenta> "<cyan>${this.relPath}</cyan>"`
                    });
                    return resolve(Object.assign({ css: this._processResultCss(cachedValue.css, completeParams) }, duration.end()));
                }
            }
            let renderObj;
            emit('log', {
                value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
            });
            renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
            // save in cache
            if (completeParams.cache) {
                // @ts-ignore
                yield this._cache.set(this.path, {
                    css: renderObj.css.toString()
                }, {
                    context: {
                        toCompile
                        // params: completeParams
                    }
                });
            }
            let resultCss = renderObj.css.toString();
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
                    .replace(/\.s[ac]ss$/, '.css'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUNsQyx3RkFBa0U7QUFFbEUsNkNBQW1EO0FBQ25ELDZDQUEyRDtBQUMzRCwwREFBNkM7QUFDN0MsZ0RBQTBCO0FBRTFCLGtFQUE0QztBQUM1QyxnREFBMEI7QUFDMUIsbUVBQTZDO0FBQzdDLG9FQUE4QztBQUM5Qyw0REFBNEM7QUFDNUMsNkRBQXVDO0FBQ3ZDLDBGQUFvRTtBQUVwRSxnREFBMEI7QUFDMUIsK0VBQXlEO0FBRXpELGdHQUEwRTtBQUUxRSw4REFBMkM7QUFFM0MseUVBQW1EO0FBR25ELG9IQUE4RjtBQUU5Rjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFBNUQsZ0VBRUM7QUFEUSxxQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUd6Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw4QkFBK0IsU0FBUSxvQkFBWTs7QUFBaEUsd0VBUUM7QUFQUSx5Q0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRSwwQkFBMEI7UUFDckMsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQTJDSixhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsZUFBTztJQWdEN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBbUMsRUFBRTtRQUM3RCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUF6Q0o7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQU8sR0FBUTtZQUNiLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQztRQWlD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