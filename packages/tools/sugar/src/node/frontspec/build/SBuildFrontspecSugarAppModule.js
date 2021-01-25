"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SSugarAppModule_1 = __importDefault(require("../../app/sugar/SSugarAppModule"));
const SBuildFrontspecInterface_1 = __importDefault(require("./interface/SBuildFrontspecInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBuildFrontspecProcess_1 = __importDefault(require("./SBuildFrontspecProcess"));
module.exports = (_a = class SBuildFrontspecSugarAppModule extends SSugarAppModule_1.default {
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
    },
    _a.interfaces = {
        this: SBuildFrontspecInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjU3VnYXJBcHBNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQnVpbGRGcm9udHNwZWNTdWdhckFwcE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRkFBZ0U7QUFDaEUsb0dBQThFO0FBQzlFLHVFQUFpRDtBQUNqRCxzRkFBZ0U7QUFvQmhFLHVCQUFTLE1BQU0sNkJBQThCLFNBQVEseUJBQWlCO1FBS3BFOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksTUFBTSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUNwQyxLQUFLLENBQUMsTUFBTSxFQUFFLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsS0FBSztZQUNILE1BQU0sR0FBRyxHQUFHLElBQUksZ0NBQXdCLENBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQy9CLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztLQUNGO0lBbENRLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUsa0NBQTBCO0tBQ2hDO1FBZ0NGIn0=