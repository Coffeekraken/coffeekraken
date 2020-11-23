"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
const STestJestProcessManager_1 = __importDefault(require("../../test/jest/STestJestProcessManager"));
class SJestStreamActionInterface extends SInterface_1.default {
}
SJestStreamActionInterface.definitionObj = {};
/**
 * @name            SJestStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you execute attached jest tests ([filename.test.js|__tests__/[filename].test.js])
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJestStreamAction extends SActionsStreamAction_1.default {
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
            id: 'SJestStreamAction'
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
            // if (!streamObj.pack) return resolve(streamObj);
            const input = streamObj.updatedFilePath || streamObj.input;
            const jestProcess = new STestJestProcessManager_1.default({}, {
                deamon: null
            });
            const promise = jestProcess.run({
                input
            });
            //   promise.catch((e) => {
            //     reject(e);
            //   });
            const result = await promise;
            // const cli = new __STestJestCli({
            // })
        });
    }
}
exports.default = SJestStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SJestStreamAction.interface = SJestStreamActionInterface;
