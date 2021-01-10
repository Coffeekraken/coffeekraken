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
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const ensureDirSync_1 = __importDefault(require("../../fs/ensureDirSync"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const md5_1 = __importDefault(require("../../crypt/md5"));
const writeJsonSync_1 = __importDefault(require("../../fs/writeJsonSync"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsCacheStreamActionInterface extends SInterface_1.default {
}
SFsCacheStreamActionInterface.definition = {
    input: {
        type: 'String',
        required: true
    },
    cacheDir: {
        type: 'String',
        required: true,
        default: `${packageRoot_1.default()}/.cache/SFsCacheStreamAction`
    }
};
module.exports = (_a = class SFsCacheStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.fs.cache',
                idProperty: 'input'
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
            return super.run(streamObj, (resolve, reject, trigger) => __awaiter(this, void 0, void 0, function* () {
                // make sure we have the cache directory
                ensureDirSync_1.default(streamObj.cacheDir);
                // generate the id
                const id = `${this._settings.id}-${md5_1.default.encrypt(streamObj[settings.idProperty])}`;
                // check if the output files exists or not
                let outputFilesExists = true;
                if (streamObj.outputStack) {
                    Object.keys(streamObj.outputStack).forEach((key) => {
                        const path = streamObj.outputStack[key];
                        if (!fs_1.default.existsSync(path)) {
                            outputFilesExists = false;
                        }
                    });
                }
                // cache file path
                const cacheFilePath = `${streamObj.cacheDir}/${id}.json`;
                // generate cache function
                function generateCache(streamObj) {
                    return new Promise((resolve, reject) => {
                        writeJsonSync_1.default(cacheFilePath, {
                            streamObj,
                            _sugarVersion: require(`${packageRoot_1.default(__dirname)}/package.json`)
                                .version
                        });
                        resolve(streamObj);
                    });
                }
                // check if the cache file exists
                // or if the output files does not exists
                if (!fs_1.default.existsSync(cacheFilePath) || !outputFilesExists) {
                    this.registerCallback(generateCache, 'after');
                    return resolve(streamObj);
                }
                // get the timestamp of each files
                const inputStats = fs_1.default.statSync(streamObj.input);
                const cacheStats = fs_1.default.statSync(cacheFilePath);
                // check if the input file is newer that the cache one
                if (inputStats.mtimeMs > cacheStats.mtimeMs) {
                    this.registerCallback(generateCache, 'after');
                }
                else {
                    // load the cache file
                    const cacheJson = require(cacheFilePath);
                    // restore the streamObject
                    streamObj = cacheJson.streamObj;
                    // specify to the ActionStream that we need to skip all the next actions
                    trigger('log', {
                        value: `#warning Skipping the next actions cause the data have been <primary>laoded from the cache</primary>...`
                    });
                    this.skipNextActions();
                }
                setTimeout(() => {
                    resolve(streamObj);
                });
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
    _a.interface = SFsCacheStreamActionInterface,
    _a);
//# sourceMappingURL=SFsCacheStreamAction.js.map