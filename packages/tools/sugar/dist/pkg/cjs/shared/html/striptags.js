"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const striptags_1 = __importDefault(require("striptags"));
/**
 * @name        stripTags
 * @namespace            shared.html
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Strip tags of an html string.
 * This is a simple wrapper of the nice "striptags" package that you can find here: https://www.npmjs.com/package/striptags
 *
 * @param    {String}    html    The html string to process
 * @param    {String}    allowedTags    The tags that are allowed like <h1><h2>...
 * @param     {String}    tagReplacement    A string with which you want to replace the tags
 * @return    {String}    The processed string without tags
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __stripTags($1)
 *
 * @example    js
 * import { __stripTags } from '@coffeekraken/sugar/html'
 * __stripTags('<p><span>Hello</span> world</p>', '<span>') // <span>Hello</span> world
 *
 * @see       https://www.npmjs.com/package/striptags
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stripTags(html, allowedTags = '', tagReplacement = '') {
    let res = (0, striptags_1.default)(html, allowedTags, tagReplacement);
    return res;
}
exports.default = stripTags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUF3QixTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRyxFQUFFLEVBQUUsY0FBYyxHQUFHLEVBQUU7SUFDekUsSUFBSSxHQUFHLEdBQUcsSUFBQSxtQkFBVyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDekQsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBSEQsNEJBR0MifQ==