"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SSugarAppModule_1 = __importDefault(require("../../app/sugar/SSugarAppModule"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFrontendServerProcess_1 = __importDefault(require("../../server/frontend/SFrontendServerProcess"));
module.exports = (_a = class SFrontendServerSugarAppModule extends SSugarAppModule_1.default {
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
            // check the settings interface
            super(params, deepMerge_1.default({
                autoRun: true
            }, settings));
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
            const pro = new SFrontendServerProcess_1.default(Object.assign({ runAsChild: false }, this._settings.processSettings));
            return super.start(pro);
        }
    },
    _a.interfaces = {
        this: SFrontendServerInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyU3VnYXJBcHBNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRlbmRTZXJ2ZXJTdWdhckFwcE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRkFBZ0U7QUFDaEUsb0dBQThFO0FBRTlFLHVFQUFpRDtBQUNqRCwwR0FBb0Y7QUFnQnBGLHVCQUFTLE1BQU0sNkJBQThCLFNBQVEseUJBQWlCO1FBS3BFOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksTUFBTSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUNwQywrQkFBK0I7WUFDL0IsS0FBSyxDQUNILE1BQU0sRUFDTixtQkFBVyxDQUNUO2dCQUNFLE9BQU8sRUFBRSxJQUFJO2FBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsS0FBSztZQUNILE1BQU0sR0FBRyxHQUFHLElBQUksZ0NBQXdCLGlCQUN0QyxVQUFVLEVBQUUsS0FBSyxJQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUNqQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUM7S0FDRjtJQTNDUSxhQUFVLEdBQUc7UUFDbEIsSUFBSSxFQUFFLGtDQUEwQjtLQUNoQztRQXlDRiJ9