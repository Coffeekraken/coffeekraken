"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const SViteStartInterface_1 = __importDefault(require("./start/interface/SViteStartInterface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const vite_1 = require("vite");
class SVite extends s_class_1.default {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(deepMerge_1.default({
            vite: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            viteSettings
     * @type            ISViteSettings
     * @get
     *
     * Access the vite settings
     *
     * @since           2.0.09
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get viteSettings() {
        return this._settings.vite;
    }
    /**
     * @name          start
     * @type          Function
     *
     * Start the vite service with the server and the compilers
     *
     * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(params) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const server = yield vite_1.createServer(Object.assign({ configFile: false }, s_sugar_config_1.default('vite')));
            yield server.listen();
        }));
    }
}
exports.default = SVite;
SVite.interfaces = {
    startParams: SViteStartInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3Qyw0RkFBc0U7QUFDdEUsa0ZBQXlEO0FBQ3pELGdHQUEwRTtBQUMxRSx3RUFBaUQ7QUFNakQsK0JBQW9EO0FBU3BELE1BQXFCLEtBQU0sU0FBUSxpQkFBUTtJQW1CekM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE2QjtRQUN2QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLElBQUksRUFBRSxFQUFFO1NBQ1QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQWpDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFlBQVk7UUFDZCxPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUF1QkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssQ0FBQyxNQUFXO1FBQ2YsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxNQUFNLE1BQU0sR0FBRyxNQUFNLG1CQUFZLGlCQUMvQixVQUFVLEVBQUUsS0FBSyxJQUNkLHdCQUFhLENBQUMsTUFBTSxDQUFDLEVBQ3hCLENBQUM7WUFDSCxNQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUEzREgsd0JBNERDO0FBM0RRLGdCQUFVLEdBQUc7SUFDbEIsV0FBVyxFQUFFLDZCQUFxQjtDQUNuQyxDQUFDIn0=