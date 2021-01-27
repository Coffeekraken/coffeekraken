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
exports.STsFileCtorSettingsInterface = exports.STsFileSettingsInterface = void 0;
const SFile_1 = __importDefault(require("../fs/SFile"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const STsCompilerParamsInterface_1 = __importDefault(require("./compile/interface/STsCompilerParamsInterface"));
/**
 * @name          STsFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the tsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsFileSettingsInterface extends SInterface_1.default {
}
exports.STsFileSettingsInterface = STsFileSettingsInterface;
/**
 * @name          STsFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the tsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsFileCtorSettingsInterface extends SInterface_1.default {
}
exports.STsFileCtorSettingsInterface = STsFileCtorSettingsInterface;
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
         * @name        _watch
         * @type        Function
         * @private
         *
         * Start to watch the file. Does this only once
         * to avoid multiple compilation and logs
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._alreadyWatch = false;
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
        this._currentCompilationSettings = {};
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
    _watch() {
        if (this._alreadyWatch)
            return;
        this._alreadyWatch = true;
        if (!this._currentCompilationParams)
            return;
        // start watching the file if needed
        if (this._currentCompilationParams.watch) {
            this.startWatch();
        }
        // listen for change event
        this.on('update', (file, metas) => {
            if (this._currentCompilationParams.watch) {
                const promise = this.compile(this._currentCompilationParams);
                this.emit('log', {
                    type: 'file',
                    action: 'update',
                    file
                });
            }
        });
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.tsFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
        params = this.applyInterface('compilerParams', params);
        if (params.watch) {
            this._watch();
        }
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            emit('log', {
                type: 'separator'
            });
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            let toCompile = this.content;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
                });
                const result = true;
                // RENDERING HERE
                // const result = __svelte.compile(toCompile, {
                //   filename: this.name,
                //   dev: !params.prod,
                //   preserveComments: !params.stripComments,
                //   preserveWhitespace: !params.prod,
                //   outputFilename: this.name,
                //   cssOutputFilename: this.name,
                //   ...(params.tsconfig || {})
                // });
                // result.warnings.forEach((warning) => {
                //   emit('warn', {
                //     value: warning.toString()
                //   });
                // });
                // nativeConsole.log(result.js.map.toString());
                // check if need to save
                // if (params.save) {
                //   // build the save path
                //   let savePath;
                //   if (params.outputDir === undefined) {
                //     savePath = this.path.replace(/\.svelte$/, '.js');
                //   } else {
                //     savePath = __path.resolve(
                //       params.outputDir,
                //       this.path
                //         .replace(`${params.rootDir}/`, '')
                //         .replace(/\.svelte$/, '.js')
                //     );
                //   }
                //   emit('log', {
                //     type: 'file',
                //     file: this,
                //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                //     action: 'save'
                //   });
                //   this.writeSync(result.js.code, {
                //     path: savePath
                //   });
                //   if (params.map) {
                //     this.writeSync(result.js.map.toString(), {
                //       path: savePath.replace(/\.js$/, '.js.map')
                //     });
                //     emit('log', {
                //       type: 'file',
                //       action: 'saved',
                //       to: savePath
                //         .replace(/\.js$/, '.js.map')
                //         .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                //       file: this
                //     });
                //   }
                //   // notify end
                //   const time = duration.end();
                //   emit('log', {
                //     type: 'file',
                //     action: 'saved',
                //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                //     file: this
                //   });
                // }
                // if (params.watch) {
                //   emit('log', {
                //     value: `<blue>[watch] </blue>Watching for changes...`
                //   });
                // }
                return resolve(result);
            }
            catch (e) {
                return reject(e.toString());
            }
            return true;
        }));
    }
}
STsFile.interfaces = {
    compilerParams: {
        apply: false,
        class: STsCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: STsFileCtorSettingsInterface
    }
};
exports.default = STsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQWtDO0FBRWxDLGtFQUE0QztBQUU1QyxtRUFBNkM7QUFDN0Msb0VBQThDO0FBSTlDLHdEQUFrQztBQUNsQyw4REFBMkM7QUFFM0MseUVBQW1EO0FBS25ELGdIQUEwRjtBQUUxRjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSx3QkFBeUIsU0FBUSxvQkFBWTtDQUV6RDtBQUZELDREQUVDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsNEJBQTZCLFNBQVEsb0JBQVk7Q0FRN0Q7QUFSRCxvRUFRQztBQXVDRCxhQUFhO0FBQ2IsTUFBTSxPQUFRLFNBQVEsZUFBTztJQTJCM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBaUMsRUFBRTtRQUMzRCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUEyQnRCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixnQ0FBMkIsR0FBNkIsRUFBRSxDQUFDO1FBQzNELDhCQUF5QixHQUErQixFQUFFLENBQUM7SUFyRDNELENBQUM7SUFuQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxjQUFjO1FBQ2hCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQXFDTyxNQUFNO1FBQ1osSUFBSSxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU87UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFMUIsSUFBSSxDQUFD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