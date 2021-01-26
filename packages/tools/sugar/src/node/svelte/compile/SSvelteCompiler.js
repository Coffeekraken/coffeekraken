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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const SSvelteFile_1 = __importDefault(require("../SSvelteFile"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const glob_1 = __importDefault(require("../../is/glob"));
const SSvelteCompilerParamsInterface_1 = __importDefault(require("./interface/SSvelteCompilerParamsInterface"));
class SSvelteCompiler extends SCompiler_1.default {
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
        super(initialParams, deepMerge_1.default({
            svelteCompiler: {}
        }, settings || {}));
        // prod
        if (this.svelteCompilerSettings.prod) {
            this.svelteCompilerSettings.style = 'compressed';
            this.svelteCompilerSettings.minify = true;
            this.svelteCompilerSettings.stripComments = true;
        }
    }
    /**
     * @name      svelteCompilerSettings
     * @type      ISSvelteCompilerSettings
     * @get
     *
     * Access to the svelte compiler settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get svelteCompilerSettings() {
        return this._settings.svelteCompiler;
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
            settings = deepMerge_1.default(this.svelteCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            const resultsObj = {};
            let filesPaths = [];
            // make input absolute
            input = absolute_1.default(input);
            // process inputs
            input.forEach((inputStr) => {
                if (glob_1.default(inputStr)) {
                    filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
                }
                else {
                    filesPaths.push(inputStr);
                }
            });
            const startTime = Date.now();
            for (let i = 0; i < filesPaths.length; i++) {
                let filePath = filesPaths[i];
                let file = new SSvelteFile_1.default(filePath, {
                    svelteFile: {
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
SSvelteCompiler.interfaces = {
    params: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
    }
};
exports.default = SSvelteCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHVFQUFpRDtBQUdqRCx5RUFBbUU7QUFDbkUsaUVBQTJDO0FBQzNDLHNFQUFnRDtBQUNoRCxtRUFBNkM7QUFDN0MseURBQXFDO0FBRXJDLGdIQUEwRjtBQW1DMUYsTUFBTSxlQUFnQixTQUFRLG1CQUFXO0lBc0J2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTZDLEVBQzdDLFFBQXNDO1FBRXRDLEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLGNBQWMsRUFBRSxFQUFFO1NBQ25CLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFFRixPQUFPO1FBQ1AsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1lBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQTVDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHNCQUFzQjtRQUN4QixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFrQ0Q7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsV0FBMkMsRUFBRTtRQUU3QyxPQUFPLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM5RCxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUs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