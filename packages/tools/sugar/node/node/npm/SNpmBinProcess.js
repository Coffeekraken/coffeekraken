"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SNpmBinParamsInterfaceamsInterface_1 = __importDefault(require("./interface/SNpmBinParamsInterfaceamsInterface"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name              SNpmBinProcess
 * @namespace         sugar.node.npm
 * @type              Class
 * @extends           SProcess
 * @status              wip
 *
 * This class represent the npm bin capabilities like install a bin globally or locally, uninstall it, etc...
 *
 * @param         {Object}       [settings={}]         An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SNpmBinProcess from '@coffeekraken/sugar/node/npm/SNpmBinProcess';
 * const p = new SNpmBinProcess();
 * p.run({
 *  action: 'install',
 *  package: '@coffeekraken/sugar',
 *  globally: true
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SNpmBinProcess extends SProcess_1.default {
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
            id: 'SNpmBinProcess',
            name: 'Npm Bin Process'
        }, settings));
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that actually execute the process
     *
     * @param       {Object}       params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}       [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                       An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        setTimeout(() => {
            const actionStream = new __SBuildJsActionsStream(Object.assign(Object.assign({}, settings), { logs: {
                    success: false,
                    start: false
                } }));
            this._buildJsActionStream = actionStream.start(params);
            this.bindSPromise(this._buildJsActionStream);
        }, 1000);
    }
}
exports.default = SNpmBinProcess;
SNpmBinProcess.interfaces = {
    this: SNpmBinParamsInterfaceamsInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpblByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9ucG0vU05wbUJpblByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsbUVBQTRDO0FBQzVDLHdIQUFxRjtBQUNyRixvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBcUIsY0FBZSxTQUFRLGtCQUFTO0lBS25EOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVUsQ0FDUjtZQUNFLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsSUFBSSxFQUFFLGlCQUFpQjtTQUN4QixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMzQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxZQUFZLEdBQUcsSUFBSSx1QkFBdUIsaUNBQzNDLFFBQVEsS0FDWCxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLEtBQUs7b0JBQ2QsS0FBSyxFQUFFLEtBQUs7aUJBQ2IsSUFDRCxDQUFDO1lBQ0gsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDOztBQW5ESCxpQ0FvREM7QUFuRFEseUJBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsNENBQXVCO0NBQzlCLENBQUMifQ==