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
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const glob_1 = __importDefault(require("glob"));
const clone_1 = __importDefault(require("../../object/clone"));
const filename_1 = __importDefault(require("../../fs/filename"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SGlobResolverStreamActionInterface extends SInterface_1.default {
}
SGlobResolverStreamActionInterface.definition = {
    globProperty: {
        type: 'String',
        required: true
    }
};
module.exports = (_a = class SGlobResolverStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.globResolver'
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
        run(streamObj, settings = this._settings) {
            return super.run(streamObj, (resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // resolve glob pattern
                const rootDir = streamObj[streamObj.globProperty];
                const files = glob_1.default.sync(streamObj[streamObj.globProperty]);
                // build the streamObj stack
                const streamObjArray = [];
                // loop on each files founded
                files.forEach((filePath) => {
                    const newStreamObj = clone_1.default(streamObj);
                    newStreamObj[streamObj.globProperty] = filePath;
                    let cleanedRootDir = rootDir;
                    cleanedRootDir = cleanedRootDir.replace(filename_1.default(cleanedRootDir), '');
                    cleanedRootDir = cleanedRootDir
                        .replace(/\[.*\]/gm, '')
                        .replace(/\*{1,2}/gm, '')
                        .replace(/\(.*\)/gm, '')
                        .replace(/(\?|!|\+|@)/gm, '');
                    cleanedRootDir = cleanedRootDir.replace(/\/+$/, '');
                    let outputFilePath = filePath
                        .replace(cleanedRootDir, '')
                        .replace(filename_1.default(filePath), '');
                    if (outputFilePath.slice(0, 1) === '/')
                        outputFilePath = outputFilePath.slice(1);
                    newStreamObj.outputDir = newStreamObj.outputDir + '/' + outputFilePath;
                    if (newStreamObj.outputDir.slice(-1) === '/')
                        newStreamObj.outputDir = newStreamObj.outputDir.slice(0, -1);
                    delete newStreamObj.globProperty;
                    streamObjArray.push(newStreamObj);
                });
                resolve(streamObjArray);
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
    _a.interface = SGlobResolverStreamActionInterface,
    _a);
//# sourceMappingURL=module.js.map