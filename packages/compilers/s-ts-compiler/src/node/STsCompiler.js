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
            const colors = availableColors_1.default();
            // clear
            if (params.clear && params.outDir) {
                emit('log', {
                    value: `<bg${upperFirst_1.default(this.metas.color)}><black> ${this.metas.id} </black></bg${upperFirst_1.default(this.metas.color)}> Clearing the outDir "<yellow>${params.outDir}</yellow>" before compilation`
                });
                const outDirPath = path_1.default.resolve(params.rootDir || process.cwd(), params.outDir);
                removeSync_1.default(outDirPath);
            }
            // loop on inputs
            input.forEach((inputPath, i) => {
                if (inputPath.match(/.*\/tsconfig(\..*)?\.js(on)?$/)) {
                    const inputPathToDisplay = inputPath
                        .replace(`${sugarDir_1.default()}/src/templates/tsconfig/`, 'sugar/')
                        .replace(`${packageRoot_1.default()}/`, '')
                        .replace('tsconfig.', '')
                        .replace(/\.js(on)?$/, '');
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
                                value: `<bg${upperFirst_1.default(this.metas.color)}><black> ${this.metas.id} </black></bg${upperFirst_1.default(this.metas.color)}> THe tsconfig file "<cyan>${inputPath}</cyan>" extends property "<yellow>${tsconfigJson.extends}</yellow>" seems to be incorrect...`
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
                            prefixValue: `<bg${upperFirst_1.default(this.metas.color)}><black> ${this.metas.id} </black></bg${upperFirst_1.default(this.metas.color)}> <${colors[i] || 'yellow'}>[${inputPathToDisplay}]</${colors[i] || 'yellow'}> `
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
        class: STsCompilerInterface_1.default
    }
};
exports.default = STsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0RkFBc0U7QUFDdEUsNEZBR3FEO0FBQ3JELG9GQUFvRTtBQUNwRSw4RkFBd0U7QUFDeEUsb0ZBQWlFO0FBQ2pFLHdGQUFrRTtBQUNsRSw4RUFBd0Q7QUFDeEQsNEZBQXNFO0FBQ3RFLG9GQUE4RDtBQUM5RCxzRkFBZ0U7QUFDaEUsa0ZBQTREO0FBQzVELG1GQUE2RDtBQUM3RCw0RkFBNEU7QUFDNUUsd0ZBQWtFO0FBQ2xFLDRHQUFzRjtBQUN0Riw4RkFBd0U7QUEyQnhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG1CQUFXO0lBc0JuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTJDLEVBQzNDLFFBQW1DO1FBRW5DLEtBQUssQ0FDSCxhQUFhLElBQUksRUFBRSxFQUNuQixtQkFBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxNQUFNO2FBQ2Q7WUFDRCxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBeENEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQThCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUE0QixFQUM1QixRQUEwQztRQUUxQyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZ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