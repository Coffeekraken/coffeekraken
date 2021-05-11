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
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
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
            let tsconfigFromConfigParam = {};
            const duration = new s_duration_1.default();
            if (params.config && params.stack) {
                throw new Error(`<red>[${this.constructor.name}]</red> Sorry but you cannot use both "<yellow>config</yellow>" and "<yellow>stack</yellow>" parameters together. <yellow>stack</yellow> is to compile some preset input with preset settings, <yellow>config</yellow> is to simply specify which config you want to use to compile some custom input(s)`);
            }
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
                        tsconfigFromConfigParam = require(configPath);
                    }
                    else {
                        const jsonFile = new s_file_1.default(configPath);
                        tsconfigFromConfigParam = jsonFile.content;
                    }
                }
            }
            else if (plainObject_1.default(params.config)) {
                tsconfigFromConfigParam = params.config;
            }
            delete tsconfigFromConfigParam.include;
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
                    group: 's-ts-compiler',
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
                poolStacks.default = deepMerge_1.default(Object.assign(Object.assign({}, tsconfig), { include: [...((_a = tsconfig.include) !== null && _a !== void 0 ? _a : []), ...input] }), tsconfigFromConfigParam);
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
                            group: 's-ts-compiler',
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
                                outPath = path_1.default
                                    .resolve(`${params.outDir}`, path_1.default.relative(params.inDir, file.path))
                                    .replace(/\.ts(x)?$/, '.js');
                            }
                            else {
                                outPath = file.path.replace(/\.ts(x)?$/, '.js');
                            }
                            emit('log', {
                                group: 's-ts-compiler',
                                value: `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" under "<magenta>${path_1.default.relative(packageRoot_1.default(), outPath)}</magenta>"`
                            });
                            writeFileSync_1.default(outPath, result.outputText);
                            if (result.sourceMapText) {
                                emit('log', {
                                    group: 's-ts-compiler',
                                    value: `<green>[save]</green> Map "<cyan>${file.relPath}</cyan>" under "<magenta>${path_1.default.relative(packageRoot_1.default(), outPath)}.map</magenta>"`
                                });
                                writeFileSync_1.default(`${outPath}.map`, result.sourceMapText);
                            }
                        }
                    });
                    if (!params.watch) {
                        emit('log', {
                            group: 's-ts-compiler',
                            value: `<yellow>${files.length}</yellow> File${files.length > 1 ? 's' : ''} compiled`
                        });
                        emit('log', {
                            group: 's-ts-compiler',
                            value: `Compilation <green>successfull</green> in <yellow>${duration.end().formatedDuration}</yellow>`
                        });
                        resolve(Object.assign({ files: resultFiles }, duration.end()));
                    }
                }));
            });
            emit('log', {
                group: 's-ts-compiler',
                value: 'Starting <cyan>TS</cyan> file(s) compilation process...'
            });
            if (params.watch) {
                emit('log', {
                    group: 's-ts-compiler',
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
                group: 's-ts-compiler',
                // temp: true,
                value: `<yellow>[compile]</yellow> Compiling file "<cyan>${path_1.default.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
            });
        }
        let finalFile;
        if (outPath.match(/\.ts(x)?$/) && fs_1.default.existsSync(outPath)) {
            if (emit) {
                emit('log', {
                    group: 's-ts-compiler',
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
                            group: 's-ts-compiler',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw4RkFBd0U7QUFDeEUsNEVBQXdEO0FBQ3hELDBFQUdrQztBQUNsQyw0REFFb0I7QUFFcEIsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyx3RUFBaUQ7QUFDakQsa0ZBQXlEO0FBSXpELHdGQUFrRTtBQUVsRSw0RkFBc0U7QUFDdEUsb0ZBQThEO0FBSzlELDJHQUFxRjtBQUNyRiw0RkFBd0U7QUFDeEUsNEZBQXNFO0FBRXRFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsNEZBQTRFO0FBRTVFLGtFQUEyQztBQTZCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsb0JBQVc7SUFzQm5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsSUFBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILDJCQUFzQixHQUFHLEVBQUUsQ0FBQztJQWpCNUIsQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQ0QsUUFBUSxDQUNOLE1BQTRCLEVBQzVCLFFBQTBDO1FBRTFDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztZQUN0RCxRQUFRLEdBQUcsbUJBQVcsQ0FB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