"use strict";
// @ts-nocheck
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
 * @status              wip
 *
 * This class represent the process that build the frontspec.json file
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
        return actionStreamProcess;
    }
}
exports.default = SBuildFrontspecProcess;
SBuildFrontspecProcess.interfaces = {
    this: SBuildFrontspecInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZEZyb250c3BlY1Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0dBQTRFO0FBQzVFLHVFQUFpRDtBQUNqRCxzRUFBZ0Q7QUFDaEQsb0dBQThFO0FBRTlFOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQXFCLHNCQUF1QixTQUFRLGtCQUFVO0lBSzVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsSUFBSSxFQUFFLHlCQUF5QjtTQUNoQyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMzQixNQUFNLFlBQVksR0FBRyxJQUFJLHNDQUE4QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sbUJBQW1CLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7O0FBM0NILHlDQTRDQztBQTNDUSxpQ0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSxrQ0FBMEI7Q0FDakMsQ0FBQyJ9