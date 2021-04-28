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
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const s_compiler_1 = __importDefault(require("@coffeekraken/s-compiler"));
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
                    const pro = spawn_1.default(`tsc ${commandLineArray.join(' ')}`, [], {
                        cwd: params.rootDir || process.cwd()
                    });
                    // listen outDir
                    const pool = pool_1.default(`${tsconfigJson.compilerOptions.outDir}/**/*`, {
                        watch: true,
                        cwd: tsconfigJson.compilerOptions.outDir
                    });
                    pool.on('file', (file) => {
                        this._handleCompiledFile(file, tsconfigJson, pro.emit);
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
                            // if (
                            //   value &&
                            //   value.value &&
                            //   typeof value.value === 'string' &&
                            //   value.value.match(/TSFILE:\s.*/)
                            // ) {
                            //   if (params.watch) {
                            //     const filesPaths = value.value
                            //       .split('TSFILE:')
                            //       .map((f) => f.trim());
                            //     filesPaths.forEach((filePath) => {
                            //       this._handleCompiledFile(
                            //         filePath,
                            //         tsconfigJson,
                            //         pro.emit
                            //       );
                            //     });
                            //   }
                            //   return false;
                            // }
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
                            // if (value && value.value && typeof value.value === 'string') {
                            //   const filesCount = value.value.match(/TSFILE:\s/gm).length;
                            //   pro.emit('log', {
                            //     value: `<yellow>${filesCount}</yellow> File${
                            //       filesCount > 1 ? 's' : ''
                            //     } compiled`
                            //   });
                            // }
                            // if (!params.watch) {
                            //   // save or not
                            //   const files = await __resolveGlob(
                            //     `${tsconfigJson.compilerOptions.outDir}/**/*.js`
                            //   );
                            //   // .map((file) => {
                            //   //   return {
                            //   //     path: __path.relative(
                            //   //       tsconfigJson.compilerOptions.outDir,
                            //   //       file.path
                            //   //     ),
                            //   //     content: file.content
                            //   //   };
                            //   // });
                            //   pro.emit('log', {
                            //     value: `Moving compiled files to final destination`
                            //   });
                            //   for (let i = 0; i < files.length; i++) {
                            //     const file = files[i];
                            //     await this._handleCompiledFile(
                            //       file,
                            //       tsconfigJson,
                            //       pro.emit
                            //     );
                            //   }
                            pro.emit('log', {
                                value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                            });
                            //   // set files in result obj
                            //   resultObj.files = files;
                            // }
                            // resolve the promise
                            resolve(Object.assign(Object.assign({}, resultObj), duration.end()));
                        }
                        else {
                            // reject the promise
                            reject(Object.assign(Object.assign(Object.assign({}, resultObj), { error: value.stderr.join('\n') }), duration.end()));
                        }
                        pool.cancel();
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
                    pool.cancel();
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
    _handleCompiledFile(file, tsconfig, emit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                return;
            if (typeof file === 'string') {
                file = new s_file_1.default(file, {
                    file: tsconfig.compilerOptions.rootDir
                });
            }
            const relPath = path_1.default.relative(tsconfig.compilerOptions.outDir, file.path);
            if (this._currentlyHandledFiles[relPath])
                return;
            this._currentlyHandledFiles[relPath] = true;
            const inPath = path_1.default.resolve(tsconfig.compilerOptions.outDir, relPath);
            let outPath = path_1.default.resolve(tsconfig.compilerOptions.rootDir, relPath);
            if (tsconfig.sTsCompiler && tsconfig.sTsCompiler.outExt) {
                outPath = outPath.replace(/\.[a-zA-Z0-9]+$/, `.${tsconfig.sTsCompiler.outExt}`);
            }
            emit('log', {
                temp: true,
                value: `<yellow>[compile]</yellow> Compiling file "<cyan>${path_1.default.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
            });
            if (outPath.match(/\.ts(x)?$/) && fs_1.default.existsSync(outPath)) {
                emit('log', {
                    value: `<yellow>[warning]</yellow> The output destination of the compiled file "<cyan>${outPath}</cyan>" is the same as the source file and override it... This file is not saved then.`
                });
            }
            else {
                try {
                    try {
                        fs_1.default.unlinkSync(outPath);
                    }
                    catch (e) { }
                    fs_1.default.renameSync(inPath, outPath);
                }
                catch (e) {
                    console.log(e.message);
                    console.log('ERRO', inPath, outPath);
                    delete this._currentlyHandledFiles[relPath];
                }
            }
            delete this._currentlyHandledFiles[relPath];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBd0Q7QUFDeEQsMEVBR2tDO0FBQ2xDLDBFQUFtRDtBQUNuRCxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELGtGQUF5RDtBQUN6RCw4RkFBd0U7QUFDeEUsb0ZBQWlFO0FBQ2pFLHdGQUFrRTtBQUNsRSx3RkFBa0U7QUFHbEUsb0ZBQThEO0FBRTlELGtGQUE0RDtBQUM1RCxtRkFBNkQ7QUFDN0QsK0VBQXlEO0FBQ3pELDJHQUFxRjtBQUNyRiw0RkFBd0U7QUFDeEUsNEZBQXNFO0FBQ3RFLDhGQUF3RTtBQUN4RSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDRGQUE0RTtBQThCNUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsb0JBQVc7SUFzQm5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsSUFBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILDJCQUFzQixHQUFHLEVBQUUsQ0FBQztJQWpCNUIsQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQ0QsUUFBUSxDQUNOLE1BQTRCLEVBQzVCLFFBQTBDO1FBRTFDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVB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