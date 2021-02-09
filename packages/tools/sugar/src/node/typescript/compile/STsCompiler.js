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
            let tsconfig = Object.assign({}, params.tsconfig);
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
            tsconfig.files = absolute_1.default(tsconfig.files);
            tsconfig.include = absolute_1.default(tsconfig.include);
            const startTime = Date.now();
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
            if (!tsconfig.files.length)
                delete tsconfig.files;
            if (!tsconfig.include.length)
                delete tsconfig.include;
            if (!tsconfig.exclude.length)
                delete tsconfig.exclude;
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
                        // console.log('L', line);
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
                return reject();
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
            let resultObj = {
                startTime: startTime,
                endTime: Date.now(),
                duration: Date.now() - startTime
            };
            if (params.save) {
                resultObj.files = resultFiles;
            }
            if (compiledFiles.length <= 2) {
                resultObj = Object.assign(Object.assign({}, resultObj), resultCode);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx1RUFBaUQ7QUFFakQsK0RBQStDO0FBQy9DLHlFQUFtRTtBQUVuRSwyREFBcUM7QUFDckMsc0VBQWdEO0FBQ2hELG1FQUE2QztBQUM3Qyx5REFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLDRFQUFzRDtBQUN0RCwwREFBb0M7QUFDcEMseUVBQW1EO0FBQ25ELCtEQUF5QztBQUN6Qyx1RUFBaUQ7QUFHakQsd0dBQWtGO0FBdUJsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXdCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFtQztRQUVuQyxLQUFLLENBQ0gsYUFBYSxJQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFyQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBMkJEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUNOLE1BQTRCLEVBQzVCLFFBQTBDO1FBRTFDLE9BQU8sSUFBSSxrQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RSxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUVwRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsT0FB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