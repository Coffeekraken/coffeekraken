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
            return new SPromise_1.default((resolve, reject, trigger, promise) => __awaiter(this, void 0, void 0, function* () {
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
                //   trigger('log', {
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
                //   trigger('log', {
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
                //   trigger('log', {
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
                //   trigger('log', {
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
                        trigger('log', {
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
                        promise.pipe(pro);
                        yield pro.run(params);
                    }
                    else if (params.transpileOnly === true) {
                        trigger('log', {
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
    _a.interface = STsCompileInterface_1.default,
    _a);
//# sourceMappingURL=STsCompiler.js.map