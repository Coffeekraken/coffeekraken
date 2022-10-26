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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __injectIframeContent } from '@coffeekraken/sugar/dom'
 *  __injectIframeContent($myIframe, '<html>...</html>');
 *
 * @since     1.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IscUJBQXFCLENBQ3pDLE9BQTBCLEVBQzFCLElBQVk7SUFFWiwyQkFBMkI7SUFDM0IsZ0NBQWdDO0lBQ2hDLDRCQUE0QjtJQUM1QiwwQ0FBMEM7SUFDMUMsSUFBSTtJQUNKLCtCQUErQjtJQUMvQixPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkMsdUJBQXVCO0lBQ3ZCLDJCQUEyQjtJQUMzQixJQUFJO0FBQ1IsQ0FBQztBQWhCRCx3Q0FnQkMifQ==