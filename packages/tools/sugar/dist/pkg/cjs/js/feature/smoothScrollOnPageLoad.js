"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrollToLocationHash_1 = __importDefault(require("../dom/scroll/scrollToLocationHash"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function smoothScrollOnPageLoad(settings = {}) {
    settings = (0, deepMerge_1.default)({
        scroll: {},
    }, settings);
    (0, scrollToLocationHash_1.default)(settings);
}
exports.default = smoothScrollOnPageLoad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsOEZBQXdFO0FBQ3hFLDhFQUF3RDtBQStCeEQsU0FBUyxzQkFBc0IsQ0FDM0IsV0FBcUQsRUFBRTtJQUV2RCxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUEsOEJBQXNCLEVBQUMsUUFBUSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUNELGtCQUFlLHNCQUFzQixDQUFDIn0=