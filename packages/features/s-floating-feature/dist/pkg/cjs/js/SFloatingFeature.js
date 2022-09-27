"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
const SFloatingFeatureInterface_1 = __importDefault(require("./interface/SFloatingFeatureInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const s_floating_feature_css_1 = __importDefault(require("../../../../src/css/s-floating-feature.css")); // relative to /dist/pkg/esm/js
class SFloatingFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            name: 's-floating',
            interface: SFloatingFeatureInterface_1.default,
            style: s_floating_feature_css_1.default,
        }, settings !== null && settings !== void 0 ? settings : {}));
        // handle ref
        if (!this.props.ref) {
            this._$ref = this.node.parentElement;
        }
        else {
            this._$ref = document.querySelector(this.props.ref);
        }
    }
    mount() {
        // handling offset when an arrow is wanted and no offset specified
        if (this.props.offset === undefined && this.props.arrow) {
            this.props.offset = this.props.arrowSize;
        }
        (0, dom_1.__makeFloat)(this.node, this._$ref, this.props);
    }
}
exports.default = SFloatingFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxpREFBc0Q7QUFDdEQsdURBQXlEO0FBQ3pELHNHQUFnRjtBQUVoRixzREFBZ0M7QUEwRVgsaUJBMUVkLGdCQUFRLENBMEVZO0FBeEUzQixhQUFhO0FBQ2Isd0dBQStELENBQUMsK0JBQStCO0FBb0MvRixNQUFxQixnQkFBaUIsU0FBUSxtQkFBVTtJQUdwRCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsb0JBQVcsRUFDUDtZQUNJLElBQUksRUFBRSxZQUFZO1lBQ2xCLFNBQVMsRUFBRSxtQ0FBMkI7WUFDdEMsS0FBSyxFQUFFLGdDQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUN4QzthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkQ7SUFDTCxDQUFDO0lBRUQsS0FBSztRQUNELGtFQUFrRTtRQUNsRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUM1QztRQUNELElBQUEsaUJBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQWpDRCxtQ0FpQ0MifQ==