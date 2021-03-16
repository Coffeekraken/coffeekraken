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
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZVRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvdHlwZXNjcmlwdC9jb21waWxlL19fd2lwX18vY29tcGlsZVRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMkRBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFDdEIsNkRBQXVDO0FBQ3ZDLDBEQUFvQztBQUNwQyx5RUFBbUQ7QUFDbkQsNEVBQXNEO0FBQ3RELHVFQUFpRDtBQUNqRCwrREFBK0M7QUFFL0MsMkRBQXFDO0FBS3JDLGdEQUEwQjtBQUMxQix3RkFBa0U7QUFDbEUsc0VBQWdEO0FBR2hELDJEQUFxQztBQUNyQyxpRUFBMkM7QUFDM0MsMEVBQW9EO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxFQUFFLEdBQWUsU0FBUyxTQUFTLENBQ3ZDLE1BQXdCLEVBQ3hCLFFBQTRCO0lBRTVCLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO0lBRWpDLENBQUMsR0FBUyxFQUFFO1FBQ1YsTUFBTSxNQUFNLEdBQVcsZ0JBQVEsRUFBRSxDQUFDO1FBRWxDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVsQiw2QkFBNkI7UUFDN0IsTUFBTSxRQUFRLEdBQUcsZUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDL0QsTUFBTSw4SEFBOEgsQ0FBQztTQUN0STtRQUVELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsRUFBRTtv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