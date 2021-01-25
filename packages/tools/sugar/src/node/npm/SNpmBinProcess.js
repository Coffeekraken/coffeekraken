"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SNpmBinInterface_1 = __importDefault(require("./interface/SNpmBinInterface"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
module.exports = (_a = class SNpmBinProcess extends SProcess_1.default {
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
    },
    _a.interfaces = {
        this: SNpmBinInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpblByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTnBtQmluUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxtRUFBNEM7QUFDNUMsb0ZBQTZEO0FBQzdELG9FQUE2QztBQTZCN0MsdUJBQVMsTUFBTSxjQUFlLFNBQVEsa0JBQVM7UUFLN0M7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxtQkFBVSxDQUNSO2dCQUNFLEVBQUUsRUFBRSxnQkFBZ0I7Z0JBQ3BCLElBQUksRUFBRSxpQkFBaUI7YUFDeEIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxNQUFNLFlBQVksR0FBRyxJQUFJLHVCQUF1QixpQ0FDM0MsUUFBUSxLQUNYLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsS0FBSzt3QkFDZCxLQUFLLEVBQUUsS0FBSztxQkFDYixJQUNELENBQUM7Z0JBQ0gsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDL0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1gsQ0FBQztLQUNGO0lBbkRRLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUsMEJBQWlCO0tBQ3ZCO1FBaURGIn0=