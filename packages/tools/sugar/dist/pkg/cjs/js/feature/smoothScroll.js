"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const smoothScrollOnAnchorLinks_1 = __importDefault(require("./smoothScrollOnAnchorLinks"));
const smoothScrollOnPageLoad_1 = __importDefault(require("./smoothScrollOnPageLoad"));
const smoothScrollOnHashChange_1 = __importDefault(require("./smoothScrollOnHashChange"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function smoothScroll(settings = {}) {
    settings = (0, deepMerge_1.default)({
        scroll: {},
    }, settings);
    (0, smoothScrollOnPageLoad_1.default)(settings);
    (0, smoothScrollOnAnchorLinks_1.default)(settings);
    (0, smoothScrollOnHashChange_1.default)(settings);
}
exports.default = smoothScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsNEZBQXNFO0FBQ3RFLHNGQUFnRTtBQUNoRSwwRkFBb0U7QUFDcEUsOEVBQXdEO0FBbUN4RCxTQUFTLFlBQVksQ0FBQyxXQUEyQyxFQUFFO0lBQy9ELFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBQSxnQ0FBd0IsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxJQUFBLG1DQUEyQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLElBQUEsa0NBQTBCLEVBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUNELGtCQUFlLFlBQVksQ0FBQyJ9