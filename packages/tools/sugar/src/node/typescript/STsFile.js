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
const SFile_1 = __importDefault(require("../fs/SFile"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const typescript_1 = __importDefault(require("typescript"));
const eslint_1 = require("eslint");
const STsFileInterface_1 = __importDefault(require("./interface/STsFileInterface"));
const STsCompilerParamsInterface_1 = __importDefault(require("./compile/interface/STsCompilerParamsInterface"));
// @ts-ignore
class STsFile extends SFile_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(path, settings = {}) {
        super(path, deepMerge_1.default({
            id: filename_1.default(path),
            tsFile: {}
        }, settings));
        /**
         * @name              compile
         * @type              Function
         *
         * Simply compile the file using the settings that you can pass as argument
         *
         * @param         {ISTsFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isCompiling = false;
        this._currentCompilationParams = {};
    }
    /**
     * @name      tsFileSettings
     * @type      ISTsFileSettings
     * @get
     *
     * Access the tsFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get tsFileSettings() {
        return this._settings.tsFile;
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.tsFileSettings.compile, settings);
        this._currentCompilationParams = Object.assign({}, params);
        params = this.applyInterface('compilerParams', params);
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipe, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            emit('notification', {
                title: `${this.id} compilation started`
            });
            emit('log', {
                clear: true,
                type: 'time'
            });
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            let compilerOptions = params.compilerOptions;
            if (params.target)
                compilerOptions = this.getCompilerOptionsForTarget(params.target);
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            let toCompile = this.content;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> File "<cyan>${this.relPath}</cyan>"`
                });
                // linting ts
                const eslint = new eslint_1.ESLint(Object.assign(Object.assign({}, sugar_1.default('eslint')), { fix: true, ignore: false }));
                const lintResult = yield eslint.lintFiles([this.path]);
                if (lintResult &&
                    lintResult[0].messages &&
                    lintResult[0].messages.length) {
                    const formatter = yield eslint.loadFormatter('codeframe');
                    const resultText = formatter.format(lintResult);
                    emit('notification', {
                        type: 'error',
                        title: `STsFile compilation error`,
                        message: this.relPath
                    });
                    return reject(resultText);
                }
                // render typescript
                const result = typescript_1.default.transpileModule(this.content, {
                    compilerOptions
                });
                if (!result.outputText) {
                    return reject(`Something has gone wronge during the "<yellow>${this.relPath}</yellow>" typescript file compilation...`);
                }
                // check if need to save
                if (params.save) {
                    // build the save path
                    let savePath;
                    if (params.outputDir === undefined) {
                        savePath = this.path.replace(/\.ts$/, '.js');
                    }
                    else {
                        savePath = path_1.default.resolve(params.outputDir, this.path
                            .replace(`${params.rootDir}/`, '')
                            .replace(/\.ts$/, '.js'));
                    }
                    emit('log', {
                        type: 'file',
                        file: this.toObject(),
                        to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                        action: 'save'
                    });
                    this.writeSync(result.outputText, {
                        path: savePath
                    });
                    // if (params.map) {
                    //   this.writeSync(result.js.map.toString(), {
                    //     path: savePath.replace(/\.js$/, '.js.map')
                    //   });
                    //   emit('log', {
                    //     type: 'file',
                    //     action: 'saved',
                    //     to: savePath
                    //       .replace(/\.js$/, '.js.map')
                    //       .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                    //     file: this.toObject()
                    //   });
                    // }
                    // notify end
                    const time = duration.end();
                    emit('log', {
                        type: 'file',
                        action: 'saved',
                        to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                        file: this.toObject()
                    });
                }
                emit('log', {
                    type: 'separator'
                });
                emit('notification', {
                    type: 'success',
                    title: `${this.id} compilation success`
                });
                // resolve only if not watching
                return resolve(Object.assign({ js: result.outputText }, duration.end()));
            }
            catch (e) {
                return reject(e);
            }
        }));
    }
    /**
     * @name        getCompilerOptionsForTarget
     * @type        Function
     *
     * Get back some compilerOptions specified to a certain target defined in the ts.config.ts file
     *
     * @param     {String}      target       The target to get
     * @return    {Object}                 The target compilerOptions object
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    getCompilerOptionsForTarget(target) {
        const compilerOptions = sugar_1.default('ts.compile.compilerOptions');
        const definedTargets = sugar_1.default('ts.targets');
        if (!definedTargets)
            return compilerOptions;
        if (!definedTargets[target])
            return compilerOptions;
        return deepMerge_1.default(compilerOptions, definedTargets[target]);
    }
}
STsFile.interfaces = {
    compilerParams: {
        apply: false,
        class: STsCompilerParamsInterface_1.default
    },
    this: {
        apply: true,
        class: STsFileInterface_1.default
    }
};
exports.default = STsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUc1Qyx3REFBa0M7QUFDbEMsOERBQTJDO0FBQzNDLDREQUE4QjtBQUM5QixtQ0FBZ0M7QUFHaEMsb0ZBQThEO0FBRzlELGdIQUEwRjtBQXFDMUYsYUFBYTtBQUNiLE1BQU0sT0FBUSxTQUFRLGVBQU87SUEwQjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQWlDLEVBQUU7UUFDM0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxFQUFFO1NBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBR0o7Ozs7Ozs7Ozs7V0FVRztRQUNILGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLDhCQUF5QixHQUFnQyxFQUFFLENBQUM7SUFkNUQsQ0FBQztJQW5DRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGNBQWM7UUFDaEIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBc0NELE9BQU8sQ0FDTCxNQUFtQyxFQUNuQyxRQUFvQztRQUVwQyxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFM0QsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdkQsbUJB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