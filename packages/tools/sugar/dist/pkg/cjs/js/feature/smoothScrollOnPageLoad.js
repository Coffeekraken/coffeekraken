"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const dom_1 = require("@coffeekraken/sugar/dom");
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function __smoothScrollOnPageLoad(settings = {}) {
    settings = (0, deepMerge_1.default)({
        scroll: {},
    }, settings);
    (0, dom_1.__scrollToLocationHash)(settings);
}
exports.default = __smoothScrollOnPageLoad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLGlEQUFpRTtBQUNqRSw4RUFBd0Q7QUFrQ3hELFNBQXdCLHdCQUF3QixDQUM1QyxXQUFxRCxFQUFFO0lBRXZELFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBQSw0QkFBc0IsRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBWEQsMkNBV0MifQ==