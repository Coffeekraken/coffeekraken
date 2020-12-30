"use strict";
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
const SFile_1 = __importDefault(require("../../fs/SFile"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const tmpDir_1 = __importDefault(require("../../fs/tmpDir"));
const md5_1 = __importDefault(require("../../crypt/md5"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const SCliProcess_1 = __importDefault(require("../../process/SCliProcess"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const wait_1 = __importDefault(require("../../time/wait"));
const glob_1 = __importDefault(require("glob"));
const compileTsInterface_1 = __importDefault(require("./interface/compileTsInterface"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const watch_1 = __importDefault(require("../../fs/watch"));
const convert_1 = __importDefault(require("../../time/convert"));
const transpileAndSave_1 = __importDefault(require("./transpileAndSave"));
/**
 * @name                compileTs
 * @namespace           sugar.node.typescript.compile
 * @type                Function
 * @async
 *
 * This function allows you to compile some typescript using the native tsc compiler
 *
 * @param       {ICompileTsParams}          params          A parameters object to configure your compilation
 * @return      {SPromise}                                  A promise that will be resolved once the compilation is finished
 *
 * @example             js
 * import compileTs from '@coffeekraken/sugar/node/typescript/compile/compileTs';
 * await compileTs({
 *
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function compileTs(params, settings) {
    const promise = new SPromise_1.default();
    (() => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmpDir_1.default();
        const stacks = {};
        // load the typescript config
        const tsConfig = sugar_1.default('ts');
        if (params.stacks !== undefined && params.project !== undefined) {
            throw `Sorry but you cannot specify the "<yellow>project</yellow>" and the "<yellow>stacks</yellow>" parameters at the same time...`;
        }
        if (params.stacks !== undefined) {
            params.stacks.forEach((stack) => __awaiter(this, void 0, void 0, function* () {
                if (tsConfig.stacks[stack] === undefined) {
                    throw `You try to compile the stack "<yellow>${stack}</yellow>" but it is not defined in your "<cyan>ts.config.js</cyan>" file. Here's the available stacks:
          - ${Object.keys(tsConfig.stacks).join('\n- ')}`;
                }
                // generate the final config
                const tsconfigJson = deepMerge_1.default(tsConfig, tsConfig.stacks[stack]);
                delete tsconfigJson.stacks;
                stacks[stack] = {
                    tsconfigJson,
                    tsconfigPath: `${tmpDir}/ts/tsconfig.${stack}.json`,
                    include: params.input !== undefined ? [params.input] : tsconfigJson.include
                };
            }));
        }
        else if (params.project !== undefined) {
            // loop on each configs to generate the final ones
            params.project.forEach((configFile) => __awaiter(this, void 0, void 0, function* () {
                // read the file
                const configJson = configFile.readSync();
                // extend using the passed "settings"
                const finalConfigJson = deepMerge_1.default(tsConfig, configJson, settings);
                if (!finalConfigJson.compilerOptions)
                    finalConfigJson.compilerOptions = {};
                finalConfigJson.compilerOptions.noEmit = true;
                stacks[configFile.path] = {
                    tsconfigJson: finalConfigJson,
                    tsconfigPath: `${tmpDir}/ts/tsconfig.${md5_1.default.encrypt(configFile.path)}.json`,
                    include: params.input !== undefined ? [params.input] : configJson.include
                };
            }));
        }
        else {
            // try to load the default file at the project root
            const tsconfigPath = `${packageRoot_1.default()}/tsconfig.json`;
            if (fs_1.default.existsSync(tsconfigPath) === true) {
                const tsconfigJson = require(tsconfigPath);
                stacks['tsconfig.json'] = {
                    tsconfigJson,
                    tsconfigPath,
                    include: params.input !== undefined ? [params.input] : tsconfigJson.include
                };
            }
        }
        if (Object.keys(stacks).length === 0) {
            promise.trigger('error', [
                `Sorry but their's nothing to compile.`,
                `In order to specify files/folders to compile, you have these choices:`,
                `1. Specify some "stacks" to compile in your "<yellow>.sugar/ts.config.js</yellow>" file and launch the compilation using the "<cyan>-s {stack}</cyan>" argument.`,
                `2. Specify a "<yellow>project</yellow>" tsconfig.json path using the standard "<cyan>-p|--project</cyan>" argument.`,
                `3. Create a "<yellow>tsconfig.json</yellow>" file at your project root which is "<cyan>${packageRoot_1.default()}</cyan>".`
            ].join('\n'));
        }
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
            if (!Array.isArray(stackObj.include)) {
                throw `Sorry but you have to specify some files to compile using either the "<yellow>input</yellow>" argument, either by specifying the "<yellow>include</yellow>" property in your "<cyan>ts.config.js</cyan>" or in your "<cyan>tsconfig.json</cyan>" default file...`;
            }
            // generate temp files pathes
            const tmpConfigFile = new SFile_1.default(stackObj.tsconfigPath, {
                checkExistence: false
            });
            // process the include pathes to make them absolute
            stackObj.include = stackObj.include.map((path) => {
                if (path_1.default.isAbsolute(path))
                    return path;
                return path_1.default.resolve(packageRoot_1.default(), path);
            });
            stackObj.tsconfigJson.include = stackObj.include;
            // write the temp config file
            tmpConfigFile.writeSync(JSON.stringify(stackObj.tsconfigJson, null, 4));
            // duration stacks
            const durationStack = {};
            // check if watch or not
            if (params.watch === true) {
                promise.trigger('log', {
                    value: `<magenta>[${stack}]</magenta> Watch mode <green>enabled</green>`
                });
            }
            // init the stack to watch
            let toWatch = stackObj.include;
            toWatch = toWatch.map((t) => {
                return t.replace(/\.tsx?$/, '.{js,ts}');
            });
            yield new Promise((resolveWatch) => __awaiter(this, void 0, void 0, function* () {
                watch_1.default(toWatch, {
                // cwd: __folderPath(stackObj.tsconfigPath)
                })
                    .on('ready', () => {
                    if (stacksStates[stack].ready)
                        return;
                    stacksStates[stack].ready = true;
                    promise.trigger('log', {
                        value: `<magenta>[${stack}]</magenta> Watching files process <green>ready</green>`
                    });
                    resolveWatch();
                })
                    .on('change', (file) => __awaiter(this, void 0, void 0, function* () {
                    if (file.extension === 'ts' && params.watch) {
                        file.update();
                        durationStack[file.path] = Date.now();
                        setTimeout(() => {
                            delete durationStack[file.path];
                        }, 60000);
                        promise.trigger('notification', {
                            type: 'warn',
                            title: `${stack} | Updated`,
                            value: `${file.path.replace(`${packageRoot_1.default()}/`, '')}`
                        });
                        promise.trigger('log', {
                            value: `<magenta>[${stack}]</magenta> <yellow>updated</yellow> <green>${file.path.replace(`${packageRoot_1.default()}/`, '')}</green> <yellow>${file.sizeInKBytes}kb</yellow>`
                        });
                        if (params.transpileOnly === true) {
                            const typescriptResult = yield transpileAndSave_1.default(file.path, stackObj.tsconfigJson.compilerOptions);
                        }
                    }
                    if (file.extension === 'js') {
                        let duration = ' ';
                        if (durationStack[file.path.replace(/\.js$/, '.ts')] !== undefined) {
                            duration = ` in ${convert_1.default(Date.now() - durationStack[file.path.replace(/\.js$/, '.ts')], 's')}s`;
                        }
                        promise.trigger('notification', {
                            type: 'success',
                            title: `${stack} | Success`,
                            value: `${file.path.replace(`${packageRoot_1.default()}/`, '')}`
                        });
                        promise.trigger('log', {
                            value: `<magenta>[${stack}]</magenta> <cyan>compiled</cyan> <green>${file.path.replace(`${packageRoot_1.default()}/`, '')}</green> <yellow>${file.sizeInKBytes}kb</yellow>${duration}`
                        });
                    }
                }));
            }));
            // clean params
            delete params.stacks;
            // specify the config file to use
            params.project = stackObj.tsconfigPath;
            if (params.transpileOnly === undefined ||
                params.transpileOnly === false) {
                promise.trigger('log', {
                    value: `<magenta>[${stack}]</magenta> Starting a full <yellow>tsc</yellow> process`
                });
                // instanciate a new process
                const pro = new SCliProcess_1.default('tsc [arguments]', {
                    definition: compileTsInterface_1.default.definition,
                    metas: false,
                    stdio: false
                });
                SPromise_1.default.pipe(pro, promise);
                pro.run(params);
            }
            else if (params.transpileOnly === true) {
                promise.trigger('log', {
                    value: `<magenta>[${stack}]</magenta> Transpile only mode <green>enabled</green>`
                });
                if (params.watch === undefined || params.watch === false) {
                    promise.trigger('log', {
                        value: `<magenta>[${stack}]</magenta> Starting the compilation in <yellow>transpileOnly</yellow> mode`
                    });
                    promise.trigger('log', {
                        value: `<magenta>[${stack}]</magenta> Listing all the files to transpile depending on:\n- ${stackObj.include
                            .map((t) => `<green>${t.replace(`${packageRoot_1.default()}/`, '')}</green>`)
                            .join('\n- ')}`
                    });
                    let files = [];
                    for (let i = 0; i < stackObj.include.length; i++) {
                        const filesFounded = glob_1.default.sync(stackObj.include[i], {
                            absolute: true
                        });
                        files = [...files, ...filesFounded];
                    }
                    promise.trigger('log', {
                        value: `<magenta>[${stack}]</magenta> Found <yellow>${files.length}</yellow> file(s) to compile`
                    });
                    yield wait_1.default(10);
                    for (let i = 0; i < files.length; i++) {
                        const filePath = files[i];
                        // transpiling the file
                        yield transpileAndSave_1.default(filePath, stackObj.tsconfigJson.compilerOptions);
                    }
                }
            }
        }
    }))();
    return promise;
};
module.exports = fn;
//# sourceMappingURL=compileTs.js.map