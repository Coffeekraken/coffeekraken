"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scriptLoaded_1 = __importDefault(require("../scriptLoaded"));
/**
 * @name        appendScriptTag
 * @namespace            js.dom.tag
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Append a script tag either to the head or the body
 *
 * @param    {String}    src    The script src to load
 * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag'
 * appendScriptTag('dist/js/app.js')
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function appendScriptTag(src, $parent = document.body) {
    const $script = document.createElement('script');
    $script.src = src;
    $parent.appendChild($script);
    return (0, scriptLoaded_1.default)($script);
}
exports.default = appendScriptTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG1FQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsZUFBZSxDQUNwQixHQUFXLEVBQ1gsVUFBdUIsUUFBUSxDQUFDLElBQUk7SUFFcEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNsQixPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLE9BQU8sSUFBQSxzQkFBWSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFDRCxrQkFBZSxlQUFlLENBQUMifQ==