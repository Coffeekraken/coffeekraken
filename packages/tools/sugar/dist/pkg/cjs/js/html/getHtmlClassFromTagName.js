"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = __importDefault(require("../../shared/string/upperFirst"));
const htmlTagToHtmlClassMap_1 = __importDefault(require("./htmlTagToHtmlClassMap"));
/**
 * @name            getHtmlClassFromTagName
 * @namespace            js.html
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
 * import getHtmlClassFromTagName from '@coffeekraken/sugar/js/html/getHtmlClassFromTagName';
 * getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getHtmlClassFromTagName(tagName) {
    if (!tagName)
        return HTMLElement;
    const tagNameUpperFirst = (0, upperFirst_1.default)(tagName);
    if (window[`HTML${tagNameUpperFirst}Element`])
        return window[`HTML${tagNameUpperFirst}Element`];
    if (htmlTagToHtmlClassMap_1.default[tagName])
        return htmlTagToHtmlClassMap_1.default[tagName];
    return window.HTMLElement;
}
exports.default = getHtmlClassFromTagName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdGQUEwRDtBQUMxRCxvRkFBOEQ7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyx1QkFBdUIsQ0FBQyxPQUFlO0lBQzVDLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxXQUFXLENBQUM7SUFFakMsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLG9CQUFZLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxNQUFNLENBQUMsT0FBTyxpQkFBaUIsU0FBUyxDQUFDO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsQ0FBQyxDQUFDO0lBRXJELElBQUksK0JBQXVCLENBQUMsT0FBTyxDQUFDO1FBQ2hDLE9BQU8sK0JBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzlCLENBQUM7QUFDRCxrQkFBZSx1QkFBdUIsQ0FBQyJ9