// @ts-nocheck

import __scrollTo from './scrollTo.js';

import __deepMerge from '../../../shared/object/deepMerge.js';
import type { IScrollToSettings } from './scrollTo.js';

/**
 * @name      scrollToLocationHash
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Scroll to the location hash if an hash is present.
 * This function will try to get the target element from the hash and scroll to it
 *
 * @setting    {IScrollToSettings}            [scroll={}]       Some scroll settings that you can check on the sugar.dom.scroll.scrollTo function
 *
 * @param       {IScrollToLocationHashSettings}       [settings={}]       Some settings to tweak the scroll behavior
 * @return      {Promise}                     A promise resolved once the scroll has ended
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __scrollToLocationHash()
 *
 * @example 	js
 * import { __scrollToLocationHash } from '@coffeekraken/sugar/dom'
 * __scrollToLocationHash(500, 0)
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) (https://olivierbossel.com)
 */

export interface IScrollToLocationHashSettings {
    scroll: Partial<IScrollToSettings>;
}

export default function __scrollToLocationHash(
    settings: Partial<IScrollToLocationHashSettings> = {},
): Promise<any> {
    settings = __deepMerge(
        {
            scroll: {},
        },
        settings,
    );

    // check if we have an hash in the url
    const hash = document.location.hash;

    // if not, do nothing
    if (!hash) return;

    // try to get the hash target in the page
    const targetElm = document.querySelector(hash);

    // if no target found, do nothing
    if (!targetElm) return;

    // tell the browser that we handle the scroll restoration manually
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // scroll to target
    return __scrollTo(targetElm, settings.scroll);
}
