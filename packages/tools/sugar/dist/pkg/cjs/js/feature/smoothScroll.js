"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDhFQUF3RDtBQUd4RCx5REFJcUM7QUFxQ3JDLFNBQXdCLGNBQWMsQ0FDbEMsV0FBMkMsRUFBRTtJQUU3QyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUEsa0NBQXdCLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsSUFBQSxxQ0FBMkIsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxJQUFBLG9DQUEwQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFiRCxpQ0FhQyJ9