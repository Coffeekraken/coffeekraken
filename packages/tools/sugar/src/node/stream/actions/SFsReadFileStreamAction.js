"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const fs_1 = __importDefault(require("fs"));
const directory_1 = __importDefault(require("../../is/directory"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsReadFileStreamActionInterface extends SInterface_1.default {
}
SFsReadFileStreamActionInterface.definitionObj = {
    input: {
        type: 'String',
        required: true
    },
    dataProperty: {
        type: 'String',
        required: false,
        default: 'data'
    }
};
/**
 * @name            SFsReadFileStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you to read file(s) to the filesystem
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsReadFileStreamAction extends SActionsStreamAction_1.default {
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
            id: 'actionStream.action.fs.readFile'
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
            if (!fs_1.default.existsSync(streamObj.input))
                throw new Error(`The given "<yellow>input</yellow>" streamObj file path property "<red>${streamObj}</red>" does not exists...`);
            if (directory_1.default(streamObj.input))
                return resolve(streamObj);
            streamObj[streamObj.dataProperty ||
                SFsReadFileStreamAction.definitionObj.dataProperty.default] = fs_1.default.readFileSync(streamObj.input, 'utf8');
            resolve(streamObj);
        });
    }
}
exports.default = SFsReadFileStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFsReadFileStreamAction.interface = SFsReadFileStreamActionInterface;
