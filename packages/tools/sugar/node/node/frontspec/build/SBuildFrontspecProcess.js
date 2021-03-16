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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2Zyb250c3BlYy9idWlsZC9TQnVpbGRGcm9udHNwZWNQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtHQUE0RTtBQUM1RSx1RUFBaUQ7QUFDakQsc0VBQWdEO0FBQ2hELG9HQUE4RTtBQUU5RTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFxQixzQkFBdUIsU0FBUSxrQkFBVTtJQUs1RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsd0JBQXdCO1lBQzVCLElBQUksRUFBRSx5QkFBeUI7U0FDaEMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxzQ0FBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsT0FBTyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDOztBQTNDSCx5Q0E0Q0M7QUEzQ1EsaUNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsa0NBQTBCO0NBQ2pDLENBQUMifQ==