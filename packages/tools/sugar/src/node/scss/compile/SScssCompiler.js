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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const glob_1 = __importDefault(require("glob"));
const is_glob_1 = __importDefault(require("is-glob"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const SScssFile_1 = __importDefault(require("../SScssFile"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./interface/SScssCompilerParamsInterface"));
class SScssCompiler extends SCompiler_1.default {
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
    constructor(initialParams, settings) {
        super(initialParams, deepMerge_1.default({
            scssCompiler: {}
        }, settings || {}));
        // prod
        if (this.scssCompilerSettings.prod) {
            this.scssCompilerSettings.cache = false;
            this.scssCompilerSettings.style = 'compressed';
            this.scssCompilerSettings.minify = true;
            this.scssCompilerSettings.stripComments = true;
        }
    }
    /**
     * @name          scssCompilerSettings
     * @type          ISScssCompilerSettings
     * @get
     *
     * Access the scss compiler settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get scssCompilerSettings() {
        return this._settings.scssCompiler;
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
    _compile(params, settings = {}) {
        return new SPromise_1.default(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.scssCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            const resultsObj = {};
            let filesPaths = [];
            // make input absolute
            input = absolute_1.default(input);
            // process inputs
            input.forEach((inputStr) => {
                if (is_glob_1.default(inputStr)) {
                    filesPaths = [...filesPaths, ...glob_1.default.sync(inputStr)];
                }
                else {
                    filesPaths.push(inputStr);
                }
            });
            const startTime = Date.now();
            for (let i = 0; i < filesPaths.length; i++) {
                let filePath = filesPaths[i];
                let file = new SScssFile_1.default(filePath, {
                    scssFile: {
                        compile: settings
                    }
                });
                pipe(file);
                const resPromise = file.compile(params, Object.assign({}, settings));
                const res = yield resPromise;
                resultsObj[file.path] = res;
            }
            // resolve with the compilation result
            if (!params.watch) {
                resolve({
                    files: resultsObj,
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
            else {
                emit('files', {
                    files: resultsObj,
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
        }));
    }
}
SScssCompiler.interfaces = {
    params: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    }
};
exports.default = SScssCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTY3NzQ29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFPQSx1RUFBaUQ7QUFDakQsc0VBQWdEO0FBU2hELGdEQUEwQjtBQUUxQixzREFBK0I7QUFFL0IseUVBQW1EO0FBQ25ELG1FQUE2QztBQUU3Qyw2REFBdUM7QUFFdkMsNEdBQXNGO0FBeUZ0RixNQUFNLGFBQWMsU0FBUSxtQkFBVztJQXNCckM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFvQztRQUVwQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUUsRUFBRTtTQUNqQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYsT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN4QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztZQUMvQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN4QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNoRDtJQUNILENBQUM7SUE3Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxvQkFBb0I7UUFDdEIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLFlBQVksQ0FBQztJQUM1QyxDQUFDO0lBbUNEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUNOLE1BQTRCLEVBQzVCLFdBQTJDLEVBQUU7UUFFN0MsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFD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