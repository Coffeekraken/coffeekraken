"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name        closestScrollable
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three to find the first element that is scrollable.
 * The default scrollable element is the body
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __closestScrollable } from '@coffeekraken/sugar/dom';
 * __closestScrollable($myElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __closestScrollable($elm, selector) {
    const res = (0, dom_1.__traverseUp)($elm, ($e) => (0, dom_1.__isScrollable)($e));
    return res;
}
exports.default = __closestScrollable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsY0FBYztBQUNkLGlEQUF1RTtBQUV2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUF3QixtQkFBbUIsQ0FDdkMsSUFBaUIsRUFDakIsUUFBMkI7SUFFM0IsTUFBTSxHQUFHLEdBQUcsSUFBQSxrQkFBWSxFQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBQSxvQkFBYyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBTkQsc0NBTUMifQ==