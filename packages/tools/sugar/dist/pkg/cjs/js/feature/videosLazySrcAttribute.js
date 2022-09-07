"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whenInViewport_1 = __importDefault(require("../dom/whenInViewport"));
const dom_1 = require("@coffeekraken/sugar/dom");
function videoLazySrcAttribute(settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    (0, dom_1.__querySelectorLive)('video[lazy-src]:not([is])', ($videoElm) => {
        (0, whenInViewport_1.default)($videoElm, settings.offset).then(() => {
            $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
        });
    });
}
exports.default = videoLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFtRDtBQUNuRCxpREFBOEQ7QUFrQzlELFNBQVMscUJBQXFCLENBQzFCLFdBQW9ELEVBQUU7SUFFdEQsUUFBUSxtQkFDSixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsSUFBQSx5QkFBbUIsRUFBQywyQkFBMkIsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNELElBQUEsd0JBQWMsRUFBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDakQsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUscUJBQXFCLENBQUMifQ==