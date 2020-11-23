"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const rimraf_1 = __importDefault(require("rimraf"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsUnlinkStreamActionInterface extends SInterface_1.default {
}
SFsUnlinkStreamActionInterface.definitionObj = {
    unlink: {
        type: 'String',
        required: true
    }
};
/**
 * @name            SFsUnlinkStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is an action that allows you to delete some files / folders depending on the "unlink" property of the streamObj.
 * You can specify some glob patterns if you want
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @see       https://www.npmjs.com/package/rimraf
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsUnlinkStreamAction extends SActionsStreamAction_1.default {
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
            id: 'actionStream.action.fs.unlink'
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
            rimraf_1.default.sync(streamObj.unlink);
            delete streamObj.unlink;
            resolve(streamObj);
        });
    }
}
exports.default = SFsUnlinkStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFsUnlinkStreamAction.interface = SFsUnlinkStreamActionInterface;
