"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const fs_1 = __importDefault(require("fs"));
class SViewEngine extends s_class_1.default {
    /**
     * @name      viewEngineSettings
     * @type      ISViewEngineSettings
     * @get
     *
     * Access ViewEngineSettings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get viewEngineSettings() {
        return this._settings.viewEngine;
    }
    /**
     * @name      engineMetas
     * @type      ISViewEngineMetas
     * @get
     *
     * Access the view engine metas
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get engineMetas() {
        return {
            name: this.constructor.names
        };
    }
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(deepMerge_1.default({
            viewEngine: {
                rootDirs: sugar_1.default('views.rootDirs'),
                cacheDir: sugar_1.default('views.cacheDir')
            }
        }, settings));
        if (!fs_1.default.existsSync(this.viewEngineSettings.cacheDir))
            fs_1.default.mkdirSync(this.viewEngineSettings.cacheDir, {
                recursive: true
            });
    }
}
exports.default = SViewEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpZXdFbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmlld0VuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0RkFBc0U7QUFDdEUsb0ZBQW9FO0FBQ3BFLG9FQUE2QztBQUM3Qyw0Q0FBc0I7QUFvRXRCLE1BQU0sV0FBWSxTQUFRLGlCQUFRO0lBQ2hDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksV0FBVztRQUNiLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1NBQzdCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE0QztRQUN0RCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRTtnQkFDVixRQUFRLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO2dCQUN6QyxRQUFRLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO2FBQzFDO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztZQUNwRCxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUU7Z0JBQy9DLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQUVELGtCQUFlLFdBQVcsQ0FBQyJ9