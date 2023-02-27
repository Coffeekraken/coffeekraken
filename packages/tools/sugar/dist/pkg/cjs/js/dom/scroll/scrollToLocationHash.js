"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
function __scrollToLocationHash(settings = {}) {
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
    return (0, dom_1.__scrollTo)(targetElm, settings.scroll);
}
exports.default = __scrollToLocationHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUFxRDtBQUNyRCxpRkFBMkQ7QUFvQzNELFNBQXdCLHNCQUFzQixDQUMxQyxXQUFtRCxFQUFFO0lBRXJELFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsc0NBQXNDO0lBQ3RDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRXBDLHFCQUFxQjtJQUNyQixJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFbEIseUNBQXlDO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFL0MsaUNBQWlDO0lBQ2pDLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTztJQUV2QixrRUFBa0U7SUFDbEUsSUFBSSxtQkFBbUIsSUFBSSxPQUFPLEVBQUU7UUFDaEMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztLQUN4QztJQUVELG1CQUFtQjtJQUNuQixPQUFPLElBQUEsZ0JBQVUsRUFBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUE3QkQseUNBNkJDIn0=