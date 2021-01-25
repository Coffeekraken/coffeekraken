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
            promise.emit('error', [
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
                promise.emit('log', {
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
                    promise.emit('log', {
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
                        promise.emit('notification', {
                            type: 'warn',
                            title: `${stack} | Updated`,
                            value: `${file.path.replace(`${packageRoot_1.default()}/`, '')}`
                        });
                        promise.emit('log', {
                            value: `<magenta>[${stack}]</magenta> <yellow>updated</yellow> <green>${file.path.replace(`${packageRoot_1.default()}/`, '')}</green> <yellow>${file.stats.kbytes}kb</yellow>`
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
                        promise.emit('notification', {
                            type: 'success',
                            title: `${stack} | Success`,
                            value: `${file.path.replace(`${packageRoot_1.default()}/`, '')}`
                        });
                        promise.emit('log', {
                            value: `<magenta>[${stack}]</magenta> <cyan>compiled</cyan> <green>${file.path.replace(`${packageRoot_1.default()}/`, '')}</green> <yellow>${file.stats.kbytes}kb</yellow>${duration}`
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
                promise.emit('log', {
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
                promise.emit('log', {
                    value: `<magenta>[${stack}]</magenta> Transpile only mode <green>enabled</green>`
                });
                if (params.watch === undefined || params.watch === false) {
                    promise.emit('log', {
                        value: `<magenta>[${stack}]</magenta> Starting the compilation in <yellow>transpileOnly</yellow> mode`
                    });
                    promise.emit('log', {
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
                    promise.emit('log', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZVRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcGlsZVRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQSwyREFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUN0Qiw2REFBdUM7QUFDdkMsMERBQW9DO0FBQ3BDLHlFQUFtRDtBQUNuRCw0RUFBc0Q7QUFDdEQsdUVBQWlEO0FBQ2pELCtEQUErQztBQUUvQywyREFBcUM7QUFLckMsZ0RBQTBCO0FBQzFCLHdGQUFrRTtBQUNsRSxzRUFBZ0Q7QUFHaEQsMkRBQXFDO0FBQ3JDLGlFQUEyQztBQUMzQywwRUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLEVBQUUsR0FBZSxTQUFTLFNBQVMsQ0FDdkMsTUFBd0IsRUFDeEIsUUFBNEI7SUFFNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxFQUFFLENBQUM7SUFFakMsQ0FBQyxHQUFTLEVBQUU7UUFDVixNQUFNLE1BQU0sR0FBVyxnQkFBUSxFQUFFLENBQUM7UUFFbEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLDZCQUE2QjtRQUM3QixNQUFNLFFBQVEsR0FBRyxlQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMvRCxNQUFNLDhIQUE4SCxDQUFDO1NBQ3RJO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFPLEtBQUssRUFBRSxFQUFFO2dCQUNwQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUN4QyxNQUFNLHlDQUF5QyxLQUFLO2NBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFB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