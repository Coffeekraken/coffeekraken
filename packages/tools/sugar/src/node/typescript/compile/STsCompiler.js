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
const STsCompilerParamsInterface_1 = __importDefault(require("./interface/STsCompilerParamsInterface"));
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
        super(initialParams, deepMerge_1.default({
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
    _compile(params, settings = {}) {
        return new SPromise_1.default(({ resolve, reject, pipe, pipeFrom, emit }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.tsCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            let tsconfig = Object.assign({}, params.tsconfig);
            if (params.stacks) {
                params.stacks.forEach((stack) => {
                    const compilePromise = this.compile(Object.assign(Object.assign({}, params), { stacks: undefined, input: stack }));
                    // pipeFrom(compilePromise);
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
                    `      <yellow>│</yellow> Output directory: <cyan>${params.outputDir.replace(`${packageRoot_1.default()}/`, '')}</cyan>`,
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
            // handle params
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
            // instanciate a new process
            // const def = {};
            // Object.keys(def).forEach((prop) => {
            //   if (__TscInterface.definition[prop] !== undefined) {
            //     def[prop] = __STsCompilerParamsInterface.definition[prop];
            //   }
            // });
            let command = `tsc --listEmittedFiles --pretty -p ${tmpConfigFile.path}`;
            if (params.watch)
                command += ' -w';
            if (!params.save)
                command += ' --noEmit';
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
            if (params.outputDir)
                command += ` --outDir ${params.outputDir}`;
            if (params.stripComments)
                command += ' --removeComments';
            const pro = new SCliProcess_1.default(command, {
                process: {
                    stdio: false,
                    decorators: false
                }
            });
            pipeFrom(pro, {
                events: 'log',
                filter: (value) => {
                    const val = value.value || value;
                    if (val === '\u001bc')
                        return false;
                    if (val.match(/Starting\scompilation\sin\swatch\smode/))
                        return false;
                    if (val.trim().match(/TSFILE:\s.*\/undefined\/.*/)) {
                        return false;
                    }
                    return true;
                },
                processor: (value, metas) => {
                    let strValue = value.value || value;
                    let endSpace = false;
                    strValue = strValue.replace('\u001bc', '');
                    if (strValue.trim().match(/File\schange\sdetected/)) {
                        strValue = `<yellow>[update]</yellow> File change detected`;
                    }
                    else if (strValue.trim().match(/Found\s[0-9]+\serror(s)?/)) {
                        const count = strValue.match(/.*([0-9]+).*/);
                        if (count && count.length === 2 && count[1] === '0') {
                            strValue = strValue.replace(/.*Found\s([0-9]+)\serror.*/, `<green>[ended]</green> Found <yellow>$1</yellow> error`);
                        }
                        else {
                            strValue = strValue.replace(/.*Found\s([0-9]+)\serror.*/, `<magenta>[ended]</magenta> Found <yellow>$1</yellow> error(s)`);
                        }
                    }
                    else if (strValue.trim().match(/.*:.*[0-9]+.*:.*[0-9]+.*\s/)) {
                        strValue = strValue
                            .split('\n')
                            .filter((line) => {
                            return !Array.isArray(line.trim().match(/^TSFILE:\s.*/));
                        })
                            .map((line) => {
                            return `      <red>│</red> ${line}`;
                        })
                            .filter((line) => {
                            return line.trim() !== '<red>│</red>';
                        });
                        strValue = strValue.join('\n');
                        strValue = `<red>[error]</red> ${strValue.trim().slice(13)}`;
                        endSpace = true;
                    }
                    else if (strValue.trim().match(/TSFILE:\s/)) {
                        // error
                        if (strValue.trim().match(/TSFILE:\s.*\/undefined\/.*/)) {
                            strValue = '';
                            // strValue = strValue
                            //   .split('\n')
                            //   .filter((line) => {
                            //     return !Array.isArray(line.trim().match(/^TSFILE:\s.*/));
                            //   })
                            //   .map((line) => {
                            //     return `      <red>│</red> ${line}`;
                            //   })
                            //   .join('\n');
                            // strValue = `<red>[error]</red> Something went wrong\n${strValue}`;
                        }
                        else {
                            // Emit file
                            strValue = `<green>[saved]</green> File "<cyan>${strValue
                                .replace('TSFILE: ', '')
                                .trim()
                                .replace(`${packageRoot_1.default()}/`, '')}</cyan>" saved <green>successfully</green>`;
                        }
                    }
                    strValue = strValue.trim();
                    // if (endSpace) strValue = `${strValue} \n`;
                    if (value.value)
                        value.value = strValue;
                    else
                        value = strValue;
                    return [value, metas];
                }
            });
            // pro.on('log', (value, metas) => {
            //   console.log('LFLFLF', value);
            // });
            yield pro.run(params);
            resolve();
            //   for (let i = 0; i < filesPaths.length; i++) {
            //     let filePath = filesPaths[i];
            //     let file = new __STsFile(filePath, {
            //       tsFile: {
            //         compile: settings
            //       }
            //     });
            //     pipe(file);
            //     const resPromise = file.compile(params, {
            //       ...settings
            //     });
            //     const res = await resPromise;
            //     resultsObj[file.path] = res;
            //   }
            //   // resolve with the compilation result
            //   if (!params.watch) {
            //     resolve({
            //       files: resultsObj,
            //       startTime: startTime,
            //       endTime: Date.now(),
            //       duration: Date.now() - startTime
            //     });
            //   } else {
            //     emit('files', {
            //       files: resultsObj,
            //       startTime: startTime,
            //       endTime: Date.now(),
            //       duration: Date.now() - startTime
            //     });
            //   }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx1RUFBaUQ7QUFFakQsK0RBQStDO0FBQy9DLHlFQUFtRTtBQUVuRSwyREFBcUM7QUFDckMsc0VBQWdEO0FBQ2hELG1FQUE2QztBQUM3Qyx5REFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLDRFQUFzRDtBQUN0RCwwREFBb0M7QUFDcEMseUVBQW1EO0FBR25ELHdHQUFrRjtBQXFDbEYsTUFBTSxXQUFZLFNBQVEsbUJBQVc7SUFzQm5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBeUMsRUFDekMsUUFBa0M7UUFFbEMsS0FBSyxDQUNILGFBQWEsRUFDYixtQkFBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsV0FBMkMsRUFBRTtRQUU3QyxPQUFPLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDeEUsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUU5RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxN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