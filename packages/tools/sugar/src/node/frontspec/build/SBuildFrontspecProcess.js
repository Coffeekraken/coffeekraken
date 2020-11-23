"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildFrontspecActionsStream_1 = __importDefault(require("./SBuildFrontspecActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SBuildFrontspecInterface_1 = __importDefault(require("./interface/SBuildFrontspecInterface"));
/**
 * @name            SBuildFrontspecProcess
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the frontspec.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildFrontspecProcess extends SProcess_1.default {
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
            id: 'SBuildFrontspecProcess',
            name: 'Build Frontspec Process'
        }, settings));
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that execute the actual process
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildFrontspecActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        const actionStream = new SBuildFrontspecActionsStream_1.default(settings);
        const actionStreamProcess = actionStream.start(params);
        this.bindSPromise(actionStreamProcess);
    }
}
exports.default = SBuildFrontspecProcess;
SBuildFrontspecProcess.interface = SBuildFrontspecInterface_1.default;
