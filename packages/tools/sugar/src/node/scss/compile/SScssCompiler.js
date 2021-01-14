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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const glob_1 = __importDefault(require("glob"));
const is_glob_1 = __importDefault(require("is-glob"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const SScssFile_1 = __importDefault(require("../SScssFile"));
const SScssCompileParamsInterface_1 = __importDefault(require("./interface/SScssCompileParamsInterface"));
module.exports = (_a = class SScssCompiler extends SCompiler_1.default {
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
            this._includePaths = [];
            // prod
            if (this._settings.prod) {
                this._settings.cache = false;
                this._settings.style = 'compressed';
                this._settings.minify = true;
                this._settings.stripComments = true;
            }
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
            const promise = new SPromise_1.default({
                id: 'COMPILER'
            });
            settings = deepMerge_1.default(this._settings, {}, settings);
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
            (() => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < filesPaths.length; i++) {
                    let filePath = filesPaths[i];
                    let file = new SScssFile_1.default(filePath, {
                        compile: settings
                    });
                    promise.pipe(file);
                    const resPromise = file.compile(Object.assign({}, settings));
                    const res = yield resPromise;
                    resultsObj[file.path] = res;
                }
                // resolve with the compilation result
                if (!settings.watch) {
                    promise.resolve({
                        files: resultsObj,
                        startTime: startTime,
                        endTime: Date.now(),
                        duration: Date.now() - startTime
                    });
                }
                else {
                    promise.trigger('files', {
                        files: resultsObj,
                        startTime: startTime,
                        endTime: Date.now(),
                        duration: Date.now() - startTime
                    });
                }
            }))();
            return promise;
        }
    },
    _a.interface = SScssCompileParamsInterface_1.default,
    _a);
//# sourceMappingURL=SScssCompiler.js.map