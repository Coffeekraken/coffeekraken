"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        injectIframeContent
 * @namespace            js.dom.inject
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Inject some content into an iframe
 *
 * @param       {HTMLIFrameElement}        $iframe          The iframe element to inject content into
 * @param    {String}    html           The html to inject
 *
 * @snippet         __injectIframeContent($1, $2)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __injectIframeContent } from '@coffeekraken/sugar/dom'
 *  __injectIframeContent($myIframe, '<html>...</html>');
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __injectIframeContent($iframe, html) {
    // let isInDocument = true;
    // if (!$iframe.parentElement) {
    //     isInDocument = false;
    //     document.body.appendChild($iframe);
    // }
    // $iframe.src = 'about:blank';
    $iframe.contentWindow.document.open();
    $iframe.contentWindow.document.write(html);
    $iframe.contentWindow.document.close();
    // if (!isInDocument) {
    //     // $iframe.remove();
    // }
}
exports.default = __injectIframeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixxQkFBcUIsQ0FDekMsT0FBMEIsRUFDMUIsSUFBWTtJQUVaLDJCQUEyQjtJQUMzQixnQ0FBZ0M7SUFDaEMsNEJBQTRCO0lBQzVCLDBDQUEwQztJQUMxQyxJQUFJO0lBQ0osK0JBQStCO0lBQy9CLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2Qyx1QkFBdUI7SUFDdkIsMkJBQTJCO0lBQzNCLElBQUk7QUFDUixDQUFDO0FBaEJELHdDQWdCQyJ9