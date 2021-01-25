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
var _a;
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
module.exports = (_a = class STsCompiler extends SCompiler_1.default {
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
            console.log(stack, tsconfig);
            if (!tsconfig.stacks)
                return false;
            return tsconfig.stacks[stack] !== undefined;
        }
    },
    _a.interfaces = {
        this: STsCompileInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxnRUFBMEM7QUFDMUMsZ0RBQTBCO0FBRzFCLHVFQUFpRDtBQUNqRCxzRUFBZ0Q7QUFHaEQseUVBQW1EO0FBR25ELDRDQUFzQjtBQUd0QixnREFBMEI7QUFHMUIsc0RBQStCO0FBRS9CLDBGQUFvRTtBQUNwRSwwRUFBb0Q7QUFFcEQsbUVBQTZDO0FBRTdDLHlFQUFtRDtBQUNuRCw0RUFBc0Q7QUFDdEQsMkRBQXFDO0FBQ3JDLDZEQUF1QztBQUN2Qyw0RUFBc0Q7QUFtQ3RELHVCQUFTLE1BQU0sV0FBWSxTQUFRLG1CQUFXO1FBSzVDOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUFDLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUMzQixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWpELE9BQU8sSUFBSSxrQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUU3QixtQkFBbUI7Z0JBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksZ0JBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO29CQUN0QyxHQUFHLEVBQUUsS0FBSztpQkFDWCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO29CQUN2QixNQUFNLEtBQUss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