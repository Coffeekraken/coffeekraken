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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyU3VnYXJBcHBNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zZXJ2ZXIvZnJvbnRlbmQvU0Zyb250ZW5kU2VydmVyU3VnYXJBcHBNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsc0ZBQWdFO0FBQ2hFLG9HQUE4RTtBQUU5RSx1RUFBaUQ7QUFDakQsMEdBQW9GO0FBRXBGOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFxQiw2QkFBOEIsU0FBUSx5QkFBaUI7SUFLMUU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxNQUFNLEdBQUcsRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3BDLCtCQUErQjtRQUMvQixLQUFLLENBQ0gsTUFBTSxFQUNOLG1CQUFXLENBQ1Q7WUFDRSxPQUFPLEVBQUUsSUFBSTtTQUNkLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEtBQUs7UUFDSCxNQUFNLEdBQUcsR0FBRyxJQUFJLGdDQUF3QixpQkFDdEMsVUFBVSxFQUFFLEtBQUssSUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFDakMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDOztBQTNDSCxnREE0Q0M7QUEzQ1Esd0NBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsa0NBQTBCO0NBQ2pDLENBQUMifQ==