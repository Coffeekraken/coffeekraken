"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../../../stream/SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SBuildScssInterface_1 = __importDefault(require("../interface/SBuildScssInterface"));
const SScssCompiler_1 = __importDefault(require("../../SScssCompiler"));
/**
 * @name                SRenderSassStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of rendering the sass string in the "data" property
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SRenderSassStreamAction extends SActionsStreamAction_1.default {
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
            name: 'Render',
            id: 'actionStream.action.scss.render'
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
        return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
            // compile using the SScssCompiler class
            if (!streamObj.outputStack)
                streamObj.outputStack = {};
            const compiler = new SScssCompiler_1.default(streamObj);
            const compileRes = await compiler.compile(streamObj.input);
            streamObj.data = compileRes.css;
            if (compileRes.map) {
                streamObj.sourcemapData = compileRes.map;
            }
            resolve(streamObj);
        });
    }
}
exports.default = SRenderSassStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SRenderSassStreamAction.interface = SBuildScssInterface_1.default;
