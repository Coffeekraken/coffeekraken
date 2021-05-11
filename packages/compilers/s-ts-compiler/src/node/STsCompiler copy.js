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
                    group: 's-ts-compiler',
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
                        group: 's-ts-compiler',
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
                group: 's-ts-compiler',
                // temp: true,
                value: `<yellow>[compile]</yellow> Compiling file "<cyan>${path_1.default.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
            });
        }
        let finalFile;
        if (outPath.match(/\.ts(x)?$/) && fs_1.default.existsSync(outPath)) {
            if (emit) {
                emit('log', {
                    group: 's-ts-compiler',
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
                            group: 's-ts-compiler',
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