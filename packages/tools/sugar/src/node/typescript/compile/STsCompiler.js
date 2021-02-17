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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsZ0VBQXlDO0FBQ3pDLGlEQUFtQztBQUNuQyx1RUFBaUQ7QUFFakQsK0RBQStDO0FBQy9DLHlFQUFtRTtBQUVuRSwyREFBcUM7QUFDckMsc0VBQWdEO0FBQ2hELG1FQUE2QztBQUM3Qyx5REFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLDRFQUFzRDtBQUN0RCwwREFBb0M7QUFDcEMseUVBQW1EO0FBQ25ELCtEQUF5QztBQUN6Qyx1RUFBaUQ7QUFDakQscUVBQStDO0FBQy9DLDRDQUFzQjtBQUN0QiwrREFBeUM7QUFDekMsZ0RBQTBCO0FBRzFCLHdHQUFrRjtBQXdCbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsbUJBQVc7SUF3Qm5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsSUFBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUE0QixFQUM1QixRQUEwQztRQUUxQyxPQUFPLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDeEUsUUFBUSxHQUFHLG1CQUFX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