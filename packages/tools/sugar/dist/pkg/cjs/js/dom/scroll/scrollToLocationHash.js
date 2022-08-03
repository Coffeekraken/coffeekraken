"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrollTo_1 = __importDefault(require("./scrollTo"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
function scrollToLocationHash(settings = {}) {
    settings = (0, deepMerge_1.default)({
        scroll: {},
    }, settings);
    // check if we have an hash in the url
    const hash = document.location.hash;
    // if not, do nothing
    if (!hash)
        return;
    // try to get the hash target in the page
    const targetElm = document.querySelector(hash);
    // if no target found, do nothing
    if (!targetElm)
        return;
    // tell the browser that we handle the scroll restoration manually
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    // scroll to target
    return (0, scrollTo_1.default)(targetElm, settings.scroll);
}
exports.default = scrollToLocationHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLDBEQUFvQztBQUVwQyxpRkFBMkQ7QUFpQzNELFNBQVMsb0JBQW9CLENBQ3pCLFdBQW1ELEVBQUU7SUFFckQsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixzQ0FBc0M7SUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFcEMscUJBQXFCO0lBQ3JCLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTztJQUVsQix5Q0FBeUM7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUvQyxpQ0FBaUM7SUFDakMsSUFBSSxDQUFDLFNBQVM7UUFBRSxPQUFPO0lBRXZCLGtFQUFrRTtJQUNsRSxJQUFJLG1CQUFtQixJQUFJLE9BQU8sRUFBRTtRQUNoQyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0tBQ3hDO0lBRUQsbUJBQW1CO0lBQ25CLE9BQU8sSUFBQSxrQkFBVSxFQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUNELGtCQUFlLG9CQUFvQixDQUFDIn0=