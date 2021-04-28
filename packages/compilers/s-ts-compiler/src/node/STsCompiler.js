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
const s_compiler_1 = __importDefault(require("@coffeekraken/s-compiler"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const ensureDirSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/ensureDirSync"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const removeSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/removeSync"));
const rootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/rootDir"));
const tmpDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/tmpDir"));
const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const availableColors_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/availableColors"));
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
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
            // clear
            if (params.clear && params.outDir) {
                emit('log', {
                    value: `Clearing the outDir "<yellow>${params.outDir}</yellow>" before compilation`
                });
                const outDirPath = path_1.default.resolve(params.rootDir || process.cwd(), params.outDir);
                removeSync_1.default(outDirPath);
            }
            // loop on inputs
            input.forEach((inputPath, i) => __awaiter(this, void 0, void 0, function* () {
                let tsconfigJson = {}, inputPathToDisplay, inputPathHash = md5_1.default.encrypt(inputPath);
                const isTsConfigInput = inputPath.match(/.*\/tsconfig(\..*)?\.js(on)?$/);
                if (!isTsConfigInput && inputPath.match(/\.tsx?$/)) {
                    if (!config) {
                        throw new Error(`Sorry but to compile the passed "<cyan>${inputPath}</cyan>" input, you MUST specify a valid config to use like "js", "node", "shared", or a full tsconfig file path`);
                    }
                    inputPathToDisplay = filename_1.default(inputPath);
                    tsconfigJson = config;
                }
                else if (isTsConfigInput) {
                    inputPathToDisplay = filename_1.default(inputPath).replace(/\.js(on)?$/, '');
                    if (inputPath.match(/\.js$/)) {
                        tsconfigJson = require(inputPath);
                    }
                    else {
                        const jsonFile = new s_file_1.default(inputPath);
                        tsconfigJson = jsonFile.content;
                    }
                }
                else {
                    throw new Error('Sorry but the input "<yellow>${input}</yellow> seems to be invalid...');
                }
                // extends
                if (tsconfigJson.extends) {
                    const extendsPath = path_1.default.resolve(folderPath_1.default(inputPath), tsconfigJson.extends);
                    let extendsJson = {};
                    // reading the file
                    if (extendsPath.match(/\.json$/)) {
                        const extendsFile = new s_file_1.default(extendsPath);
                        extendsJson = extendsFile.content;
                    }
                    else if (extendsPath.match(/\.js$/)) {
                        extendsJson = require(extendsPath);
                    }
                    else {
                        emit('warn', {
                            value: `<bg${upperFirst_1.default(this.metas.color)}><black> ${this.metas.id} </black></bg${upperFirst_1.default(this.metas.color)}> THe tsconfig file "<cyan>${inputPath}</cyan>" extends property "<yellow>${tsconfigJson.extends}</yellow>" seems to be incorrect...`
                        });
                    }
                    delete tsconfigJson.extends;
                    // extends the config
                    tsconfigJson = deepMerge_1.default(extendsJson, tsconfigJson);
                }
                // include (only for non tsconfig input)
                if (!isTsConfigInput) {
                    tsconfigJson.include = [inputPath];
                }
                else {
                    if (!tsconfigJson.include && tsconfigJson._include) {
                        tsconfigJson.include = tsconfigJson._include;
                    }
                }
                delete tsconfigJson._include;
                // make sure includes are absolute
                if (tsconfigJson.include) {
                    tsconfigJson.include = tsconfigJson.include.map((path) => {
                        if (path_1.default.isAbsolute(path))
                            return path;
                        if (isTsConfigInput) {
                            return path_1.default.resolve(folderPath_1.default(inputPath), path);
                        }
                        else {
                            return path_1.default.resolve(path);
                        }
                    });
                }
                // exclude
                if (!tsconfigJson.exclude && tsconfigJson._exclude) {
                    tsconfigJson.exclude = tsconfigJson._exclude;
                }
                delete tsconfigJson._exclude;
                // rootDir
                if (params.rootDir) {
                    if (!path_1.default.isAbsolute(params.rootDir)) {
                        throw new Error(`Sorry but the parameter "<yellow>rootDir</yellow>" MUST be an absolute path. You've passed "<cyan>${params.rootDir}</cyan>"`);
                    }
                    tsconfigJson.compilerOptions.rootDir = params.rootDir;
                }
                // outDir
                if (params.outDir) {
                    tsconfigJson.compilerOptions.outDir = path_1.default.resolve(params.rootDir || process.cwd(), params.outDir);
                    delete tsconfigJson.compilerOptions.rootDir;
                }
                // compilerOptions
                if (!tsconfigJson.compilerOptions)
                    tsconfigJson.compilerOptions = {};
                if (params.compilerOptions) {
                    tsconfigJson.compilerOptions = deepMerge_1.default(tsconfigJson.compilerOptions || {}, params.compilerOptions);
                }
                // map
                if (params.map === false) {
                    delete tsconfigJson.compilerOptions.sourceMap;
                    delete tsconfigJson.compilerOptions.inlineSourceMap;
                }
                else if (params.map === true) {
                    tsconfigJson.compilerOptions.sourceMap = true;
                    delete tsconfigJson.compilerOptions.inlineSourceMap;
                }
                else if (params.map === 'inline') {
                    delete tsconfigJson.compilerOptions.sourceMap;
                    tsconfigJson.compilerOptions.inlineSourceMap = true;
                }
                tsconfigJson.compilerOptions.outDir = `${tmpDir_1.default()}/STsCompiler/${Date.now()}-${inputPathHash}`;
                const tmpConfigPath = `${tmpDir_1.default()}/STsCompiler/${filename_1.default(inputPath)}.${md5_1.default.encrypt(inputPath)}.json`;
                // writing the tsconfig file
                ensureDirSync_1.default(folderPath_1.default(tmpConfigPath));
                fs_1.default.writeFileSync(tmpConfigPath, JSON.stringify(tsconfigJson, null, 4));
                // build command line
                const commandLineArray = [];
                commandLineArray.push(`-p ${tmpConfigPath}`);
                if (params.watch)
                    commandLineArray.push('--watch');
                // setup resultObj
                const resultObj = {
                    tsconfig: tsconfigJson,
                    params
                };
                const compiledFilesPaths = [];
                try {
                    const pro = spawn_1.default(`tsc ${commandLineArray.join(' ')} --listEmittedFiles`, [], {
                        cwd: params.rootDir || process.cwd()
                    });
                    pipeFrom(pro, {
                        processor: (value, metas) => {
                            let txtValue;
                            if (value.value && typeof value.value === 'string')
                                txtValue = value.value;
                            else if (typeof value === 'string')
                                txtValue = value;
                            if (txtValue) {
                                txtValue = txtValue.replace(/[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\s[AP]M\s-\s/, '');
                            }
                            if (txtValue &&
                                txtValue.match(/No inputs were found in config file/g)) {
                                if (value.value)
                                    value.value = `No file found...`;
                                else
                                    value = 'No file found...';
                            }
                            else if (txtValue) {
                                if (value.value)
                                    value.value = txtValue;
                                else
                                    value = txtValue;
                            }
                            return [value, metas];
                        },
                        filter: (value, metas) => {
                            if (value &&
                                value.value &&
                                typeof value.value === 'string' &&
                                value.value.match(/TSFILE:\s.*/)) {
                                const filesPaths = value.value
                                    .split('TSFILE:')
                                    .map((f) => f.trim());
                                filesPaths.forEach((filePath) => {
                                    const outPath = this._handleCompiledFile(filePath, tsconfigJson, pro.emit);
                                    if (outPath && compiledFilesPaths.indexOf(outPath) === -1) {
                                        compiledFilesPaths.push(outPath);
                                    }
                                });
                                return false;
                            }
                            if (!metas.event.match(/^close/))
                                return true;
                            if (value.stdout &&
                                value.stdout
                                    .join(' ')
                                    .match(/No inputs were found in config file/g))
                                return false;
                            return true;
                        },
                        stripAnsi: true,
                        prefixValue: `<${colors[i] || 'yellow'}>[${inputPathToDisplay}]</${colors[i] || 'yellow'}> `
                    });
                    pro.on('close', (value) => __awaiter(this, void 0, void 0, function* () {
                        if (value.code === 0) {
                            resultObj.files = [];
                            compiledFilesPaths.forEach((file) => {
                                if (!file || !file.trim())
                                    return;
                                resultObj.files.push(s_file_1.default.new(file).toObject());
                                if (!params.save) {
                                    try {
                                        fs_1.default.unlinkSync(file);
                                    }
                                    catch (e) { }
                                }
                            });
                            pro.emit('log', {
                                value: `<yellow>${compiledFilesPaths.length}</yellow> File${compiledFilesPaths.length > 1 ? 's' : ''} compiled`
                            });
                            pro.emit('log', {
                                value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                            });
                            // resolve the promise
                            resolve(Object.assign(Object.assign({}, resultObj), duration.end()));
                        }
                        else {
                            // reject the promise
                            reject(Object.assign(Object.assign(Object.assign({}, resultObj), { error: value.stderr.join('\n') }), duration.end()));
                        }
                        // pool.cancel();
                        // delete the temp directory if needed
                        removeSync_1.default(tsconfigJson.compilerOptions.outDir);
                        // delete the config file
                        removeSync_1.default(tmpConfigPath);
                    }));
                    pro.emit('log', {
                        value: `Starting compilation process`
                    });
                }
                catch (e) {
                    // pool.cancel();
                    // delete the temp directory if needed
                    removeSync_1.default(tsconfigJson.compilerOptions.outDir);
                    // delete the config file
                    removeSync_1.default(tmpConfigPath);
                    reject(Object.assign(Object.assign(Object.assign({}, resultObj), { error: e }), duration.end()));
                }
                // });
            }));
        }), {
            eventEmitter: {
                bind: this
            },
            metas: this.metas
        });
    }
    _handleCompiledFile(file, tsconfig, emit) {
        if (!file)
            return;
        if (typeof file === 'string') {
            file = new s_file_1.default(file, {
                file: tsconfig.compilerOptions.rootDir
            });
        }
        const relPath = path_1.default.relative(tsconfig.compilerOptions.outDir, file.path);
        if (this._currentlyHandledFiles[relPath])
            return;
        this._currentlyHandledFiles[relPath] = true;
        const inPath = path_1.default.resolve(tsconfig.compilerOptions.outDir, relPath);
        let outPath = path_1.default.resolve(tsconfig.compilerOptions.rootDir, relPath);
        if (tsconfig.sTsCompiler && tsconfig.sTsCompiler.outExt) {
            outPath = outPath.replace(/\.[a-zA-Z0-9]+$/, `.${tsconfig.sTsCompiler.outExt}`);
        }
        // console.log(__path.relative(tsconfig.compilerOptions.outDir, file.path));
        if (emit) {
            // emit('log', {
            //   // temp: true,
            //   value: `<yellow>[compile]</yellow> Compiling file "<cyan>${__path.relative(
            //     tsconfig.compilerOptions.outDir,
            //     file.path
            //   )}</cyan>"`
            // });
        }
        if (outPath.match(/\.ts(x)?$/) && fs_1.default.existsSync(outPath)) {
            if (emit) {
                emit('log', {
                    value: `<yellow>[warning]</yellow> The output destination of the compiled file "<cyan>${outPath}</cyan>" is the same as the source file and override it... This file is not saved then.`
                });
            }
        }
        else {
            try {
                try {
                    fs_1.default.unlinkSync(outPath);
                }
                catch (e) { }
                fs_1.default.renameSync(inPath, outPath);
                if (outPath.match(/\.cli\.js$/) && emit) {
                    emit('log', {
                        temp: true,
                        value: `<yellow>[compile]</yellow> Adding execution permission to file "<cyan>${path_1.default.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
                    });
                    child_process_1.default.execSync(`chmod +x ${outPath}`);
                }
            }
            catch (e) {
                delete this._currentlyHandledFiles[relPath];
            }
        }
        delete this._currentlyHandledFiles[relPath];
        return outPath;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFHZCwwRUFHa0M7QUFFbEMsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyx3RUFBaUQ7QUFDakQsa0ZBQXlEO0FBQ3pELDhGQUF3RTtBQUN4RSxvRkFBaUU7QUFDakUsd0ZBQWtFO0FBQ2xFLHdGQUFrRTtBQUdsRSxvRkFBOEQ7QUFFOUQsa0ZBQTREO0FBQzVELG1GQUE2RDtBQUM3RCwrRUFBeUQ7QUFDekQsMkdBQXFGO0FBQ3JGLDRGQUF3RTtBQUN4RSw0RkFBc0U7QUFDdEUsOEZBQXdFO0FBQ3hFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsNEZBQTRFO0FBRTVFLGtFQUEyQztBQTRCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsb0JBQVc7SUFzQm5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsSUFBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILDJCQUFzQixHQUFHLEVBQUUsQ0FBQztJQWpCNUIsQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQ0QsUUFBUSxDQUNOLE1BQTRCLEVBQzVCLFFBQTBDO1FBRTFDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVB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