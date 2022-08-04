"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whenInViewport_1 = __importDefault(require("../dom/whenInViewport"));
const querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function imagesLazySrcAttribute(settings = {}) {
    settings = (0, deepMerge_1.default)({
        offset: 50,
    }, settings);
    (0, querySelectorLive_1.default)('img[lazy-src]:not([is])', ($imgElm) => {
        (0, whenInViewport_1.default)($imgElm, settings.offset).then(() => {
            $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
        });
    });
}
exports.default = imagesLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFtRDtBQUNuRCxpRkFBeUQ7QUFDekQsOEVBQXNEO0FBbUN0RCxTQUFTLHNCQUFzQixDQUMzQixXQUFxRCxFQUFFO0lBRXZELFFBQVEsR0FBRyxJQUFBLG1CQUFTLEVBQ2hCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBQ0YsSUFBQSwyQkFBaUIsRUFBQyx5QkFBeUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3JELElBQUEsd0JBQWMsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsc0JBQXNCLENBQUMifQ==