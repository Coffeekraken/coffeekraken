"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const frontend_1 = __importDefault(require("./frontend"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
/**
 * @name            SFrontendServerProcess
 * @namespace           sugar.node.server.frontend
 * @type            Class
 * @extends         SProcess
 * @status              wip
 *
 * This class represent the frontend server Cli based on the express server one
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontendServerProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings = {}) {
        super(initialParams, Object.assign({ id: 'SFrontendServerProcess', name: 'Frontend Server Process' }, settings));
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that actually execute the process
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        return frontend_1.default(params);
    }
}
SFrontendServerProcess.interfaces = {
    this: SFrontendServerInterface_1.default
};
exports.default = SFrontendServerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3NlcnZlci9mcm9udGVuZC9TRnJvbnRlbmRTZXJ2ZXJQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUEwQztBQUMxQyxzRUFBZ0Q7QUFDaEQsb0dBQThFO0FBRTlFOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sc0JBQXVCLFNBQVEsa0JBQVU7SUFLN0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLGFBQWEsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN0QyxLQUFLLENBQUMsYUFBYSxrQkFDakIsRUFBRSxFQUFFLHdCQUF3QixFQUM1QixJQUFJLEVBQUUseUJBQXlCLElBQzVCLFFBQVEsRUFDWCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0IsT0FBTyxrQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDOztBQXBDTSxpQ0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSxrQ0FBMEI7Q0FDakMsQ0FBQztBQXFDSixrQkFBZSxzQkFBc0IsQ0FBQyJ9