"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name        injectScript
 * @namespace            js.dom.inject
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
 * import { __injectScript } from '@coffeekraken/sugar/dom'
 *  __injectScript('dist/js/app.js')
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __injectScript(src, $parent = document.body) {
    const $script = document.createElement('script');
    $script.src = src;
    $parent.appendChild($script);
    return (0, dom_1.__whenScriptLoaded)($script);
}
exports.default = __injectScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUE2RDtBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQXdCLGNBQWMsQ0FDbEMsR0FBVyxFQUNYLFVBQXVCLFFBQVEsQ0FBQyxJQUFJO0lBRXBDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixPQUFPLElBQUEsd0JBQWtCLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQVJELGlDQVFDIn0=