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
const writeFile_1 = __importDefault(require("../../fs/writeFile"));
const toString_1 = __importDefault(require("../../string/toString"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const get_1 = __importDefault(require("../../object/get"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsOutputStreamActionInterface extends SInterface_1.default {
}
SFsOutputStreamActionInterface.definition = {
    outputStack: {
        type: 'Object',
        required: false
    }
};
module.exports = (_a = class SFsOutputStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.fs.output'
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
            return super.run(streamObj, ({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                if (!streamObj.outputStack || typeof streamObj.outputStack !== 'object') {
                    this.warn(`The streamObj does not contain any "<cyan>outputStack</cyan>" property so no file will be saved at all...`);
                    return resolve(streamObj);
                }
                // loop on the files to save
                const outputStackKeys = Object.keys(streamObj.outputStack);
                for (let i = 0; i < outputStackKeys.length; i++) {
                    const key = outputStackKeys[i];
                    const outputPath = streamObj.outputStack[key];
                    const readableOutputPath = outputPath.replace(packageRoot_1.default(process.cwd()), '');
                    if (!get_1.default(streamObj, key))
                        continue;
                    yield writeFile_1.default(outputPath, toString_1.default(get_1.default(streamObj, key), {
                        beautify: true
                    }));
                }
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
    _a.interfaces = {
        this: SFsOutputStreamActionInterface
    },
    _a);
//# sourceMappingURL=SFsOutputStreamAction.js.map