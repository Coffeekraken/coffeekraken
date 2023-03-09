// @ts-nocheck

/**
 * @name      whenIframeReady
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status           beta
 * @async
 *
 * Wait until the passed iframe is ready to be used
 *
 * @param       {HTMLIframeElement}         $iframe          The iframe to wait on
 * @return 		{Promise<HTMLIframeElement>} 					A promise that will be resolved when an interaction has been made
 *
 * @snippet         __whenIframeReady($1)
 * __whenIframeReady($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __whenIframeReady } from '@coffeekraken/sugar/dom'
 * __whenIframeReady($myCoolIframe).then($iframe => {
 *      // do something...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenIframeReadySettings {}

export default function __whenIframeReady(
    $iframe: HTMLIFrameElement,
    settings?: Partial<IWhenIframeReadySettings>,
): Promise<any> {
    return new Promise((resolve) => {
        if ($iframe.contentWindow?.document?.body) {
            return resolve($iframe);
        }
        let int = setInterval(() => {
            if ($iframe.contentWindow?.document?.body) {
                clearInterval(int);
                resolve(null);
            }
        }, 10);
    });
}
