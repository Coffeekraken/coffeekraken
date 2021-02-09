"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarAppModule_1 = __importDefault(require("../../app/sugar/SSugarAppModule"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFrontendServerProcess_1 = __importDefault(require("../../server/frontend/SFrontendServerProcess"));
/**
 * @name                SFrontendServerSugarAppModule
 * @namespace           sugar.node.server.frontend
 * @type                Class
 * @extends             SSugarAppModule
 * @status              wip
 *
 * This class represent the frontend server module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SFrontendServerSugarAppModule extends SSugarAppModule_1.default {
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
}
exports.default = SFrontendServerSugarAppModule;
SFrontendServerSugarAppModule.interfaces = {
    this: SFrontendServerInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyU3VnYXJBcHBNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRlbmRTZXJ2ZXJTdWdhckFwcE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRkFBZ0U7QUFDaEUsb0dBQThFO0FBRTlFLHVFQUFpRDtBQUNqRCwwR0FBb0Y7QUFFcEY7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLDZCQUE4QixTQUFRLHlCQUFpQjtJQUsxRTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLE1BQU0sR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDcEMsK0JBQStCO1FBQy9CLEtBQUssQ0FDSCxNQUFNLEVBQ04sbUJBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRSxJQUFJO1NBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsS0FBSztRQUNILE1BQU0sR0FBRyxHQUFHLElBQUksZ0NBQXdCLGlCQUN0QyxVQUFVLEVBQUUsS0FBSyxJQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUNqQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7O0FBM0NILGdEQTRDQztBQTNDUSx3Q0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSxrQ0FBMEI7Q0FDakMsQ0FBQyJ9