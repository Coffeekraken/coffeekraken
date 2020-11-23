"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SExtractStreamActionInterface extends SInterface_1.default {
}
SExtractStreamActionInterface.definitionObj = {};
/**
 * @name            SExtractStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This actions allows you to extract some data from the specified streamObj property using custom comments syntax like "/* extract:propName *\/ ... /* extract *\/".
 * This "propName" specify in which streamObj property you want to save the extracted content.
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * - sourceProp ('data') {String}: Specify the source property you want to extract data from
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SExtractStreamAction extends SActionsStreamAction_1.default {
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
            id: 'actionStream.action.extract',
            sourceProp: 'data'
        }, settings));
        this.constructor.definitionObj = {
            [this._settings.sourceProp]: {
                type: 'String',
                required: true
            }
        };
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
        return super.run(streamObj, async (resolve, reject) => {
            const reg = /\/\*\s?extract:([a-zA-Z0-9-_]+)\s?\*\/(((?!\/\*\s?extract\s?\*\/)(.|\n))*)\/\*\s?extract\s?\*\//g;
            const source = streamObj[settings.sourceProp];
            let myArray;
            while ((myArray = reg.exec(source)) !== null) {
                const prop = myArray[1];
                const string = myArray[2];
                streamObj[prop] = string;
            }
            resolve(streamObj);
        });
    }
}
exports.default = SExtractStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SExtractStreamAction.interface = SExtractStreamActionInterface;
