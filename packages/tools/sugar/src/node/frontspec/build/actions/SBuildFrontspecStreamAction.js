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
const SActionsStreamAction_1 = __importDefault(require("../../../stream/SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SBuildFrontspecInterface_1 = __importDefault(require("../interface/SBuildFrontspecInterface"));
const SFrontspec_1 = __importDefault(require("../../SFrontspec"));
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
module.exports = (_a = class SBuildFrontspecStreamAction extends SActionsStreamAction_1.default {
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
                name: 'Build Frontspec',
                id: 'SBuildFrontspecStreamAction'
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
            return super.run(streamObj, (resolve, reject, trigger) => __awaiter(this, void 0, void 0, function* () {
                // compile using the SScssCompiler class
                if (!streamObj.outputStack)
                    streamObj.outputStack = {};
                const frontspec = new SFrontspec_1.default({
                    filename: streamObj.filename,
                    outputDir: streamObj.outputDir,
                    dirDepth: streamObj.dirDepth,
                    cache: streamObj.cache
                });
                const promise = frontspec.json();
                promise.catch((e) => {
                    reject(e);
                });
                const json = yield promise;
                // set in the package.json the "frontspec" property
                const packageJsonPath = `${packageRoot_1.default()}/package.json`;
                if (fs_1.default.existsSync(packageJsonPath)) {
                    const json = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
                    json.frontspec = path_1.default.relative(packageRoot_1.default(), `${streamObj.outputDir}/${streamObj.filename}`);
                    fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(json, null, 4));
                }
                // set in output stack
                streamObj.data = json;
                streamObj.outputStack.data = `${streamObj.outputDir}/${streamObj.filename}`;
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
    _a.interface = SBuildFrontspecInterface_1.default,
    _a);
//# sourceMappingURL=SBuildFrontspecStreamAction.js.map