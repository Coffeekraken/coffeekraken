"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const glob_watcher_1 = __importDefault(require("glob-watcher"));
const __ts = __importStar(require("typescript"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const SFile_1 = __importDefault(require("../../fs/SFile"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const glob_1 = __importDefault(require("../../is/glob"));
const glob_2 = __importDefault(require("glob"));
const SCliProcess_1 = __importDefault(require("../../process/SCliProcess"));
const md5_1 = __importDefault(require("../../crypt/md5"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const tmpDir_1 = __importDefault(require("../../path/tmpDir"));
const stripAnsi_1 = __importDefault(require("../../string/stripAnsi"));
const SDuration_1 = __importDefault(require("../../time/SDuration"));
const fs_1 = __importDefault(require("fs"));
const clone_1 = __importDefault(require("../../object/clone"));
const path_1 = __importDefault(require("path"));
const STsCompilerParamsInterface_1 = __importDefault(require("./interface/STsCompilerParamsInterface"));
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
 * @param           {ISTsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import STsCompiler from '@coffeekraken/sugar/node/scss/compile/STsCompiler';
 * const compiler = new STsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.ts');
 *
 * @see             https://svelte.dev/docs#Compile_time
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompiler extends SCompiler_1.default {
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
     * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
     * @param         {Object}            [settings={}]       An object of settings to override the instance ones
     * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _compile(params, settings) {
        return new SPromise_1.default(({ resolve, reject, pipe, pipeFrom, emit }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.tsCompilerSettings, {}, settings || {});
            let input = Array.isArray(params.input) ? params.input : [params.input];
            let tsconfig = clone_1.default(Object.assign({}, params.tsconfig), {
                deep: true
            });
            if (!tsconfig.exclude)
                tsconfig.exclude = [];
            if (!tsconfig.files)
                tsconfig.files = [];
            if (!tsconfig.include)
                tsconfig.include = [];
            if (params.stacks) {
                params.stacks.forEach((stack) => {
                    const compilePromise = this.compile(Object.assign(Object.assign({}, params), { stacks: undefined, input: stack }));
                    pipeFrom(compilePromise);
                });
                // stop execution here
                return;
            }
            // preparing the temp config file name
            let tmpConfigFileName;
            // prod flag
            if (params.prod) {
                params.minify = true;
                params.stripComments = true;
            }
            // make input absolute
            input = absolute_1.default(input);
            // process inputs
            input.forEach((inputStr) => {
                if (glob_1.default(inputStr)) {
                    if (params.watch === true) {
                        tsconfig.include.push(inputStr);
                    }
                    else {
                        const globFiles = glob_2.default.sync(inputStr);
                        tsconfig.files = [...tsconfig.files, ...globFiles];
                    }
                }
                else if (this.getStack(inputStr)) {
                    const stackObj = this.getStack(inputStr);
                    // set the temp file name
                    tmpConfigFileName = inputSBlessedtr + '.tsconfig.js';
                    // const stackPromise = this.compile();
                    tsconfig = deepMerge_1.default(tsconfig, stackObj);
                }
                else {
                    tsconfig.files.push(inputStr);
                }
            });
            // make sure all the files paths are absolute
            tsconfig.files = absolute_1.default(tsconfig.files);
            tsconfig.include = absolute_1.default(tsconfig.include);
            const allAbsFilesPaths = [...tsconfig.files, ...tsconfig.include];
            const duration = new SDuration_1.default();
            if (tsconfig.files.length === 0 && tsconfig.include.length === 0) {
                return reject([
                    `Sorry but their's nothing to compile.`,
                    `In order to specify files/folders to compile, you have these choices:`,
                    `1. Specify some "stacks" to compile in your "<yellow>.sugar/ts.config.js</yellow>" file and launch the compilation using the "<cyan>-s {stack}</cyan>" argument.`,
                    `2. Specify a "<yellow>project</yellow>" tsconfig.json path using the standard "<cyan>-p|--project</cyan>" argument.`,
                    `3. Create a "<yellow>tsconfig.json</yellow>" file at your project root which is "<cyan>${packageRoot_1.default()}</cyan>".`
                ].join('\n'));
            }
            // if no filename for the temp config file, generate one
            if (!tmpConfigFileName) {
                tmpConfigFileName = `${md5_1.default.encrypt(tsconfig.files.concat(tsconfig.include))}.tsconfig.json`;
            }
            // ensure the tsconfig file is valid
            // if (!tsconfig.files.length) delete tsconfig.files;
            // if (!tsconfig.include.length) delete tsconfig.include;
            // if (!tsconfig.exclude.length) delete tsconfig.exclude;
            // wrinting the temp config file
            const tmpConfigFile = new SFile_1.default(`%tmpDir/ts/${tmpConfigFileName}`, {
                file: {
                    checkExistence: false
                }
            });
            // apply target
            const availableTargets = sugar_1.default('ts.targets');
            if (params.target && availableTargets[params.target]) {
                tsconfig.compilerOptions = deepMerge_1.default(tsconfig.compilerOptions, availableTargets[params.target]);
            }
            if (params.transpileOnly && params.watch) {
                emit('log', {
                    clear: true,
                    type: 'time'
                });
                emit('log', {
                    type: 'heading',
                    value: `<yellow>Start</yellow> watching <blue>typescript</blue> files`
                });
                const watcher = glob_watcher_1.default(allAbsFilesPaths);
                const watchCallbackFn = (path, stats) => __awaiter(this, void 0, void 0, function* () {
                    emit('notification', {
                        message: `${this.id} compilation starting`
                    });
                    emit('log', {
                        clear: true,
                        type: 'time'
                    });
                    emit('log', {
                        value: `<yellow>[update]</yellow> File "<cyan>${path_1.default.relative(process.cwd(), path)}</cyan>"`
                    });
                    const watchCompilePromise = this.compile(Object.assign(Object.assign({}, params), { input: path, watch: false }), settings);
                    pipeFrom(watchCompilePromise);
                    yield watchCompilePromise;
                    emit('notification', {
                        type: 'success',
                        message: `${this.id} compilation success`
                    });
                    emit('log', {
                        type: 'separator'
                    });
                    emit('log', {
                        value: '<blue>[watch]</blue> Watching for changes'
                    });
                });
                watcher.on('change', watchCallbackFn);
                watcher.on('add', watchCallbackFn);
                emit('log', {
                    value: '<blue>[watch]</blue> Watching for changes'
                });
                return;
            }
            else if (params.transpileOnly) {
                const compiledFiles = {};
                const allDuration = new SDuration_1.default();
                const allJs = [], allTs = [];
                allAbsFilesPaths.forEach((inputAbsPath) => {
                    const duration = new SDuration_1.default();
                    const source = fs_1.default.readFileSync(inputAbsPath, 'utf8');
                    emit('log', {
                        value: `<yellow>[compiling]</yellow> File "<cyan>${path_1.default.relative(process.cwd(), inputAbsPath)}</cyan>"`
                    });
                    let result = __ts.transpileModule(source, {
                        compilerOptions: tsconfig.compilerOptions
                    });
                    allJs.push(result.outputText);
                    allTs.push(source);
                    let savePath = path_1.default
                        .relative(params.rootDir, inputAbsPath)
                        .replace(/\.tsx?$/, '.js');
                    if (params.outputDir) {
                        savePath = `${params.outputDir}/${savePath}`;
                    }
                    else {
                        savePath = inputAbsPath.replace(/\.tsx?$/, '.js');
                    }
                    compiledFiles[path_1.default.relative(process.cwd(), savePath)] = Object.assign({ ts: source, js: result.outputText, map: result.sourceMaptext }, duration.end());
                    if (params.save) {
                        emit('log', {
                            value: `<green>[saved]</green> File "<cyan>${path_1.default.relative(process.cwd(), inputAbsPath)}</cyan>" <green>saved successfully</green> under "<magenta>${path_1.default.relative(process.cwd(), savePath)}</magenta>"`
                        });
                    }
                });
                const resultObj = {
                    ts: allTs.join('\n'),
                    js: allJs.join('\n'),
                    files: compiledFiles
                };
                resolve(resultObj);
                return;
            }
            emit('notification', {
                message: `${this.id} compilation started`
            });
            emit('log', {
                clear: true,
                type: 'time'
            });
            emit('log', {
                value: [
                    `<yellow>[start]</yellow> Starting typescript compilation using these settings:`,
                    `      <yellow>│</yellow> Watch: ${params.watch ? '<green>true</green>' : '<red>false</red>'}`,
                    `      <yellow>│</yellow> Save: ${params.save ? '<green>true</green>' : '<red>false</red>'}`,
                    `      <yellow>│</yellow> Sourcemap: ${params.map
                        ? `<green>${params.map === true ? 'true' : params.map}</green>`
                        : '<red>false</red>'}`,
                    `      <yellow>│</yellow> Output directory: <cyan>${params.outputDir
                        ? params.outputDir.replace(`${packageRoot_1.default()}/`, '')
                        : 'undefined'}</cyan>`,
                    `      <yellow>│</yellow> Root directory: <cyan>${params.rootDir.replace(`${packageRoot_1.default()}/`, '')}</cyan>`,
                    `      <yellow>│</yellow> Input(s):${tsconfig.files
                        .concat(tsconfig.include)
                        .map((path) => {
                        return `\n      <yellow>│</yellow> - <cyan>${path.replace(`${packageRoot_1.default()}/`, '')}</cyan>`;
                    })}`,
                    ''
                ].join('\n')
            });
            // write the temp file to compile
            tmpConfigFile.writeSync(JSON.stringify(tsconfig, null, 4));
            // build command line to execute
            let command = `tsc --listEmittedFiles --pretty --noEmitOnError -p ${tmpConfigFile.path}`;
            if (params.watch)
                command += ' -w';
            if (params.map) {
                if (params.map === 'inline') {
                    command += ' --inlineSourceMap';
                }
                else {
                    command += ' --sourceMap';
                }
            }
            if (params.rootDir)
                command += ` --rootDir ${params.rootDir}`;
            if (params.save && params.outputDir)
                command += ` --outDir ${params.outputDir}`;
            if (params.stripComments)
                command += ' --removeComments';
            if (!params.save) {
                command += ` --outDir ${tmpDir_1.default()}/ts/unsaved`;
            }
            // create the CLI process
            const pro = new SCliProcess_1.default(command, {
                process: {
                    runAsChild: false,
                    stdio: false,
                    decorators: false
                }
            });
            // keep track of compiled files
            const compiledFiles = [];
            // pipe what comes from the cli process
            pipeFrom(pro, {
                events: 'log',
                filter: (value) => {
                    const val = value.value !== undefined ? value.value : value;
                    if (val === '\u001bc')
                        return false;
                    if (val.match(/Starting\scompilation\sin\swatch\smode/))
                        return false;
                    return true;
                },
                processor: (value, metas) => {
                    let strValue = value.value !== undefined ? value.value : value;
                    let clear = false, type = 'default', separator = false, event = 'log';
                    // removing clear character
                    strValue = strValue.replace('\u001bc', '');
                    let lines = strValue.split('\n');
                    let currentLogType;
                    const logsArray = [];
                    lines.forEach((line) => {
                        let strToAdd = '';
                        if (stripAnsi_1.default(line.trim()).match(/.*:[0-9]{1,10}:[0-9]{1,10}\s-\serror\s/gm)) {
                            event = 'error';
                            strToAdd = `<red>[error]</red> ${line.trim()}\n`;
                            logsArray.push(strToAdd);
                        }
                        else if (stripAnsi_1.default(line.trim()).match(/^error\s/)) {
                            event = 'error';
                            strToAdd = `<red>[error]</red> ${line
                                .trim()
                                .replace(/^error\s/, '')}\n`;
                            logsArray.push(strToAdd);
                        }
                        else if (line.trim().match(/File\schange\sdetected/)) {
                            clear = true;
                            strToAdd = `<yellow>[update]</yellow> File change detected`;
                            logsArray.push(strToAdd);
                        }
                        else if (line.trim().match(/Found\s[0-9]+\serror(s)?/)) {
                            const count = line.match(/.*([0-9]+).*/);
                            if (count && count.length === 2 && count[1] === '0') {
                                strToAdd = line.replace(/.*Found\s([0-9]+)\serror.*/, `<green>[success]</green> Found <yellow>$1</yellow> error`);
                            }
                            else {
                                strToAdd = line.replace(/.*Found\s([0-9]+)\serror.*/, `<red>[error]</red> Found <yellow>$1</yellow> error(s)`);
                            }
                            logsArray.push(strToAdd);
                            if (params.watch) {
                                separator = true;
                                logsArray.push(`<blue>[watch] </blue>Watching for changes...`);
                            }
                        }
                        else if (line.trim().match(/TSFILE:\s/)) {
                            // Emit file
                            let filesArray = [];
                            line.split('TSFILE: ').forEach((fileStr) => {
                                if (fileStr.trim() === '')
                                    return;
                                // add to compiled files array
                                const filePath = fileStr.trim();
                                if (compiledFiles.indexOf(filePath) === -1)
                                    compiledFiles.push(filePath);
                                if (params.save) {
                                    filesArray.push(`<green>[saved]</green> File "<cyan>${fileStr
                                        .trim()
                                        .replace(`${packageRoot_1.default()}/`, '')}</cyan>" saved <green>successfully</green>`);
                                }
                            });
                            strToAdd = filesArray.join('\n');
                            logsArray.push(strToAdd);
                        }
                    });
                    if (!logsArray.length)
                        return;
                    strValue = logsArray.join('\n');
                    if (value.value !== undefined)
                        value.value = strValue;
                    else
                        value = strValue;
                    if (clear) {
                        emit('notification', {
                            message: `${this.id} compilation started`
                        });
                        emit('log', {
                            type: 'time'
                        });
                    }
                    if (separator) {
                        emit('log', {
                            type: 'separator'
                        });
                    }
                    emit(event, {
                        type,
                        clear,
                        value: strValue
                    });
                    // return [value, metas];
                }
            });
            const result = yield pro.run(params);
            // handle error rejection
            if (result &&
                typeof result === 'string' &&
                stripAnsi_1.default(result.trim()).match(/^error\s/)) {
                emit('notification', {
                    type: 'error',
                    message: `${this.id} compilation error`
                });
                return reject(result);
            }
            // gather all the compiled files
            const resultFiles = {};
            const resultCode = {};
            compiledFiles.forEach((filePath) => {
                const file = new SFile_1.default(filePath);
                resultFiles[file.relPath] = file;
                if (!resultCode.js && !filePath.match(/\.map$/)) {
                    resultCode.js = file.content;
                }
                else if (!resultCode.map && filePath.match(/\.map$/)) {
                    resultCode.map = file.content;
                }
            });
            let resultObj = Object.assign({}, duration.end());
            if (params.save) {
                resultObj.files = resultFiles;
            }
            if (compiledFiles.length <= 2) {
                resultObj = Object.assign(Object.assign({}, resultObj), resultCode);
            }
            emit('notification', {
                type: 'success',
                message: `${this.id} compilation success`
            });
            resolve(resultObj);
        }));
    }
    /**
     * @name        getStack
     * @type        Function
     *
     * Check if the passed string is the name of a defined stack or not
     *
     * @param     {String}      stack       The stack to check
     * @return    {Object}                 The stack object defined in the configuration
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    getStack(stack) {
        const definedStacks = sugar_1.default('ts.stacks');
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
        class: STsCompilerParamsInterface_1.default
    }
};
exports.default = STsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0NvbXBpbGVyIGNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLGdFQUF5QztBQUN6QyxpREFBbUM7QUFDbkMsdUVBQWlEO0FBRWpELCtEQUErQztBQUMvQyx5RUFBbUU7QUFFbkUsMkRBQXFDO0FBQ3JDLHNFQUFnRDtBQUNoRCxtRUFBNkM7QUFDN0MseURBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQiw0RUFBc0Q7QUFDdEQsMERBQW9DO0FBQ3BDLHlFQUFtRDtBQUNuRCwrREFBeUM7QUFDekMsdUVBQWlEO0FBQ2pELHFFQUErQztBQUMvQyw0Q0FBc0I7QUFDdEIsK0RBQXlDO0FBQ3pDLGdEQUEwQjtBQUcxQix3R0FBa0Y7QUF3QmxGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG1CQUFXO0lBd0JuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTJDLEVBQzNDLFFBQW1DO1FBRW5DLEtBQUssQ0FDSCxhQUFhLElBQUksRUFBRSxFQUNuQixtQkFBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsUUFBMEM7UUFFMUMsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hFLFFBQVEs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