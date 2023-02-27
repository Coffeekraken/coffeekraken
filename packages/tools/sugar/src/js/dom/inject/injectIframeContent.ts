// @ts-nocheck

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
export default function __injectIframeContent(
    $iframe: HTMLIFrameElement,
    html: string,
): void {
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
