"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const up_1 = __importDefault(require("../traverse/up"));
const scrollable_1 = __importDefault(require("../is/scrollable"));
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
    return (0, up_1.default)($elm, ($e) => (0, scrollable_1.default)($e));
}
exports.default = closestScrollable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHdEQUEwQztBQUMxQyxrRUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixpQkFBaUIsQ0FBQyxJQUFpQixFQUFFLFFBQTJCO0lBQ3BGLE9BQU8sSUFBQSxZQUFZLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFBLG9CQUFjLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRkQsb0NBRUMifQ==