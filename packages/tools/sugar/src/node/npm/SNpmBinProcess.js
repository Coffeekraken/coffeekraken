"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SNpmBinInterface_1 = __importDefault(require("./interface/SNpmBinInterface"));
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
    this: SNpmBinInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpblByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTnBtQmluUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxtRUFBNEM7QUFDNUMsb0ZBQTZEO0FBQzdELG9FQUE2QztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFxQixjQUFlLFNBQVEsa0JBQVM7SUFLbkQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVSxDQUNSO1lBQ0UsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixJQUFJLEVBQUUsaUJBQWlCO1NBQ3hCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLFlBQVksR0FBRyxJQUFJLHVCQUF1QixpQ0FDM0MsUUFBUSxLQUNYLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsS0FBSztvQkFDZCxLQUFLLEVBQUUsS0FBSztpQkFDYixJQUNELENBQUM7WUFDSCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7O0FBbkRILGlDQW9EQztBQW5EUSx5QkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSwwQkFBaUI7Q0FDeEIsQ0FBQyJ9