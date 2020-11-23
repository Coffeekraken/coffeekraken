"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SActionsStreamAction_1 = __importDefault(require("../../../stream/SActionsStreamAction"));
const SBuildJsInterface_1 = __importDefault(require("../interface/SBuildJsInterface"));
const SJsCompiler_1 = __importDefault(require("../../SJsCompiler"));
/**
 * @name                SCompileJsStreamAction
 * @namespace           sugar.node.build.js.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of compiling the passed file
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCompileJsStreamAction extends SActionsStreamAction_1.default {
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
            id: 'SCompileJsStreamAction'
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
        return super.run(streamObj, async (resolve, reject) => {
            const compiler = new SJsCompiler_1.default(streamObj);
            const compileRes = await compiler.compile(streamObj.input);
            // otherwise, save the new data in the streamObj
            streamObj.data = compileRes.js;
            // set the map if has been generated
            if (compileRes.map)
                streamObj.sourcemapData = compileRes.map;
            // resolve the new streamObj
            resolve(streamObj);
        });
    }
}
exports.default = SCompileJsStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SCompileJsStreamAction.interface = SBuildJsInterface_1.default.extends({
    definitionObj: {}
});
