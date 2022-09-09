"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const feature_1 = require("@coffeekraken/sugar/feature");
function __smoothScroll(settings = {}) {
    settings = (0, deepMerge_1.default)({
        scroll: {},
    }, settings);
    (0, feature_1.__smoothScrollOnPageLoad)(settings);
    (0, feature_1.__smoothScrollOnAnchorLinks)(settings);
    (0, feature_1.__smoothScrollOnHashChange)(settings);
}
exports.default = __smoothScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsOEVBQXdEO0FBRXhELHlEQUlxQztBQW1DckMsU0FBd0IsY0FBYyxDQUNsQyxXQUEyQyxFQUFFO0lBRTdDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBQSxrQ0FBd0IsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxJQUFBLHFDQUEyQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLElBQUEsb0NBQTBCLEVBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQWJELGlDQWFDIn0=