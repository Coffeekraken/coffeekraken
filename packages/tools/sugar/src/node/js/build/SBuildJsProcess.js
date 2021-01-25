"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBuildJsActionsStream_1 = __importDefault(require("./SBuildJsActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SBuildJsInterface_1 = __importDefault(require("./interface/SBuildJsInterface"));
module.exports = (_a = class SBuildJsProcess extends SProcess_1.default {
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
                id: 'SBuildJsProcess',
                name: 'Build JS Process'
            }, settings));
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
            setTimeout(() => {
                const actionStream = new SBuildJsActionsStream_1.default(Object.assign(Object.assign({}, settings), { logs: {
                        success: false,
                        start: false
                    } }));
                this._buildJsActionStream = actionStream.start(params);
                this.bindSPromise(this._buildJsActionStream);
            }, 1000);
        }
    },
    _a.interfaces = {
        this: SBuildJsInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkSnNQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkSnNQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUE4RDtBQUM5RCx1RUFBaUQ7QUFDakQsc0VBQWdEO0FBQ2hELHNGQUFnRTtBQWtCaEUsdUJBQVMsTUFBTSxlQUFnQixTQUFRLGtCQUFVO1FBSy9DOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxFQUFFLEVBQUUsaUJBQWlCO2dCQUNyQixJQUFJLEVBQUUsa0JBQWtCO2FBQ3pCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1lBQzNCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxZQUFZLEdBQUcsSUFBSSwrQkFBdUIsaUNBQzNDLFFBQVEsS0FDWCxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLEtBQUs7d0JBQ2QsS0FBSyxFQUFFLEtBQUs7cUJBQ2IsSUFDRCxDQUFDO2dCQUNILElBQUksQ0FBQyxvQkFBb0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQy9DLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNYLENBQUM7S0FDRjtJQW5EUSxhQUFVLEdBQUc7UUFDbEIsSUFBSSxFQUFFLDJCQUFtQjtLQUN6QjtRQWlERiJ9