"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const upperFirst_1 = __importDefault(require("../../../shared/string/upperFirst"));
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
 * @snippet         __getHtmlClassFromTagName($1)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUFrRTtBQUNsRSxtRkFBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUF3Qix5QkFBeUIsQ0FDN0MsT0FBZTtJQUVmLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxXQUFXLENBQUM7SUFFakMsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLG9CQUFZLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxNQUFNLENBQUMsT0FBTyxpQkFBaUIsU0FBUyxDQUFDO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsQ0FBQyxDQUFDO0lBRXJELElBQUksNkJBQXVCLENBQUMsT0FBTyxDQUFDO1FBQ2hDLE9BQU8sNkJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzlCLENBQUM7QUFiRCw0Q0FhQyJ9