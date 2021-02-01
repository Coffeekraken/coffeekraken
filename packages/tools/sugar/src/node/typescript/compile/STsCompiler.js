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
                                strToAdd = line.replace(/.*Found\s([0-9]+)\serror.*/, `<green>[success]</green> Found <yellow>$1</yellow> error`);
                            }
                            else {
                                strToAdd = line.replace(/.*Found\s([0-9]+)\serror.*/, `<red>[error]</red> Found <yellow>$1</yellow> error(s)`);
                            }
                            logsArray.push(strToAdd);
                            if (params.watch) {
                                logsArray.push(`<blue>[watch] </blue>Watching for changes...`);
                            }
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