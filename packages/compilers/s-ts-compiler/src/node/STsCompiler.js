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
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SCompiler_1 = __importDefault(require("@coffeekraken/sugar/node/compiler/SCompiler"));
const SDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/SDuration"));
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const ensureDirSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/ensureDirSync"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const SFile_1 = __importDefault(require("@coffeekraken/sugar/node/fs/SFile"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const rootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/rootDir"));
const sugarDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/sugarDir"));
const tmpDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/tmpDir"));
const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
const STsCompilerInterface_1 = __importDefault(require("./interface/STsCompilerInterface"));
const removeSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/removeSync"));
const availableColors_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/colors/availableColors"));
const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const resolveGlob_1 = __importDefault(require("@coffeekraken/sugar/node/glob/resolveGlob"));
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
            metas: {
                color: 'blue'
            },
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
     * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
     * @param         {Object}            [settings={}]       An object of settings to override the instance ones
     * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _compile(params, settings) {
        return new s_promise_1.default(({ resolve, reject, pipe, pipeFrom, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.tsCompilerSettings, {}, settings || {});
            let input = Array.isArray(params.input) ? params.input : [params.input];
            let config;
            const duration = new SDuration_1.default();
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
                    else if (fs_1.default.existsSync(`${sugar_1.default('ts.tsconfigStacksDir')}/tsconfig.${stackName}.js`)) {
                        input.push(`${sugar_1.default('ts.tsconfigStacksDir')}/tsconfig.${stackName}.js`);
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
                else if (fs_1.default.existsSync(`${sugar_1.default('ts.tsconfigStacksDir')}/tsconfig.${params.config}.js`)) {
                    configPath = `${sugar_1.default('ts.tsconfigStacksDir')}/tsconfig.${params.config}.js`;
                }
                if (!configPath) {
                    throw new Error(`Sorry but the passed "<yellow>${params.config}</yellow>" config parameter does not resolve to any valid tsconfig file...`);
                }
                else {
                    if (configPath.match(/\.js$/)) {
                        config = require(configPath);
                    }
                    else {
                        const jsonFile = new SFile_1.default(configPath);
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
                let tsconfigJson = {}, inputPathToDisplay;
                const isTsConfigInput = inputPath.match(/.*\/tsconfig(\..*)?\.js(on)?$/);
                if (!isTsConfigInput && inputPath.match(/\.tsx?$/)) {
                    if (!config) {
                        throw new Error(`Sorry but to compile the passed "<cyan>${inputPath}</cyan>" input, you MUST specify a valid config to use like "js", "node", "shared", or a full tsconfig file path`);
                    }
                    inputPathToDisplay = filename_1.default(inputPath);
                    tsconfigJson = config;
                }
                else if (isTsConfigInput) {
                    inputPathToDisplay = inputPath
                        .replace(`${sugarDir_1.default()}/src/templates/tsconfig/`, 'sugar:')
                        .replace(`${packageRoot_1.default()}/`, '')
                        .replace('tsconfig.', '')
                        .replace(/\.js(on)?$/, '');
                    if (inputPath.match(/\.js$/)) {
                        tsconfigJson = require(inputPath);
                    }
                    else {
                        const jsonFile = new SFile_1.default(inputPath);
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
                        const extendsFile = new SFile_1.default(extendsPath);
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
                if (!params.save) {
                    tsconfigJson.compilerOptions.outDir = `${tmpDir_1.default()}/STsCompiler/${Date.now()}`;
                }
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
                    pro.on('close', (value) => __awaiter(this, void 0, void 0, function* () {
                        if (value.code === 0) {
                            pro.emit('log', {
                                value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                            });
                            // save or not
                            if (!params.save) {
                                const files = (yield resolveGlob_1.default(`${tsconfigJson.compilerOptions.outDir}/**/*.js`)).map((file) => {
                                    return {
                                        path: path_1.default.relative(tsconfigJson.compilerOptions.outDir, file.path),
                                        content: file.content
                                    };
                                });
                                // set files in result obj
                                resultObj.files = files;
                            }
                            // resolve the promise
                            resolve(Object.assign(Object.assign({}, resultObj), duration.end()));
                        }
                        else {
                            // reject the promise
                            reject(Object.assign(Object.assign(Object.assign({}, resultObj), { error: value.stderr.join('\n') }), duration.end()));
                        }
                        // delete the temp directory if needed
                        if (!params.save) {
                            removeSync_1.default(tsconfigJson.compilerOptions.outDir);
                        }
                        // delete the config file
                        removeSync_1.default(tmpConfigPath);
                    }));
                    pro.emit('log', {
                        value: `Starting compilation process`
                    });
                }
                catch (e) {
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
        class: STsCompilerInterface_1.default
    }
};
exports.default = STsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0RkFBc0U7QUFDdEUsNEZBR3FEO0FBQ3JELDBGQUFvRTtBQUNwRSw0RkFBd0U7QUFDeEUsb0ZBQW9FO0FBQ3BFLDhGQUF3RTtBQUN4RSxvRkFBaUU7QUFDakUsd0ZBQWtFO0FBQ2xFLDhFQUF3RDtBQUN4RCw0RkFBc0U7QUFDdEUsb0ZBQThEO0FBQzlELHNGQUFnRTtBQUNoRSxrRkFBNEQ7QUFDNUQsbUZBQTZEO0FBQzdELDRGQUE0RTtBQUM1RSx3RkFBa0U7QUFDbEUsNEdBQXNGO0FBQ3RGLDhGQUF3RTtBQUN4RSwrRUFBeUQ7QUFDekQsNEZBQXNFO0FBNkJ0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXNCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFtQztRQUVuQyxLQUFLLENBQ0gsYUFBYSxJQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsTUFBTTthQUNkO1lBQ0QsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXhDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUE4QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsUUFBMEM7UUFFMUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdEQsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7WUFFcEUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLElBQUksTUFBTSxDQUFDO1lBRVgsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7WUFFbkMsSUFBSSxNQUFNLEdBQVEsU0FBUyxDQUFDO1lBQzVCLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFBRSxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O29CQUNyRCxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUM1QjtZQUVELDJCQUEyQjtZQUMzQixJQUFJLE1BQU0sRUFBRTtnQkFDVixLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDM0IsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQVMsRUFBRSxhQUFhLFNBQVMsT0FBTyxDQUFDLEVBQUU7d0JBQ2hFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBUyxFQUFFLGFBQWEsU0FBUyxPQUFPLENBQUMsQ0FBQztxQkFDekQ7eUJBQU0sSUFDTCxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQVMsRUFBRSxhQUFhLFNBQVMsS0FBSyxDQUFDLEVBQzFEO3dCQUNBLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBUyxFQUFFLGFBQWEsU0FBUyxLQUFLLENBQUMsQ0FBQztxQkFDdkQ7eUJBQU0sSUFDTCxZQUFJLENBQUMsVUFBVSxDQUNiLEdBQUcsZUFBYSxDQUNkLHNCQUFzQixDQUN2QixhQUFhLFNBQVMsS0FBSyxDQUM3QixFQUNEO3dCQUNBLEtBQUssQ0FBQyxJQUFJLENBQ1IsR0FBRyxlQUFhLENBQ2Qsc0JBQXNCLENBQ3ZCLGFBQWEsU0FBUyxLQUFLLENBQzdCLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYixrREFBa0QsU0FBUywrQkFBK0IsQ0FDM0YsQ0FBQztxQkFDSDtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQ3RELElBQUksVUFBVSxDQUFDO2dCQUNmLElBQ0UsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGlCQUFTLEVBQUUsYUFBYSxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsRUFDaEU7b0JBQ0EsVUFBVSxHQUFHLEdBQUcsaUJBQVMsRUFBRSxhQUFhLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQztpQkFDOUQ7cUJBQU0sSUFDTCxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQVMsRUFBRSxhQUFhLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUM5RDtvQkFDQSxVQUFVLEdBQUcsR0FBRyxpQkFBUyxFQUFFLGFBQWEsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO2lCQUM1RDtxQkFBTSxJQUNMLFlBQUksQ0FBQyxVQUFVLENBQ2IsR0FBRyxlQUFhLENBQUMsc0JBQXNCLENBQUMsYUFDdEMsTUFBTSxDQUFDLE1BQ1QsS0FBSyxDQUNOLEVBQ0Q7b0JBQ0EsVUFBVSxHQUFHLEdBQUcsZUFBYSxDQUFDLHNCQUFzQixDQUFDLGFBQ25ELE1BQU0sQ0FBQyxNQUNULEtBQUssQ0FBQztpQkFDUDtnQkFDRCxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNmLE1BQU0sSUFBSSxLQUFLLENBQ2IsaUNBQWlDLE1BQU0sQ0FBQyxNQUFNLDRFQUE0RSxDQUMzSCxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDN0IsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDOUI7eUJBQU07d0JBQ0wsTUFBTSxRQUFRLEdBQUcsSUFBSSxlQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3pDLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO3FCQUMzQjtpQkFDRjthQUNGO2lCQUFNLElBQUkscUJBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3pDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3hCO1lBRUQsTUFBTSxNQUFNLEdBQUcseUJBQWlCLEVBQUUsQ0FBQztZQUVuQyxRQUFRO1lBQ1IsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLGdDQUFnQyxNQUFNLENBQUMsTUFBTSwrQkFBK0I7aUJBQ3BGLENBQUMsQ0FBQztnQkFDSCxNQUFNLFVBQVUsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUMvQixNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FDZCxDQUFDO2dCQUNGLG9CQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUI7WUFFRCxpQkFBaUI7WUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFPLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxZQUFZLEdBQUcsRUFBRSxFQUNuQixrQkFBa0IsQ0FBQztnQkFFckIsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FDckMsK0JBQStCLENBQ2hDLENBQUM7Z0JBRUYsSUFBSSxDQUFDLGVBQWUsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLFNBQVMsa0hBQWtILENBQ3RLLENBQUM7cUJBQ0g7b0JBQ0Qsa0JBQWtCLEdBQUcsa0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDOUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztpQkFDdkI7cUJBQU0sSUFBSSxlQUFlLEVBQUU7b0JBQzFCLGtCQUFrQixHQUFHLFNBQVM7eUJBQzNCLE9BQU8sQ0FBQyxHQUFHLGtCQUFVLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxDQUFDO3lCQUM1RCxPQUFPLENBQUMsR0FBRyxxQkFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7eUJBQ2xDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO3lCQUN4QixPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUU3QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQzVCLFlBQVksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ25DO3lCQUFNO3dCQUNMLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN4QyxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztxQkFDakM7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYix1RUFBdUUsQ0FDeEUsQ0FBQztpQkFDSDtnQkFFRCxVQUFVO2dCQUNWLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsTUFBTSxXQUFXLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDaEMsb0JBQVksQ0FBQyxTQUFTLENBQUMsRUFDdkIsWUFBWSxDQUFDLE9BQU8sQ0FDckIsQ0FBQztvQkFDRixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNoQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGVBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDN0MsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7cUJBQ25DO3lCQUFNLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDckMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDcEM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDWCxLQUFLLEVBQUUsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDYixnQkFBZ0Isb0JBQVksQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQ2pCLDhCQUE4QixTQUFTLHNDQUN0QyxZQUFZLENBQUMsT0FDZixxQ0FBcUM7eUJBQ3RDLENBQUMsQ0FBQztxQkFDSjtvQkFDRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUM7b0JBQzVCLHFCQUFxQjtvQkFDckIsWUFBWSxHQUFHLG1CQUFXLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO2lCQUN2RDtnQkFFRCx3Q0FBd0M7Z0JBQ3hDLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3BCLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTt3QkFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO3FCQUM5QztpQkFDRjtnQkFDRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBRTdCLGtDQUFrQztnQkFDbEMsSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFO29CQUN4QixZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ3ZELElBQUksY0FBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7NEJBQUUsT0FBTyxJQUFJLENBQUM7d0JBQ3pDLElBQUksZUFBZSxFQUFFOzRCQUNuQixPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQUMsb0JBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDdEQ7NkJBQU07NEJBQ0wsT0FBTyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUM3QjtvQkFDSCxDQUFDLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxVQUFVO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUU7b0JBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztpQkFDOUM7Z0JBQ0QsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUU3QixVQUFVO2dCQUNWLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDbEIsSUFBSSxDQUFDLGNBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUN0QyxNQUFNLElBQUksS0FBSyxDQUNiLHFHQUFxRyxNQUFNLENBQUMsT0FBTyxVQUFVLENBQzlILENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDdkQ7Z0JBRUQsU0FBUztnQkFDVCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2xELE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUMvQixNQUFNLENBQUMsTUFBTSxDQUNkLENBQUM7b0JBQ0YsT0FBTyxZQUFZLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztpQkFDN0M7Z0JBRUQsa0JBQWtCO2dCQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWU7b0JBQUUsWUFBWSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBRXJFLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRTtvQkFDMUIsWUFBWSxDQUFDLGVBQWUsR0FBRyxtQkFBVyxDQUN4QyxZQUFZLENBQUMsZUFBZSxJQUFJLEVBQUUsRUFDbEMsTUFBTSxDQUFDLGVBQWUsQ0FDdkIsQ0FBQztpQkFDSDtnQkFFRCxNQUFNO2dCQUNOLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxLQUFLLEVBQUU7b0JBQ3hCLE9BQU8sWUFBWSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7b0JBQzlDLE9BQU8sWUFBWSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7aUJBQ3JEO3FCQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUU7b0JBQzlCLFlBQVksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDOUMsT0FBTyxZQUFZLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztpQkFDckQ7cUJBQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtvQkFDbEMsT0FBTyxZQUFZLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztvQkFDOUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2lCQUNyRDtnQkFFRCxjQUFjO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO29CQUNoQixZQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxHQUFHLGdCQUFRLEVBQUUsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUNqRjtnQkFFRCxNQUFNLGFBQWEsR0FBRyxHQUFHLGdCQUFRLEVBQUUsZ0JBQWdCLGtCQUFhLENBQzlELFNBQVMsQ0FDVixJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFFckMsNEJBQTRCO2dCQUM1Qix1QkFBZSxDQUFDLG9CQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDN0MsWUFBSSxDQUFDLGFBQWEsQ0FDaEIsYUFBYSxFQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDdEMsQ0FBQztnQkFFRixxQkFBcUI7Z0JBQ3JCLE1BQU0sZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO2dCQUN0QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLE1BQU0sQ0FBQyxLQUFLO29CQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFbkQsa0JBQWtCO2dCQUNsQixNQUFNLFNBQVMsR0FBRztvQkFDaEIsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLE1BQU07aUJBQ1AsQ0FBQztnQkFFRixvQkFBb0I7Z0JBQ3BCLElBQUk7b0JBQ0YsTUFBTSxHQUFHLEdBQUcsZUFBTyxDQUFDLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO3dCQUMzRCxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO3FCQUNyQyxDQUFDLENBQUM7b0JBRUgsUUFBUSxDQUFDLEdBQUcsRUFBRTt3QkFDWixTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQzFCLElBQUksUUFBUSxDQUFDOzRCQUNiLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUTtnQ0FDaEQsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7aUNBQ3BCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtnQ0FBRSxRQUFRLEdBQUcsS0FBSyxDQUFDOzRCQUVyRCxJQUFJLFFBQVEsRUFBRTtnQ0FDWixRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FDekIsOENBQThDLEVBQzlDLEVBQUUsQ0FDSCxDQUFDOzZCQUNIOzRCQUVELElBQ0UsUUFBUTtnQ0FDUixRQUFRLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLEVBQ3REO2dDQUNBLElBQUksS0FBSyxDQUFDLEtBQUs7b0NBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQzs7b0NBQzdDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQzs2QkFDakM7aUNBQU0sSUFBSSxRQUFRLEVBQUU7Z0NBQ25CLElBQUksS0FBSyxDQUFDLEtBQUs7b0NBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7O29DQUNuQyxLQUFLLEdBQUcsUUFBUSxDQUFDOzZCQUN2Qjs0QkFDRCxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUN4QixDQUFDO3dCQUNELE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTs0QkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQ0FBRSxPQUFPLElBQUksQ0FBQzs0QkFDOUMsSUFDRSxLQUFLLENBQUMsTUFBTTtnQ0FDWixLQUFLLENBQUMsTUFBTTtxQ0FDVCxJQUFJLENBQUMsR0FBRyxDQUFDO3FDQUNULEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQztnQ0FFaEQsT0FBTyxLQUFLLENBQUM7NEJBQ2YsT0FBTyxJQUFJLENBQUM7d0JBQ2QsQ0FBQzt3QkFDRCxTQUFTLEVBQUUsSUFBSTt3QkFDZixXQUFXLEVBQUUsSUFDWCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksUUFDZixLQUFLLGtCQUFrQixNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUk7cUJBQ3ZELENBQUMsQ0FBQztvQkFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO3dCQUM5QixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFOzRCQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQ0FDZCxLQUFLLEVBQUUscURBQXFELEtBQUssQ0FBQyxnQkFBZ0IsV0FBVzs2QkFDOUYsQ0FBQyxDQUFDOzRCQUVILGNBQWM7NEJBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0NBQ2hCLE1BQU0sS0FBSyxHQUFHLENBQ1osTUFBTSxxQkFBYSxDQUNqQixHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxVQUFVLENBQ2pELENBQ0YsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQ0FDYixPQUFPO3dDQUNMLElBQUksRUFBRSxjQUFNLENBQUMsUUFBUSxDQUNuQixZQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFDbkMsSUFBSSxDQUFDLElBQUksQ0FDVjt3Q0FDRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87cUNBQ3RCLENBQUM7Z0NBQ0osQ0FBQyxDQUFDLENBQUM7Z0NBRUgsMEJBQTBCO2dDQUMxQixTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs2QkFDekI7NEJBRUQsc0JBQXNCOzRCQUN0QixPQUFPLGlDQUNGLFNBQVMsR0FDVCxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQ2pCLENBQUM7eUJBQ0o7NkJBQU07NEJBQ0wscUJBQXFCOzRCQUNyQixNQUFNLCtDQUNELFNBQVMsS0FDWixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQzNCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFDakIsQ0FBQzt5QkFDSjt3QkFFRCxzQ0FBc0M7d0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFOzRCQUNoQixvQkFBWSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ25EO3dCQUVELHlCQUF5Qjt3QkFDekIsb0JBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztvQkFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDZCxLQUFLLEVBQUUsOEJBQThCO3FCQUN0QyxDQUFDLENBQUM7aUJBQ0o7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsTUFBTSwrQ0FDRCxTQUFTLEtBQ1osS0FBSyxFQUFFLENBQUMsS0FDTCxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQ2pCLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBLEVBQ0Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxRQUFRLENBQUMsS0FBSztRQUNaLE1BQU0sYUFBYSxHQUFHLGVBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDeEMsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7QUE3Y00sc0JBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSw4QkFBNEI7S0FDcEM7Q0FDRixDQUFDO0FBMmNKLGtCQUFlLFdBQVcsQ0FBQyJ9