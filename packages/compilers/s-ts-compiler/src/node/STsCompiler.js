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
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const s_compiler_1 = __importDefault(require("@coffeekraken/s-compiler"));
const typescript_1 = __importDefault(require("typescript"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const removeSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/removeSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const rootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/rootDir"));
const availableColors_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/availableColors"));
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const STsCompilerInterface_1 = __importDefault(require("./interface/STsCompilerInterface"));
const child_process_1 = __importDefault(require("child_process"));
/**
 * @name                STsCompiler
 * @namespace           sugar.node.typescript
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "typescript" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISTsCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISTsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      support for compiling single file or glob targeted files
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import STsCompiler from '@coffeekraken/sugar/node/scss/compile/STsCompiler';
 * const compiler = new STsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.ts');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompiler extends s_compiler_1.default {
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
    constructor(initialParams, settings) {
        super(initialParams || {}, deepMerge_1.default({
            tsCompiler: {}
        }, settings || {}));
        /**
         * @name              _compile
         * @type              Function
         * @async
         *
         * This method is the main one that allows you to actually compile the
         * code you pass either inline, either a file path.
         *
         * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
         * @param         {Object}            [settings={}]       An object of settings to override the instance ones
         * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
         *
         * @since             2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentlyHandledFiles = {};
    }
    /**
     * @name      tsCompilerSettings
     * @type      ISTsCompilerSettings
     * @get
     *
     * Access to the ts compiler settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get tsCompilerSettings() {
        return this._settings.tsCompiler;
    }
    _compile(params, settings) {
        return new s_promise_1.default(({ resolve, reject, pipe, pipeFrom, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            settings = deepMerge_1.default(this.tsCompilerSettings, {}, settings || {});
            let input = Array.isArray(params.input) ? params.input : [params.input];
            let config;
            const duration = new s_duration_1.default();
            let stacks = undefined;
            if (params.stack) {
                if (!Array.isArray(params.stack))
                    stacks = [params.stack];
                else
                    stacks = params.stack;
            }
            // override input if needed
            if (stacks) {
                input = [];
                stacks.forEach((stackName) => {
                    if (fs_1.default.existsSync(`${rootDir_1.default()}/tsconfig.${stackName}.json`)) {
                        input.push(`${rootDir_1.default()}/tsconfig.${stackName}.json`);
                    }
                    else if (fs_1.default.existsSync(`${rootDir_1.default()}/tsconfig.${stackName}.js`)) {
                        input.push(`${rootDir_1.default()}/tsconfig.${stackName}.js`);
                    }
                    else if (fs_1.default.existsSync(`${s_sugar_config_1.default('ts.tsconfigStacksDir')}/tsconfig.${stackName}.js`)) {
                        input.push(`${s_sugar_config_1.default('ts.tsconfigStacksDir')}/tsconfig.${stackName}.js`);
                    }
                    else {
                        throw new Error(`Sorry but the tsconfig.{stack}.js(on) "<yellow>${stackName}</yellow>" does not exists...`);
                    }
                });
            }
            if (params.config && typeof params.config === 'string') {
                let configPath;
                if (fs_1.default.existsSync(`${rootDir_1.default()}/tsconfig.${params.config}.json`)) {
                    configPath = `${rootDir_1.default()}/tsconfig.${params.config}.json`;
                }
                else if (fs_1.default.existsSync(`${rootDir_1.default()}/tsconfig.${params.config}.js`)) {
                    configPath = `${rootDir_1.default()}/tsconfig.${params.config}.js`;
                }
                else if (fs_1.default.existsSync(`${s_sugar_config_1.default('ts.tsconfigStacksDir')}/tsconfig.${params.config}.js`)) {
                    configPath = `${s_sugar_config_1.default('ts.tsconfigStacksDir')}/tsconfig.${params.config}.js`;
                }
                if (!configPath) {
                    throw new Error(`Sorry but the passed "<yellow>${params.config}</yellow>" config parameter does not resolve to any valid tsconfig file...`);
                }
                else {
                    if (configPath.match(/\.js$/)) {
                        config = require(configPath);
                    }
                    else {
                        const jsonFile = new s_file_1.default(configPath);
                        config = jsonFile.content;
                    }
                }
            }
            else if (plainObject_1.default(params.config)) {
                config = params.config;
            }
            const colors = availableColors_1.default();
            let areAllTsconfigInput = true;
            for (let i = 0; i < input.length; i++) {
                if (!input[i].match(/tsconfig\.[a-zA-Z0-9]+\.js(on)?$/)) {
                    areAllTsconfigInput = false;
                }
            }
            // clear
            if (params.clear && params.outDir) {
                emit('log', {
                    value: `Clearing the outDir "<yellow>${params.outDir}</yellow>" before compilation`
                });
                const outDirPath = path_1.default.resolve(params.rootDir || process.cwd(), params.outDir);
                removeSync_1.default(outDirPath);
            }
            const poolStacks = {};
            if (!areAllTsconfigInput) {
                let tsconfig = {};
                // search for config
                const potentialRootPath = `${packageRoot_1.default()}/tsconfig.json`;
                if (fs_1.default.existsSync(potentialRootPath)) {
                    tsconfig = require(potentialRootPath);
                }
                else {
                    tsconfig = require(`${__dirname}/../templates/tsconfig.js`);
                }
                poolStacks.default = Object.assign(Object.assign({}, tsconfig), { include: [...((_a = tsconfig.include) !== null && _a !== void 0 ? _a : []), ...input] });
            }
            else {
                input.forEach((tsConfigPath) => {
                    const configJson = require(tsConfigPath);
                    const stackNameMatch = tsConfigPath.match(/tsconfig\.([a-zA-Z0-9]+)\.js(on)?$/);
                    const stackName = stackNameMatch ? stackNameMatch[1] : 'default';
                    poolStacks[stackName] = configJson;
                });
            }
            Object.keys(poolStacks).forEach((stackName) => {
                const tsconfig = poolStacks[stackName];
                const pool = pool_1.default(tsconfig.include, {
                    watch: true
                });
                // map
                if (params.map === false) {
                    delete tsconfig.compilerOptions.sourceMap;
                    delete tsconfig.compilerOptions.inlineSourceMap;
                }
                else if (params.map === true) {
                    tsconfig.compilerOptions.sourceMap = true;
                    delete tsconfig.compilerOptions.inlineSourceMap;
                }
                else if (params.map === 'inline') {
                    delete tsconfig.compilerOptions.sourceMap;
                    tsconfig.compilerOptions.inlineSourceMap = true;
                }
                pool.on(params.watch ? 'update' : 'files', (files, m) => __awaiter(this, void 0, void 0, function* () {
                    if (!Array.isArray(files))
                        files = [files];
                    const duration = new s_duration_1.default();
                    const resultFiles = [];
                    files.forEach((file) => {
                        emit('log', {
                            value: `<yellow>[compile]</yellow> File "<cyan>${file.relPath}</cyan>"`
                        });
                        let result = typescript_1.default.transpileModule(file.content, tsconfig);
                        if (!params.watch) {
                            resultFiles.push({
                                path: file.path,
                                relPath: file.relPath,
                                js: result.outputText,
                                map: result.sourceMapText
                            });
                        }
                        if (params.save) {
                            let outPath;
                            if (params.outDir) {
                                outPath = path_1.default.resolve(`${params.outDir}`, path_1.default.relative(params.inDir, file.path));
                            }
                            else {
                                outPath = file.path.replace(/\.ts(x)?$/, '.js');
                            }
                            emit('log', {
                                value: `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" under "<magenta>${path_1.default.relative(packageRoot_1.default(), outPath)}</magenta>"`
                            });
                            fs_1.default.writeFileSync(outPath, result.outputText);
                            if (result.sourceMapText) {
                                emit('log', {
                                    value: `<green>[save]</green> Map "<cyan>${file.relPath}</cyan>" under "<magenta>${path_1.default.relative(packageRoot_1.default(), outPath)}.map</magenta>"`
                                });
                                fs_1.default.writeFileSync(`${outPath}.map`, result.sourceMapText);
                            }
                        }
                    });
                    if (!params.watch) {
                        emit('log', {
                            value: `<yellow>${files.length}</yellow> File${files.length > 1 ? 's' : ''} compiled`
                        });
                        emit('log', {
                            value: `Compilation <green>successfull</green> in <yellow>${duration.end().formatedDuration}</yellow>`
                        });
                        resolve(Object.assign({ files: resultFiles }, duration.end()));
                    }
                }));
            });
            emit('log', {
                value: 'Starting <cyan>TS</cyan> file(s) compilation process...'
            });
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
        }), {
            eventEmitter: {
                bind: this
            },
            metas: this.metas
        });
    }
    _handleCompiledFile(file, tsconfig, params, emit) {
        if (!file)
            return;
        if (typeof file === 'string') {
            file = new s_file_1.default(file, {
                file: tsconfig.compilerOptions.rootDir
            });
        }
        const relPath = path_1.default.relative(tsconfig.compilerOptions.outDir, file.path);
        const inPath = path_1.default.resolve(tsconfig.compilerOptions.outDir, relPath);
        let outPath = path_1.default.resolve(tsconfig.compilerOptions.rootDir, relPath);
        if (tsconfig.sTsCompiler && tsconfig.sTsCompiler.outExt) {
            outPath = outPath.replace(/\.[a-zA-Z0-9]+$/, `.${tsconfig.sTsCompiler.outExt}`);
        }
        if (emit) {
            emit('log', {
                // temp: true,
                value: `<yellow>[compile]</yellow> Compiling file "<cyan>${path_1.default.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
            });
        }
        let finalFile;
        if (outPath.match(/\.ts(x)?$/) && fs_1.default.existsSync(outPath)) {
            if (emit) {
                emit('log', {
                    value: `<yellow>[warning]</yellow> The output destination of the compiled file "<cyan>${outPath}</cyan>" is the same as the source file and override it... This file is not saved then.`
                });
            }
            return;
        }
        else {
            try {
                if (params.save) {
                    fs_1.default.renameSync(inPath, outPath);
                    if (outPath.match(/\.cli\.js$/) && emit) {
                        emit('log', {
                            temp: true,
                            value: `<yellow>[compile]</yellow> Adding execution permission to file "<cyan>${path_1.default.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
                        });
                        child_process_1.default.execSync(`chmod +x ${outPath}`);
                    }
                    finalFile = s_file_1.default.new(outPath);
                }
                else {
                    finalFile = s_file_1.default.new(inPath);
                }
            }
            catch (e) {
                return;
            }
        }
        return finalFile.toObject();
    }
    /**
     * @name        getStack
     * @type        Function
     *
     * Check if the passed string is the name of a defined stack or not
     *
     * @param     {String}      stack       The stack to check
     * @return    {Object}                 The stack object defined in the configuration
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    getStack(stack) {
        const definedStacks = s_sugar_config_1.default('ts.stacks');
        if (!definedStacks)
            return false;
        if (!definedStacks[stack])
            return false;
        return definedStacks[stack];
    }
}
STsCompiler.interfaces = {
    params: {
        apply: false,
        class: STsCompilerInterface_1.default
    }
};
exports.default = STsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBd0Q7QUFDeEQsMEVBR2tDO0FBQ2xDLDREQUFzQztBQUV0QywwRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCxrRkFBeUQ7QUFJekQsd0ZBQWtFO0FBRWxFLDRGQUFzRTtBQUN0RSxvRkFBOEQ7QUFLOUQsMkdBQXFGO0FBQ3JGLDRGQUF3RTtBQUN4RSw0RkFBc0U7QUFFdEUsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0RkFBNEU7QUFFNUUsa0VBQTJDO0FBNkIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxvQkFBVztJQXNCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFtQztRQUVuQyxLQUFLLENBQ0gsYUFBYSxJQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUdKOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsMkJBQXNCLEdBQUcsRUFBRSxDQUFDO0lBakI1QixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJDRCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsUUFBMEM7UUFFMUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O1lBQ3RELFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxr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