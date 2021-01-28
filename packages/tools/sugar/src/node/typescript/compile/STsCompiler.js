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
const STsCompilerParamsInterface_1 = __importDefault(require("./interface/STsCompilerParamsInterface"));
/**
 * @name                STsCompiler
 * @namespace           sugar.node.typescript
 * @type                Class
 * @extends             SCompiler
 * @wip
 *
 * This class wrap the "typescript" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {ISTsCompilerOptionalParams}      [initialParams={}]      Some parameters to use for your compilation process
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
                    tmpConfigFileName = inputStr + '.tsconfig.js';
                    // const stackPromise = this.compile();
                    tsconfig = deepMerge_1.default(tsconfig, stackObj);
                }
                else {
                    tsconfig.files.push(inputStr);
                }
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
                    let endSpace = false;
                    // removing clear character
                    strValue = strValue.replace('\u001bc', '');
                    let lines = strValue.split('\n');
                    let currentLogType;
                    const logsArray = [];
                    lines.forEach((line) => {
                        let strToAdd = '';
                        if (currentLogType === 'error') {
                            // console.log({ line });
                            // strToAdd = `      <red>│</red> ${line}`;
                            // logsArray.push(strToAdd);
                            return;
                        }
                        if (line.trim().match(/File\schange\sdetected/)) {
                            currentLogType = 'update';
                            strToAdd = `<yellow>[update]</yellow> File change detected`;
                            logsArray.push(strToAdd);
                        }
                        else if (line.trim().match(/Found\s[0-9]+\serror(s)?/)) {
                            currentLogType = 'errorFound';
                            const count = line.match(/.*([0-9]+).*/);
                            if (count && count.length === 2 && count[1] === '0') {
                                strToAdd = line.replace(/.*Found\s([0-9]+)\serror.*/, `<green>[ended]</green> Found <yellow>$1</yellow> error`);
                            }
                            else {
                                strToAdd = line.replace(/.*Found\s([0-9]+)\serror.*/, `<magenta>[ended]</magenta> Found <yellow>$1</yellow> error(s)`);
                            }
                            logsArray.push(strToAdd);
                        }
                        else if (line.trim().match(/TSFILE:\s/)) {
                            // Emit file
                            currentLogType = 'save';
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
                        else if (line.trim().match(/.*:.*[0-9]+.*:.*[0-9]+.*\s/)) {
                            currentLogType = 'error';
                            // console.log({ line });
                            // const lns = line
                            //   .split('\n')
                            //   .filter((l) => {
                            //     return !Array.isArray(l.trim().match(/^TSFILE:\s.*/));
                            //   })
                            //   .map((l) => {
                            //     return `      <red>│</red> ${l}`;
                            //   })
                            //   .filter((l) => {
                            //     return l.trim() !== '<red>│</red>';
                            //   });
                            strToAdd = `<red>[error]</red> ${strValue.trim()}`;
                            logsArray.push(strToAdd);
                        }
                    });
                    strValue = logsArray.join('\n');
                    // strValue = strValue.trim();
                    // if (endSpace) strValue = `${strValue} \n`;
                    if (value.value !== undefined)
                        value.value = strValue;
                    else
                        value = strValue;
                    return [value, metas];
                }
            });
            yield pro.run(params);
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
            const resultObj = {
                startTime: startTime,
                endTime: Date.now(),
                duration: Date.now() - startTime
            };
            if (params.save) {
                resultObj.files = resultFiles;
            }
            if (compiledFiles.length <= 2) {
                resultObj.code = resultCode;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx1RUFBaUQ7QUFFakQsK0RBQStDO0FBQy9DLHlFQUFtRTtBQUVuRSwyREFBcUM7QUFDckMsc0VBQWdEO0FBQ2hELG1FQUE2QztBQUM3Qyx5REFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLDRFQUFzRDtBQUN0RCwwREFBb0M7QUFDcEMseUVBQW1EO0FBQ25ELCtEQUF5QztBQUd6Qyx3R0FBa0Y7QUFxQ2xGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG1CQUFXO0lBc0JuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTBDLEVBQzFDLFFBQW1DO1FBRW5DLEtBQUssQ0FDSCxhQUFhLElBQUksRUFBRSxFQUNuQixtQkFBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsUUFBeUM7UUFFekMsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hFLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRXBFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxD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