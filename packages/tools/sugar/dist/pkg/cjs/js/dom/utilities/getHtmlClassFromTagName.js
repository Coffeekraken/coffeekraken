"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = __importDefault(require("../../../shared/string/upperFirst"));
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name            getHtmlClassFromTagName
 * @namespace            js.dom.utils
 * @type            Function
 * @platform          js
 * @status        beta
 *
 * This function simply return the HTML{name}Element class depending on the passed
 * tag name like "p", "input", "textarea", etc...
 *
 * @param       {String}      tagName       The tagName to get the class for
 * @return      {HTMLElement}               The HTMLElement class that correspond to the requested tag name
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __getHtmlClassFromTagName } from '@coffeekraken/sugar/dom';
 *  __getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __getHtmlClassFromTagName(tagName) {
    if (!tagName)
        return HTMLElement;
    const tagNameUpperFirst = (0, upperFirst_1.default)(tagName);
    if (window[`HTML${tagNameUpperFirst}Element`])
        return window[`HTML${tagNameUpperFirst}Element`];
    if (dom_1.__htmlTagToHtmlClassMap[tagName])
        return dom_1.__htmlTagToHtmlClassMap[tagName];
    return window.HTMLElement;
}
exports.default = __getHtmlClassFromTagName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG1GQUE2RDtBQUM3RCxpREFBa0U7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IseUJBQXlCLENBQzdDLE9BQWU7SUFFZixJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sV0FBVyxDQUFDO0lBRWpDLE1BQU0saUJBQWlCLEdBQUcsSUFBQSxvQkFBWSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELElBQUksTUFBTSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsQ0FBQztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxPQUFPLGlCQUFpQixTQUFTLENBQUMsQ0FBQztJQUVyRCxJQUFJLDZCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUNoQyxPQUFPLDZCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUM5QixDQUFDO0FBYkQsNENBYUMifQ==