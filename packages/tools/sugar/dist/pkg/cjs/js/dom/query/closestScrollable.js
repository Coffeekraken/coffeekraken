"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const dom_1 = require("@coffeekraken/sugar/dom");
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
 * import { __closestScrollable } from '@coffeekraken/sugar/dom';
 * __closestScrollable($myElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __closestScrollable($elm, selector) {
    const res = (0, up_1.default)($elm, ($e) => (0, dom_1.__isScrollable)($e));
    return res;
}
exports.default = __closestScrollable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLGlEQUF5RDtBQUN6RCx3REFBMEM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixtQkFBbUIsQ0FDdkMsSUFBaUIsRUFDakIsUUFBMkI7SUFFM0IsTUFBTSxHQUFHLEdBQUcsSUFBQSxZQUFZLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFBLG9CQUFjLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFORCxzQ0FNQyJ9