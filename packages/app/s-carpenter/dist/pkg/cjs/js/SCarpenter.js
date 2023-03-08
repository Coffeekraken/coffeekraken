"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const SCarpenterAppComponent_1 = require("./SCarpenterAppComponent");
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
class SCarpenter extends s_class_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        var _a;
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        const front = new s_front_1.default({
            id: 'carpenter',
            lod: {
                defaultLevel: 5,
            },
        });
        front.setLod(5);
        // features
        (0, s_activate_feature_1.define)();
        // components
        (0, SCarpenterAppComponent_1.define)({
            window: (_a = window.top) !== null && _a !== void 0 ? _a : window,
        });
    }
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUVBQWdGO0FBQ2hGLG9FQUE2QztBQUM3Qyx1REFBeUQ7QUFDekQscUVBQW1GO0FBRW5GLG9FQUE2QztBQUk3QyxNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUFDNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1Qzs7UUFDL0MsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUM7WUFDdkIsRUFBRSxFQUFFLFdBQVc7WUFDZixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLENBQUM7YUFDbEI7U0FDSixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhCLFdBQVc7UUFDWCxJQUFBLDJCQUFrQixHQUFFLENBQUM7UUFFckIsYUFBYTtRQUNiLElBQUEsK0JBQTZCLEVBQUM7WUFDMUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLEdBQUcsbUNBQUksTUFBTTtTQUMvQixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUE5QkQsNkJBOEJDIn0=