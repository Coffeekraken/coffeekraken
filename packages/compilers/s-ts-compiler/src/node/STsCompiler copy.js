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
const typescript_1 = __importDefault(require("typescript"));
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
                // // build command line
                // const commandLineArray: string[] = [];
                // commandLineArray.push(`-p ${tmpConfigPath}`);
                // if (params.watch) commandLineArray.push('--watch');
                // setup resultObj
                const resultObj = {
                    tsconfig: tsconfigJson,
                    params
                };
                const compiledFilesByPath = {};
                let result = typescript_1.default.transpileModule(source, tsconfigJson);
                try {
                    // const pro = __spawn(
                    //   `tsc ${commandLineArray.join(' ')} --listEmittedFiles`,
                    //   [],
                    //   {
                    //     cwd: params.rootDir || process.cwd()
                    //   }
                    // );
                    // pipeFrom(pro, {
                    //   processor: (value, metas) => {
                    //     let txtValue;
                    //     if (value.value && typeof value.value === 'string')
                    //       txtValue = value.value;
                    //     else if (typeof value === 'string') txtValue = value;
                    //     if (txtValue) {
                    //       txtValue = txtValue.replace(
                    //         /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\s[AP]M\s-\s/,
                    //         ''
                    //       );
                    //     }
                    //     if (
                    //       txtValue &&
                    //       txtValue.match(/No inputs were found in config file/g)
                    //     ) {
                    //       if (value.value) value.value = `No file found...`;
                    //       else value = 'No file found...';
                    //     } else if (txtValue) {
                    //       if (value.value) value.value = txtValue;
                    //       else value = txtValue;
                    //     }
                    //     return [value, metas];
                    //   },
                    //   filter: (value, metas) => {
                    //     console.log('CCC', metas.event, value);
                    //     if (
                    //       value &&
                    //       value.value &&
                    //       typeof value.value === 'string' &&
                    //       value.value.match(/TSFILE:\s.*/)
                    //     ) {
                    //       const filesPaths = value.value
                    //         .split('TSFILE:')
                    //         .map((f) => f.trim());
                    //       filesPaths.forEach((filePath) => {
                    //         const outFile = this._handleCompiledFile(
                    //           filePath,
                    //           tsconfigJson,
                    //           params,
                    //           pro.emit
                    //         );
                    //         if (outFile && !compiledFilesByPath[filePath]) {
                    //           compiledFilesByPath[filePath] = outFile;
                    //         }
                    //       });
                    //       return false;
                    //     }
                    //     if (!metas.event.match(/^close/)) return true;
                    //     if (
                    //       value.stdout &&
                    //       value.stdout
                    //         .join(' ')
                    //         .match(/No inputs were found in config file/g)
                    //     )
                    //       return false;
                    //     return true;
                    //   },
                    //   stripAnsi: true,
                    //   prefixValue: `<${
                    //     colors[i] || 'yellow'
                    //   }>[${inputPathToDisplay}]</${colors[i] || 'yellow'}> `
                    // });
                    // pro.on('close', async (value) => {
                    //   if (value.code === 0) {
                    //     resultObj.files = [];
                    //     Object.keys(compiledFilesByPath).forEach((filePath) => {
                    //       if (!filePath) return;
                    //       const file = compiledFilesByPath[filePath];
                    //       resultObj.files.push(file);
                    //     });
                    //     pro.emit('log', {
                    //       value: `<yellow>${resultObj.files.length}</yellow> File${
                    //         resultObj.files.length > 1 ? 's' : ''
                    //       } compiled`
                    //     });
                    //     pro.emit('log', {
                    //       value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                    //     });
                    //     // resolve the promise
                    //     resolve({
                    //       ...resultObj,
                    //       ...duration.end()
                    //     });
                    //   } else {
                    //     // reject the promise
                    //     reject({
                    //       ...resultObj,
                    //       error: value.stderr.join('\n'),
                    //       ...duration.end()
                    //     });
                    //   }
                    //   // pool.cancel();
                    //   __onProcessExit(() => {
                    //     // delete the temp directory if needed
                    //     __removeSync(tsconfigJson.compilerOptions.outDir);
                    //     // delete the config file
                    //     __removeSync(tmpConfigPath);
                    //   });
                    // });
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
                // temp: true,
                value: `<yellow>[compile]</yellow> Compiling file "<cyan>${path_1.default.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
            });
        }
        let finalFile;
        if (outPath.match(/\.ts(x)?$/) && fs_1.default.existsSync(outPath)) {
            if (emit) {
                emit('log', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0NvbXBpbGVyIGNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBR2QsMEVBR2tDO0FBQ2xDLDREQUFzQztBQUV0QywwRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCxrRkFBeUQ7QUFDekQsOEZBQXdFO0FBQ3hFLG9GQUFpRTtBQUNqRSx3RkFBa0U7QUFDbEUsd0ZBQWtFO0FBR2xFLG9GQUE4RDtBQUU5RCxrRkFBNEQ7QUFFNUQsK0VBQXlEO0FBQ3pELDJHQUFxRjtBQUNyRiw0RkFBd0U7QUFDeEUsNEZBQXNFO0FBQ3RFLDhGQUF3RTtBQUN4RSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDRGQUE0RTtBQUU1RSxrRUFBMkM7QUE2QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG9CQUFXO0lBc0JuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTJDLEVBQzNDLFFBQW1DO1FBRW5DLEtBQUssQ0FDSCxhQUFhLElBQUksRUFBRSxFQUNuQixtQkFBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBR0o7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCwyQkFBc0IsR0FBRyxFQUFFLENBQUM7SUFqQjVCLENBQUM7SUFyQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBMkNELFFBQVEsQ0FDTixNQUE0QixFQUM1QixRQUEwQztRQUUxQyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVB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