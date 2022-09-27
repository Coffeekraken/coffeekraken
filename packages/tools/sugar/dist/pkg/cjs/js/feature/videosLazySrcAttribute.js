"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const fastdom_1 = __importDefault(require("fastdom"));
function __videoLazySrcAttribute(settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    (0, dom_1.__querySelectorLive)('video[lazy-src]:not([is])', ($videoElm) => {
        (0, dom_1.__whenInViewport)($videoElm, settings.offset).then(() => {
            fastdom_1.default.mutate(() => {
                $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
            });
        });
    });
}
exports.default = __videoLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUFnRjtBQUNoRixzREFBZ0M7QUFrQ2hDLFNBQXdCLHVCQUF1QixDQUMzQyxXQUFvRCxFQUFFO0lBRXRELFFBQVEsbUJBQ0osTUFBTSxFQUFFLEVBQUUsSUFDUCxRQUFRLENBQ2QsQ0FBQztJQUNGLElBQUEseUJBQW1CLEVBQUMsMkJBQTJCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzRCxJQUFBLHNCQUFnQixFQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNuRCxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLFNBQVMsQ0FBQyxZQUFZLENBQ2xCLEtBQUssRUFDTCxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUNyQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWpCRCwwQ0FpQkMifQ==