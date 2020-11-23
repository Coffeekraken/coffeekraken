"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const glob_1 = __importDefault(require("glob"));
const clone_1 = __importDefault(require("../../object/clone"));
const filename_1 = __importDefault(require("../../fs/filename"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SGlobResolverStreamActionInterface extends SInterface_1.default {
}
SGlobResolverStreamActionInterface.definitionObj = {
    globProperty: {
        type: 'String',
        required: true
    }
};
/**
 * @name            SGlobResolverStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you resolve glob pattern by specifying the streamObj property that
 * is one. It will then return an array of streamObj handled normally by the SActionsStream instance
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SGlobResolverStreamAction extends SActionsStreamAction_1.default {
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
        return super.run(streamObj, async (resolve, reject) => {
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
        });
    }
}
exports.default = SGlobResolverStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SGlobResolverStreamAction.interface = SGlobResolverStreamActionInterface;
