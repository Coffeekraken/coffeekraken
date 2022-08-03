"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const makeFloat_1 = __importDefault(require("@coffeekraken/sugar/js/dom/ui/makeFloat"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SFloatingFeatureInterface_1 = __importDefault(require("./interface/SFloatingFeatureInterface"));
// @ts-ignore
const s_floating_feature_css_1 = __importDefault(require("../../../../src/css/s-floating-feature.css")); // relative to /dist/pkg/esm/js
class SFloatingFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, deepMerge_1.default)({
            interface: SFloatingFeatureInterface_1.default,
            style: s_floating_feature_css_1.default,
        }, settings !== null && settings !== void 0 ? settings : {}));
        // adding the s-floating class to the node
        this.node.classList.add('s-floating');
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
        console.log(this.node, this.props);
        (0, makeFloat_1.default)(this.node, this._$ref, this.props);
    }
}
exports.default = SFloatingFeature;
function define(props = {}, name = 's-floating') {
    s_feature_1.default.defineFeature(name, SFloatingFeature, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCx3RkFBa0U7QUFDbEUsNEZBQXNFO0FBQ3RFLHNHQUFnRjtBQUVoRixhQUFhO0FBQ2Isd0dBQStELENBQUMsK0JBQStCO0FBb0MvRixNQUFxQixnQkFBaUIsU0FBUSxtQkFBVTtJQUdwRCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsbUJBQVcsRUFDUDtZQUNJLFNBQVMsRUFBRSxtQ0FBMkI7WUFDdEMsS0FBSyxFQUFFLGdDQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdEMsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ3hDO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0Qsa0VBQWtFO1FBQ2xFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1NBQzVDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0o7QUFyQ0QsbUNBcUNDO0FBRUQsU0FBZ0IsTUFBTSxDQUNsQixRQUF5QyxFQUFFLEVBQzNDLElBQUksR0FBRyxZQUFZO0lBRW5CLG1CQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBTEQsd0JBS0MifQ==