"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
SFsCacheStreamActionInterface.definitionObj = {
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
/**
 * @name            SFsCacheStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This action allows you to make profit of the filesystem cache.
 * You can specify which streamObj property will be the cache id as well as
 * in which condition you want to bypass the cached value.
 * By default the cached value will be regenerated if the "input" property is a file and that this file has been saved after the cached value.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsCacheStreamAction extends SActionsStreamAction_1.default {
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
        return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
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
        });
    }
}
exports.default = SFsCacheStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFsCacheStreamAction.interface = SFsCacheStreamActionInterface;
