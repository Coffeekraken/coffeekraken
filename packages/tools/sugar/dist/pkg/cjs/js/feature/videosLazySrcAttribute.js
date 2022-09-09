"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function __videoLazySrcAttribute(settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    (0, dom_1.__querySelectorLive)('video[lazy-src]:not([is])', ($videoElm) => {
        (0, dom_1.__whenInViewport)($videoElm, settings.offset).then(() => {
            $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
        });
    });
}
exports.default = __videoLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUFnRjtBQWtDaEYsU0FBd0IsdUJBQXVCLENBQzNDLFdBQW9ELEVBQUU7SUFFdEQsUUFBUSxtQkFDSixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsSUFBQSx5QkFBbUIsRUFBQywyQkFBMkIsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNELElBQUEsc0JBQWdCLEVBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ25ELFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVpELDBDQVlDIn0=