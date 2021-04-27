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
const resolveGlob_1 = __importDefault(require("@coffeekraken/sugar/node/glob/resolveGlob"));
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
                // save or not
                // if (!params.save) {
                tsconfigJson.compilerOptions.outDir = `${tmpDir_1.default()}/STsCompiler/${Date.now()}-${inputPathHash}`;
                // }
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
                // spawn new process
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
                                if (params.watch) {
                                    const files = value.value
                                        .split('TSFILE:')
                                        .map((f) => f.trim());
                                    console.log(files);
                                }
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
                            if (value && value.value && typeof value.value === 'string') {
                                const filesCount = value.value.match(/TSFILE:\s/gm).length;
                                pro.emit('log', {
                                    value: `<yellow>${filesCount}</yellow> File${filesCount > 1 ? 's' : ''} compiled`
                                });
                            }
                            // save or not
                            const files = (yield resolveGlob_1.default(`${tsconfigJson.compilerOptions.outDir}/**/*.js`)).map((file) => {
                                return {
                                    path: path_1.default.relative(tsconfigJson.compilerOptions.outDir, file.path),
                                    content: file.content
                                };
                            });
                            pro.emit('log', {
                                value: `Moving compiled files to final destination`
                            });
                            for (let i = 0; i < files.length; i++) {
                                const file = files[i];
                                yield this._handleCompiledFile(file, tsconfigJson);
                            }
                            pro.emit('log', {
                                value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                            });
                            // set files in result obj
                            resultObj.files = files;
                            // resolve the promise
                            resolve(Object.assign(Object.assign({}, resultObj), duration.end()));
                        }
                        else {
                            // reject the promise
                            reject(Object.assign(Object.assign(Object.assign({}, resultObj), { error: value.stderr.join('\n') }), duration.end()));
                        }
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
                    // delete the temp directory if needed
                    removeSync_1.default(tsconfigJson.compilerOptions.outDir);
                    // delete the config file
                    removeSync_1.default(tmpConfigPath);
                    reject(Object.assign(Object.assign(Object.assign({}, resultObj), { error: e }), duration.end()));
                }
            }));
        }), {
            eventEmitter: {
                bind: this
            },
            metas: this.metas
        });
    }
    _handleCompiledFile(file, tsconfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const inPath = path_1.default.resolve(tsconfig.compilerOptions.outDir, file.path);
            let outPath = path_1.default.resolve(tsconfig.compilerOptions.rootDir, file.path);
            if (tsconfig.sTsCompiler && tsconfig.sTsCompiler.outExt) {
                outPath = outPath.replace(/\.[a-zA-Z0-9]+$/, `.${tsconfig.sTsCompiler.outExt}`);
            }
            if (outPath.match(/\.ts(x)?$/) && fs_1.default.existsSync(outPath)) {
                console.log(`<yellow>[warning]</yellow> The output destination of the compiled file "<cyan>${outPath}</cyan>" is the same as the source file and override it... This file is not saved then.`);
            }
            else {
                fs_1.default.renameSync(inPath, outPath);
            }
            return true;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCwwRUFHa0M7QUFDbEMsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyx3RUFBaUQ7QUFDakQsa0ZBQXlEO0FBQ3pELDhGQUF3RTtBQUN4RSxvRkFBaUU7QUFDakUsd0ZBQWtFO0FBQ2xFLHdGQUFrRTtBQUNsRSw0RkFBc0U7QUFFdEUsb0ZBQThEO0FBRTlELGtGQUE0RDtBQUM1RCxtRkFBNkQ7QUFDN0QsK0VBQXlEO0FBQ3pELDJHQUFxRjtBQUNyRiw0RkFBd0U7QUFDeEUsNEZBQXNFO0FBQ3RFLDhGQUF3RTtBQUN4RSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDRGQUE0RTtBQTRCNUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsb0JBQVc7SUFzQm5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsSUFBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUE0QixFQUM1QixRQUEwQztRQUUxQyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxRQUFRLEdBQUcs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