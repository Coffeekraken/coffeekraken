"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_component_utils_1 = __importDefault(require("@coffeekraken/s-component-utils"));
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
        var _a, _b;
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        const front = new s_front_1.default({
            id: 'carpenter',
            lod: {
                defaultLevel: 5,
            },
        });
        front.setLod(5);
        // components
        (0, SCarpenterAppComponent_1.define)(Object.assign(Object.assign({}, ((_a = s_component_utils_1.default.getDefaultProps('s-carpenter')) !== null && _a !== void 0 ? _a : {})), { window: (_b = window.top) !== null && _b !== void 0 ? _b : window }));
    }
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdGQUFnRTtBQUNoRSx1REFBeUQ7QUFDekQscUVBQW1GO0FBRW5GLG9FQUE2QztBQUk3QyxNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUFDNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1Qzs7UUFDL0MsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUM7WUFDdkIsRUFBRSxFQUFFLFdBQVc7WUFDZixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLENBQUM7YUFDbEI7U0FDSixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhCLGFBQWE7UUFDYixJQUFBLCtCQUE2QixrQ0FDdEIsQ0FBQyxNQUFBLDJCQUFpQixDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsbUNBQUksRUFBRSxDQUFDLEtBQzNELE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxHQUFHLG1DQUFJLE1BQU0sSUFDOUIsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTVCRCw2QkE0QkMifQ==