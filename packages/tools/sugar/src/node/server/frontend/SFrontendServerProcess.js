"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const frontend_1 = __importDefault(require("./frontend"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
module.exports = (_a = class SFrontendServerProcess extends SProcess_1.default {
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
    },
    _a.interfaces = {
        this: SFrontendServerInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udGVuZFNlcnZlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMERBQTBDO0FBQzFDLHNFQUFnRDtBQUNoRCxvR0FBOEU7QUFrQjlFLHVCQUFTLE1BQU0sc0JBQXVCLFNBQVEsa0JBQVU7UUFLdEQ7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLGFBQWEsRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUN0QyxLQUFLLENBQUMsYUFBYSxrQkFDakIsRUFBRSxFQUFFLHdCQUF3QixFQUM1QixJQUFJLEVBQUUseUJBQXlCLElBQzVCLFFBQVEsRUFDWCxDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDM0IsT0FBTyxrQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQ0Y7SUFyQ1EsYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSxrQ0FBMEI7S0FDaEM7UUFtQ0YifQ==