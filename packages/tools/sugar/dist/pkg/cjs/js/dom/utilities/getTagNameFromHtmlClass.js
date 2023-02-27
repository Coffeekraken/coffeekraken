"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const htmlTagToHtmlClassMap_1 = __importDefault(require("./htmlTagToHtmlClassMap"));
/**
 * @name            getHtmlhtmlClassFromHtmlClass
 * @namespace            js.dom.utils
 * @type            Function
 * @platform          js
 * @status        beta
 *
 * This function simply return the tagname depending on the passed HTML class
 * like HTMLAnchorElement, HTMLLinkElement, etc...
 *
 * @param       {HTMLElement}      htmlClass       The htmlClass to get the tag for
 * @return      {String}               The tagname that correspond to the passed HTMLElement class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getTagNameFromHtmlClass($1)
 *
 * @example       js
 * import { __getTagNameFromHtmlClass } from '@coffeekraken/sugar/dom';
 * __getTagNameFromHtmlClass(HTMLAnchorElement); // => 'a'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __getTagNameFromHtmlClass(htmlClass) {
    if (!htmlClass)
        return false;
    for (const key in htmlTagToHtmlClassMap_1.default) {
        if (htmlTagToHtmlClassMap_1.default[key] === htmlClass)
            return key;
    }
    return false;
}
exports.default = __getTagNameFromHtmlClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUE4RDtBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQXdCLHlCQUF5QixDQUM3QyxTQUFzQjtJQUV0QixJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTdCLEtBQUssTUFBTSxHQUFHLElBQUksK0JBQXVCLEVBQUU7UUFDdkMsSUFBSSwrQkFBdUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUM7S0FDOUQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBVkQsNENBVUMifQ==