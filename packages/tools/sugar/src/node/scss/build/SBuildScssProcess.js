"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildScssActionsStream_1 = __importDefault(require("./SBuildScssActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SBuildScssInterface_1 = __importDefault(require("./interface/SBuildScssInterface"));
/**
 * @name            SBuildScssProcess
 * @namespace           sugar.node.build.scss
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the SCSS files into CSS
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildScssProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            id: 'SBuildScssProcess',
            name: 'Build SCSS Process'
        }, settings));
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that execute the actual process code
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        const actionStream = new SBuildScssActionsStream_1.default({
            ...settings,
            logs: {
                start: false,
                success: false
            }
        });
        const actionStreamProcess = actionStream.start(params);
        this.bindSPromise(actionStreamProcess);
    }
}
exports.default = SBuildScssProcess;
SBuildScssProcess.interface = SBuildScssInterface_1.default;
