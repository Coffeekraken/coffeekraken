"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const scrollable_1 = __importDefault(require("../is/scrollable"));
const up_1 = __importDefault(require("../traverse/up"));
/**
 * @name        closestScrollable
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three to find the first element that is scrollable
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __closestScrollable from '@coffeekraken/sugar/js/node/query/closestScrollable';
 * __closestScrollable($myElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function closestScrollable($elm, selector) {
    const res = (0, up_1.default)($elm, ($e) => (0, scrollable_1.default)($e));
    return res;
}
exports.default = closestScrollable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLGtFQUE4QztBQUM5Qyx3REFBMEM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixpQkFBaUIsQ0FDckMsSUFBaUIsRUFDakIsUUFBMkI7SUFFM0IsTUFBTSxHQUFHLEdBQUcsSUFBQSxZQUFZLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFBLG9CQUFjLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFORCxvQ0FNQyJ9