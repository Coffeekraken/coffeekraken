"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SFrontstack_1 = __importDefault(require("../SFrontstack"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SFrontstackStartInterface_1 = __importDefault(require("./interface/SFrontstackStartInterface"));
// @ts-ignore
class SFrontstackStartProcess extends s_process_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams, deepMerge_1.default({
            frontstack: {
                something: 'cool'
            }
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._frontstackInstance = new SFrontstack_1.default({
            frontstack: this.frontstackSettings
        });
    }
    /**
     * @name      frontstackSettings
     * @type      ISFrontstackSettings
     * @get
     *
     * Access the ```scssCompileProcess``` settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get frontstackSettings() {
        return this._settings.frontstack;
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that actually execute the process
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings) {
        return this._frontstackInstance.start(params, this.frontstackSettings);
    }
}
SFrontstackStartProcess.interfaces = {
    params: SFrontstackStartInterface_1.default
};
exports.default = SFrontstackStartProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2tTdGFydFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFja1N0YXJ0UHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUFzRTtBQUN0RSxpRUFJd0I7QUFDeEIsNEZBQXNFO0FBRXRFLHNHQUFnRjtBQXdCaEYsYUFBYTtBQUNiLE1BQU0sdUJBQXdCLFNBQVEsbUJBQVE7SUErQjVDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxhQUFrQixFQUNsQixRQUF3RDtRQUV4RCxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLE1BQU07YUFDbEI7U0FDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxxQkFBYSxDQUFDO1lBQzNDLFVBQVUsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1NBQ3BDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF0REQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBNENEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FDTCxNQUErQixFQUMvQixRQUF3QztRQUV4QyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7O0FBOUVNLGtDQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFLG1DQUEyQjtDQUNwQyxDQUFDO0FBK0VKLGtCQUFlLHVCQUF1QixDQUFDIn0=