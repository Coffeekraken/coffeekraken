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
            nativeConsole.log(configPath);
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
            input.forEach((inputPath, i) => {
                let tsconfigJson = {}, inputPathToDisplay;
                const isTsConfigInput = inputPath.match(/.*\/tsconfig(\..*)?\.js(on)?$/);
                if (!isTsConfigInput && inputPath.match(/\.tsx?$/)) {
                    if (!config) {
                        throw new Error(`Sorry but to compile the passed "<cyan>${inputPath}</cyan>" input, you MUST specify a valid config to use like "js", "node", "shared", or a full tsconfig file path`);
                    }
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
                    if (!tsconfigJson.include && tsconfigJson._include) {
                        tsconfigJson.include = tsconfigJson._include;
                    }
                }
                else {
                    tsconfigJson.include = [inputPath];
                }
                delete tsconfigJson._include;
                // make sure includes are absolute
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
                // rootDir
                if (params.rootDir) {
                    if (!path_1.default.isAbsolute(params.rootDir)) {
                        throw new Error(`Sorry but the parameter "<yellow>rootDir</yellow>" MUST be an absolute path. You've passed "<cyan>${params.rootDir}</cyan>"`);
                    }
                    tsconfigJson.rootDir = params.rootDir;
                }
                // outDir
                if (params.outDir) {
                    tsconfigJson.compilerOptions.outDir = path_1.default.resolve(params.rootDir || process.cwd(), params.outDir);
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
                console.log(commandLineArray.join(' '));
                return;
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
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0RkFBc0U7QUFDdEUsNEZBR3FEO0FBQ3JELDRGQUF3RTtBQUN4RSxvRkFBb0U7QUFDcEUsOEZBQXdFO0FBQ3hFLG9GQUFpRTtBQUNqRSx3RkFBa0U7QUFDbEUsOEVBQXdEO0FBQ3hELDRGQUFzRTtBQUN0RSxvRkFBOEQ7QUFDOUQsc0ZBQWdFO0FBQ2hFLGtGQUE0RDtBQUM1RCxtRkFBNkQ7QUFDN0QsNEZBQTRFO0FBQzVFLHdGQUFrRTtBQUNsRSw0R0FBc0Y7QUFDdEYsOEZBQXdFO0FBNEJ4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXNCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFtQztRQUVuQyxLQUFLLENBQ0gsYUFBYSxJQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsTUFBTTthQUNkO1lBQ0QsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXhDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUE4QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsUUFBMEM7UUFFMUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFB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