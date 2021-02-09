"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarAppModule_1 = __importDefault(require("../../app/sugar/SSugarAppModule"));
const SBuildFrontspecInterface_1 = __importDefault(require("./interface/SBuildFrontspecInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBuildFrontspecProcess_1 = __importDefault(require("./SBuildFrontspecProcess"));
/**
 * @name                SBuildFrontspecSugarAppModule
 * @namespace           sugar.node.build.scss
 * @type                Class
 * @extends             SSugarAppModule
 * @status              wip
 *
 * This class represent the build SCSS module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SBuildFrontspecSugarAppModule extends SSugarAppModule_1.default {
    /**
     * @name            constructor
     * @type             Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(params = {}, settings = {}) {
        super(params, deepMerge_1.default({}, settings));
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method is the one called by the SugarUi main class when all is ready
     * to start the modules. Take this as your kind of "launcher" function.
     *
     * @since       2.0.0
     */
    start() {
        const pro = new SBuildFrontspecProcess_1.default(this.params, this._settings.processSettings);
        return super.start(pro);
    }
}
exports.default = SBuildFrontspecSugarAppModule;
SBuildFrontspecSugarAppModule.interfaces = {
    this: SBuildFrontspecInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjU3VnYXJBcHBNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQnVpbGRGcm9udHNwZWNTdWdhckFwcE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRkFBZ0U7QUFDaEUsb0dBQThFO0FBQzlFLHVFQUFpRDtBQUNqRCxzRkFBZ0U7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBcUIsNkJBQThCLFNBQVEseUJBQWlCO0lBSzFFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksTUFBTSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNwQyxLQUFLLENBQUMsTUFBTSxFQUFFLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsS0FBSztRQUNILE1BQU0sR0FBRyxHQUFHLElBQUksZ0NBQXdCLENBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQy9CLENBQUM7UUFDRixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7QUFsQ0gsZ0RBbUNDO0FBbENRLHdDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLGtDQUEwQjtDQUNqQyxDQUFDIn0=