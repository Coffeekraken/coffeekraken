"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const fastdom_1 = __importDefault(require("fastdom"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function __imagesLazySrcAttribute(settings = {}) {
    settings = (0, deepMerge_1.default)({
        offset: 50,
    }, settings);
    (0, dom_1.__querySelectorLive)('img[lazy-src]:not([is])', ($imgElm) => {
        (0, dom_1.__whenInViewport)($imgElm, settings.offset).then(() => {
            fastdom_1.default.mutate(() => {
                $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
            });
        });
    });
}
exports.default = __imagesLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUFnRjtBQUNoRixzREFBZ0M7QUFDaEMsOEVBQXNEO0FBbUN0RCxTQUF3Qix3QkFBd0IsQ0FDNUMsV0FBcUQsRUFBRTtJQUV2RCxRQUFRLEdBQUcsSUFBQSxtQkFBUyxFQUNoQjtRQUNJLE1BQU0sRUFBRSxFQUFFO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUNGLElBQUEseUJBQW1CLEVBQUMseUJBQXlCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN2RCxJQUFBLHNCQUFnQixFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRCxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBaEJELDJDQWdCQyJ9