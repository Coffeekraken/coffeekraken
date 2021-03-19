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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const ensureDirSync_1 = __importDefault(require("../../fs/ensureDirSync"));
const filename_1 = __importDefault(require("../../fs/filename"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const SFile_1 = __importDefault(require("../../fs/SFile"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const rootDir_1 = __importDefault(require("../../path/rootDir"));
const sugarDir_1 = __importDefault(require("../../path/sugarDir"));
const tmpDir_1 = __importDefault(require("../../path/tmpDir"));
const spawn_1 = __importDefault(require("../../process/spawn"));
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
        return new s_promise_1.default(({ resolve, reject, pipe, pipeFrom, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.tsCompilerSettings, {}, settings || {});
            let input = Array.isArray(params.input) ? params.input : [params.input];
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
                    else if (fs_1.default.existsSync(`${sugar_1.default('ts.tsconfigTemplatesDir')}/tsconfig.${stackName}.js`)) {
                        input.push(`${sugar_1.default('ts.tsconfigTemplatesDir')}/tsconfig.${stackName}.js`);
                    }
                    else {
                        throw new Error(`Sorry but the tsconfig.{stack}.js(on) "<yellow>${stackName}</yellow>" does not exists...`);
                    }
                });
            }
            const colors = ['yellow', 'cyan', 'magenta', 'green', 'red'];
            // loop on inputs
            input.forEach((inputPath, i) => {
                if (inputPath.match(/.*\/tsconfig(\..*)?\.js(on)?$/)) {
                    const inputPathToDisplay = inputPath
                        .replace(`${sugarDir_1.default()}/src/templates/tsconfig/`, '@sugar/')
                        .replace(`${packageRoot_1.default()}/`, '')
                        .replace(/\.js$/, '.json');
                    let tsconfigJson = {};
                    if (inputPath.match(/\.js$/)) {
                        tsconfigJson = require(inputPath);
                    }
                    else {
                        const jsonFile = new SFile_1.default(inputPath);
                        tsconfigJson = jsonFile.content;
                    }
                    // extends
                    if (tsconfigJson.extends) {
                        const extendsPath = path_1.default.resolve(folderPath_1.default(inputPath), tsconfigJson.extends);
                        let extendsJson = {};
                        // reading the file
                        if (extendsPath.match(/\.json$/)) {
                            const extendsFile = new SFile_1.default(extendsPath);
                            extendsJson = extendsFile.content;
                        }
                        else if (extendsPath.match(/\.js$/)) {
                            extendsJson = require(extendsPath);
                        }
                        else {
                            emit('warn', {
                                value: `THe tsconfig file "<cyan>${inputPath}</cyan>" extends property "<yellow>${tsconfigJson.extends}</yellow>" seems to be incorrect...`
                            });
                        }
                        delete tsconfigJson.extends;
                        // extends the config
                        tsconfigJson = deepMerge_1.default(extendsJson, tsconfigJson);
                    }
                    // include
                    if (!tsconfigJson.include && tsconfigJson._include) {
                        tsconfigJson.include = tsconfigJson._include;
                    }
                    delete tsconfigJson._include;
                    if (tsconfigJson.include) {
                        tsconfigJson.include = tsconfigJson.include.map((path) => {
                            if (path_1.default.isAbsolute(path))
                                return path;
                            return path_1.default.resolve(folderPath_1.default(inputPath), path);
                        });
                    }
                    // exclude
                    if (!tsconfigJson.exclude && tsconfigJson._exclude) {
                        tsconfigJson.exclude = tsconfigJson._exclude;
                    }
                    delete tsconfigJson._exclude;
                    // outputDir
                    if (params.outputDir) {
                        tsconfigJson.outDir = path_1.default.resolve(folderPath_1.default(inputPath), params.outputDir);
                    }
                    // rootDir
                    if (params.rootDir) {
                        tsconfigJson.rootDir = path_1.default.resolve(folderPath_1.default(inputPath), params.rootDir);
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
                    // writing the tsconfig file
                    const tmpFilePath = `${tmpDir_1.default()}/STsCompiler/${filename_1.default(inputPath)}`
                        .split('.')
                        .slice(0, -1)
                        .join('.') + '.json';
                    ensureDirSync_1.default(folderPath_1.default(tmpFilePath));
                    fs_1.default.writeFileSync(tmpFilePath, JSON.stringify(tsconfigJson, null, 4));
                    // build command line
                    const commandLineArray = [];
                    commandLineArray.push(`-p ${tmpFilePath}`);
                    if (params.watch)
                        commandLineArray.push('--watch');
                    // spawn new process
                    try {
                        const pro = spawn_1.default(`tsc ${commandLineArray.join(' ')}`, [], {
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
                        pro.on('close', (value) => {
                            if (value.code === 0) {
                                pro.emit('log', {
                                    value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                                });
                            }
                        });
                        pro.emit('log', {
                            value: `Starting compilation process`
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                else {
                    throw new Error('Sorry but the functionality to compile single file or files is not implemented yet. Please pass as input a "tsconfig.json" file...');
                }
            });
            // const pool = __fsPool(input, {
            //   watch: params.watch
            // });
            // on('cancel', () => {
            //   pool.cancel();
            // });
            // if (params.watch) {
            //   emit('log', {
            //     value: `<blue>[watch]</blue> Watching for changes...`
            //   });
            // }
            // pool.on(params.watch ? 'update' : 'files', async (files) => {
            //   files = Array.isArray(files) ? files : [files];
            //   for (let i = 0; i < files.length; i++) {
            //     const file = files[i];
            //     const compilePromise = file.compile(
            //       {
            //         ...params
            //       },
            //       settings
            //     );
            //     try {
            //       pipe(compilePromise);
            //       const compileRes = await compilePromise;
            //       resultsObj[file.path] = compileRes;
            //       aggregateStrArray.push(compileRes.js);
            //       emit('file', compileRes);
            //     } catch (e) {
            //       emit('warn', {
            //         value: e.toString()
            //       });
            //     }
            //   }
            //   if (params.watch) {
            //     emit('log', {
            //       value: `<blue>[watch]</blue> Watching for changes...`
            //     });
            //   } else {
            //     resolve({
            //       files: resultsObj,
            //       js: aggregateStrArray.join('\n'),
            //       ...duration.end()
            //     });
            //   }
            // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixpRkFBMkQ7QUFDM0QseUVBQW1FO0FBQ25FLCtEQUErQztBQUMvQywyRUFBcUQ7QUFDckQsaUVBQThDO0FBQzlDLHFFQUErQztBQUMvQywyREFBcUM7QUFDckMseUVBQW1EO0FBQ25ELGlFQUEyQztBQUMzQyxtRUFBNkM7QUFDN0MsK0RBQXlDO0FBQ3pDLGdFQUEwQztBQUMxQyx3R0FBa0Y7QUFxQmxGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXNCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFtQztRQUVuQyxLQUFLLENBQ0gsYUFBYSxJQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFyQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBMkJEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUNOLE1BQTRCLEVBQzVCLFFBQTBDO1FBRTFDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3RELFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxD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