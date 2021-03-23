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
                    else if (fs_1.default.existsSync(`${sugar_1.default('ts.tsconfigTemplatesDir')}/tsconfig.${stackName}.js`)) {
                        input.push(`${sugar_1.default('ts.tsconfigTemplatesDir')}/tsconfig.${stackName}.js`);
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
                else if (fs_1.default.existsSync(`${sugar_1.default('ts.tsconfigTemplatesDir')}/tsconfig.${params.config}.js`)) {
                    configPath = `${sugar_1.default('ts.tsconfigTemplatesDir')}/tsconfig.${params.config}.js`;
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
        class: STsCompilerInterface_1.default
    }
};
exports.default = STsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0RkFBc0U7QUFDdEUsNEZBR3FEO0FBQ3JELDBGQUFvRTtBQUNwRSw0RkFBd0U7QUFDeEUsb0ZBQW9FO0FBQ3BFLDhGQUF3RTtBQUN4RSxvRkFBaUU7QUFDakUsd0ZBQWtFO0FBQ2xFLDhFQUF3RDtBQUN4RCw0RkFBc0U7QUFDdEUsb0ZBQThEO0FBQzlELHNGQUFnRTtBQUNoRSxrRkFBNEQ7QUFDNUQsbUZBQTZEO0FBQzdELDRGQUE0RTtBQUM1RSx3RkFBa0U7QUFDbEUsNEdBQXNGO0FBQ3RGLDhGQUF3RTtBQUN4RSwrRUFBeUQ7QUFDekQsNEZBQXNFO0FBNkJ0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXNCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFtQztRQUVuQyxLQUFLLENBQ0gsYUFBYSxJQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsTUFBTTthQUNkO1lBQ0QsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXhDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUE4QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsUUFBMEM7UUFFMUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFF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