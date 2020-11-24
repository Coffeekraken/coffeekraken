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
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SActionsStreamAction_1 = __importDefault(require("../../../stream/SActionsStreamAction"));
const SBuildJsInterface_1 = __importDefault(require("../interface/SBuildJsInterface"));
const SJsCompiler_1 = __importDefault(require("../../SJsCompiler"));
module.exports = (_a = class SCompileJsStreamAction extends SActionsStreamAction_1.default {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(deepMerge_1.default({
                id: 'SCompileJsStreamAction'
            }, settings));
        }
        /**
         * @name          run
         * @type          Function
         * @async
         *
         * Override the base class run method
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        run(streamObj, settings) {
            return super.run(streamObj, (resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const compiler = new SJsCompiler_1.default(streamObj);
                const compileRes = yield compiler.compile(streamObj.input);
                // otherwise, save the new data in the streamObj
                streamObj.data = compileRes.js;
                // set the map if has been generated
                if (compileRes.map)
                    streamObj.sourcemapData = compileRes.map;
                // resolve the new streamObj
                resolve(streamObj);
            }));
        }
    },
    /**
     * @name            interface
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interface = SBuildJsInterface_1.default.extends({
        definitionObj: {}
    }),
    _a);
