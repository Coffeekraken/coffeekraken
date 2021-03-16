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
const SCache_1 = __importDefault(require("../../cache/SCache"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const is_glob_1 = __importDefault(require("is-glob"));
const STsCompileInterface_1 = __importDefault(require("./interface/STsCompileInterface"));
const transpileAndSave_1 = __importDefault(require("./transpileAndSave"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const TscInterface_1 = __importDefault(require("./interface/TscInterface"));
const SFile_1 = __importDefault(require("../../fs/SFile"));
const tmpDir_1 = __importDefault(require("../../fs/tmpDir"));
const SCliProcess_1 = __importDefault(require("../../process/SCliProcess"));
/**
 * @name                STsCompiler
 * @namespace           sugar.node.typescript
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "ts" compiler with some additional features which are:
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 *
 * @setting         {String}        [id=this.constructor.name]          An id for your compiler. Used for cache, etc...
 * @setting         {Object}        [ts={}]        Pass the "sass" (https://www.npmjs.com/package/sass) options here. ! The "file" and "data" properties are overrided by the first parameter of the "compile" method
 * @setting         {Onject}       [optimizers={}]     Pass an object of optimizing settings
 * @setting         {Boolean}       [optimizers.split=true]     Specify if you want to make use of the splitting code technique to compile only what's really changed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import STsCompiler from '@coffeekraken/sugar/node/scss/STsCompiler';
 * const compiler = new STsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompiler extends SCompiler_1.default {
    /**
     * @name            constructor
     * @type             Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({}, settings));
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
    _compile(input, settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        return new SPromise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const startTime = Date.now();
            // engage the cache
            const cache = new SCache_1.default(settings.id, {
                ttl: '10d'
            });
            if (settings.clearCache) {
                yield cache.clear();
            }
            let cacheId;
            const tmpDir = tmpDir_1.default();
            const stacksPromises = [];
            const tsconfig = Object.assign({}, settings.tsconfig);
            if (!tsconfig.files)
                tsconfig.files = [];
            if (!tsconfig.include)
                tsconfig.include = [];
            // process inputs
            const absoluteInput = absolute_1.default(input);
            absoluteInput.forEach((inputStr) => {
                if (is_glob_1.default(inputStr)) {
                    if (settings.watch === true) {
                        tsconfig.include.push(inputStr);
                    }
                    else {
                        const globFiles = glob_1.default.sync(inputStr);
                        tsconfig.files = [...tsconfig.files, ...globFiles];
                    }
                }
                else if (this.isStack(inputStr, tsconfig)) {
                    const stackPromise = this.compile();
                    tsconfig = deepMerge_1.default(tsconfig, tsconfig.stacks[inputStr]);
                }
                else if (fs_1.default.existsSync(inputStr)) {
                    tsconfig.files.push(inputStr);
                }
            });
            tsconfig.files = absolute_1.default(tsconfig.files);
            tsconfig.include = absolute_1.default(tsconfig.include);
            // if (params.input != undefined) {
            //   if (!Array.isArray(params.input)) params.input = [params.input];
            //   emit('log', {
            //     value: `<yellow>Input</yellow> file(s) to compile:\n- <cyan>${params.input.join(
            //       '</cyan>\n- <cyan>'
            //     )}</cyan>`
            //   });
            //   const tsconfigJson = __deepMerge(params.tsconfig, {
            //     files: [...filesToCompile, ...params.input]
            //   });
            //   const filesHash = __md5.encrypt(params.input.join(','));
            //   stacks[params.input] = {
            //     tsconfigJson,
            //     tsconfigPath: `${tmpDir}/ts/tsconfig.${settings.id}.input.${filesHash}.json`
            //   };
            // } else if (params.stacks !== undefined) {
            //   emit('log', {
            //     value: `<yellow>Stack(s)</yellow> to compile: <magenta>${params.stacks.join(
            //       '</magenta>, <magenta>'
            //     )}</magenta>`
            //   });
            //   params.stacks.forEach(async (stack) => {
            //     if (params.tsconfig.stacks[stack] === undefined) {
            //       return reject(`You try to compile the stack "<yellow>${stack}</yellow>" but it is not defined in your "<cyan>ts.config.js</cyan>" file. Here's the available stacks:
            //   - ${Object.keys(params.tsconfig.stacks).join('\n- ')}`);
            //     }
            //     // generate the final config
            //     const tsconfigJson = __deepMerge(
            //       params.tsconfig,
            //       params.tsconfig.stacks[stack],
            //       {
            //         files: [
            //           ...filesToCompile,
            //           ...(tsconfig.stacks[stack].include || []),
            //           ...(tsconfig.stacks[stack].files || [])
            //         ]
            //       }
            //     );
            //     stacks[stack] = {
            //       tsconfigJson,
            //       tsconfigPath: `${tmpDir}/ts/tsconfig.${settings.id}.stack.${stack}.json`
            //     };
            //   });
            // } else if (params.project !== undefined) {
            //   emit('log', {
            //     value: `<yellow>Project(s)</yellow> to compile:\n- <magenta>${params.stacks.join(
            //       '</magenta>\n- <magenta>'
            //     )}</magenta>`
            //   });
            //   // loop on each configs to generate the final ones
            //   params.project.forEach(async (configFile) => {
            //     // read the file
            //     const configJson = configFile.readSync();
            //     // extend using the passed "settings"
            //     const finalConfigJson = __deepMerge(
            //       params.tsconfig,
            //       configJson,
            //       settings
            //     );
            //     if (!finalConfigJson.compilerOptions)
            //       finalConfigJson.compilerOptions = {};
            //     finalConfigJson.compilerOptions.noEmit = true;
            //     finalConfigJson.files = [
            //       ...filesToCompile,
            //       ...(finalConfigJson.include || []),
            //       ...(finalConfigJson.files || [])
            //     ];
            //     stacks[configFile.path] = {
            //       tsconfigJson: finalConfigJson,
            //       tsconfigPath: `${tmpDir}/ts/tsconfig.${__md5.encrypt(
            //         configFile.path
            //       )}.json`
            //     };
            //   });
            // } else {
            //   emit('log', {
            //     value: `Compiling default project: <cyan>${__packageRoot()}/tsconfig.json</cyan>`
            //   });
            //   // try to load the default file at the project root
            //   const tsconfigPath = `${__packageRoot()}/tsconfig.${
            //     settings.id
            //   }.json`;
            //   if (__fs.existsSync(tsconfigPath) === true) {
            //     const tsconfigJson = require(tsconfigPath);
            //     stacks['tsconfig.json'] = {
            //       tsconfigJson,
            //       tsconfigPath
            //     };
            //   }
            // }
            if (Object.keys(stacks).length === 0) {
                return reject([
                    `Sorry but their's nothing to compile.`,
                    `In order to specify files/folders to compile, you have these choices:`,
                    `1. Specify some "stacks" to compile in your "<yellow>.sugar/ts.config.js</yellow>" file and launch the compilation using the "<cyan>-s {stack}</cyan>" argument.`,
                    `2. Specify a "<yellow>project</yellow>" tsconfig.json path using the standard "<cyan>-p|--project</cyan>" argument.`,
                    `3. Create a "<yellow>tsconfig.json</yellow>" file at your project root which is "<cyan>${packageRoot_1.default()}</cyan>".`
                ].join('\n'));
            }
            // generated files
            const generatedFiles = [];
            // loop on each "stacks" to compile
            let stacksStates = {};
            for (let i = 0; i < Object.keys(stacks).length; i++) {
                const stack = Object.keys(stacks)[i];
                const stackObj = stacks[stack];
                delete stackObj.tsconfigJson.extends;
                delete stackObj.tsconfigJson.stacks;
                stacksStates[stack] = {
                    ready: false
                };
                if (!stackObj.tsconfigJson.files ||
                    !stackObj.tsconfigJson.files.length) {
                    return reject(`Sorry but you have to specify some files to compile using either the "<yellow>input</yellow>" argument, by specifying the "<yellow>stack</yellow>" argument either by specifying the "<yellow>include</yellow>" property in your "<cyan>ts.config.js</cyan>" or in your "<cyan>tsconfig.json</cyan>" default file...`);
                }
                // generate temp files pathes
                const tmpConfigFile = new SFile_1.default(stackObj.tsconfigPath, {
                    checkExistence: false
                });
                // process the include pathes to make them absolute
                if (stackObj.tsconfigJson.files) {
                    let filesPaths = [];
                    stackObj.tsconfigJson.files.forEach((path) => {
                        if (path_1.default.isAbsolute(path)) {
                            if (is_glob_1.default(path)) {
                                filesPaths = [...filesPaths, ...glob_1.default.sync(path)];
                                return;
                            }
                            if (!fs_1.default.existsSync(path)) {
                                filesPaths.push(`${packageRoot_1.default()}${path}`);
                                return;
                            }
                        }
                        if (is_glob_1.default(path)) {
                            filesPaths = [
                                ...filesPaths,
                                ...glob_1.default
                                    .sync(path, {
                                    cwd: packageRoot_1.default()
                                })
                                    .map((p) => {
                                    return `${packageRoot_1.default()}/${p}`;
                                })
                            ];
                            return;
                        }
                        filesPaths.push(path_1.default.resolve(packageRoot_1.default(), path));
                    });
                    stackObj.tsconfigJson.files = filesPaths;
                }
                // write the temp config file
                tmpConfigFile.writeSync(JSON.stringify(stackObj.tsconfigJson, null, 4));
                // duration stacks
                const durationStack = {};
                // clean params
                delete params.stacks;
                // specify the config file to use
                params.project = stackObj.tsconfigPath;
                if (params.transpileOnly === undefined ||
                    params.transpileOnly === false) {
                    emit('log', {
                        value: `<magenta>[${stack}]</magenta> Starting a full <yellow>tsc</yellow> process`
                    });
                    // instanciate a new process
                    const def = STsCompileInterface_1.default.definition;
                    Object.keys(def).forEach((prop) => {
                        if (TscInterface_1.default.definition[prop] === undefined)
                            delete def[prop];
                    });
                    const pro = new SCliProcess_1.default('tsc [arguments]', {
                        definition: def,
                        metas: false,
                        stdio: false
                    });
                    pipe(pro);
                    yield pro.run(params);
                }
                else if (params.transpileOnly === true) {
                    emit('log', {
                        value: `<magenta>[${stack}]</magenta> Transpile only mode <green>enabled</green>`
                    });
                    for (let i = 0; i < stackObj.tsconfigJson.files.length; i++) {
                        const filePath = stackObj.tsconfigJson.files[i];
                        // transpiling the file
                        yield transpileAndSave_1.default(filePath, stackObj.tsconfigJson.compilerOptions);
                    }
                }
                for (let j = 0; j < stackObj.tsconfigJson.files.length; j++) {
                    const path = stackObj.tsconfigJson.files[j];
                    stackObj.tsconfigJson.files.forEach((filePath) => {
                        generatedFiles.push(new SFile_1.default(filePath.replace(/\.ts$/, '.js')));
                    });
                }
            }
            // resolve with the compilation result
            resolve({
                files: generatedFiles,
                startTime: startTime,
                endTime: Date.now(),
                duration: Date.now() - startTime
            });
        }), {
            id: this._settings.id
        });
    }
    /**
     * @name        isStack
     * @type        Function
     *
     * Check if the passed string is the name of a defined stack or not
     *
     * @param     {String}      stack       The stack to check
     * @return    {Boolean}                 true if is a defined stack, false if not
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isStack(stack, tsconfig = {}) {
        // console.log(stack, tsconfig);
        if (!tsconfig.stacks)
            return false;
        return tsconfig.stacks[stack] !== undefined;
    }
}
exports.default = STsCompiler;
STsCompiler.interfaces = {
    this: STsCompileInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbm9kZS90eXBlc2NyaXB0L2NvbXBpbGUvX193aXBfXy9TVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxnRUFBMEM7QUFDMUMsZ0RBQTBCO0FBRzFCLHVFQUFpRDtBQUNqRCxzRUFBZ0Q7QUFHaEQseUVBQW1EO0FBR25ELDRDQUFzQjtBQUd0QixnREFBMEI7QUFHMUIsc0RBQStCO0FBRS9CLDBGQUFvRTtBQUNwRSwwRUFBb0Q7QUFFcEQsbUVBQTZDO0FBRTdDLHlFQUFtRDtBQUNuRCw0RUFBc0Q7QUFDdEQsMkRBQXFDO0FBQ3JDLDZEQUF1QztBQUN2Qyw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0gsTUFBcUIsV0FBWSxTQUFRLG1CQUFXO0lBS2xEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUFDLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMzQixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWpELE9BQU8sSUFBSSxrQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFN0IsbUJBQW1CO1lBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksZ0JBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO2dC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