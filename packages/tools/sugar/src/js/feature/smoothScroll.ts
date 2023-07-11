// @ts-nocheck
import __deepMerge from '../../shared/object/deepMerge.js';
import type { IScrollToSettings } from '../dom/scroll/scrollTo.js';

import __smoothScrollOnAnchorLinks from './smoothScrollOnAnchorLinks.js';
import __smoothScrollOnHashChange from './smoothScrollOnHashChange.js';
import __smoothScrollOnPageLoad from './smoothScrollOnPageLoad.js';

/**
 * @name        smoothScroll
 * @namespace            js.feature
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * This feature enable some underhood features like the automatic scroll on anchor links as well as
 * the smooth scroll on page load.
 *
 * @feature         Smooth scroll on page load when an anchor is present in the url
 * @feature         Smooth scroll when clicking on an anchor link in the page
 *
 * @setting    {IScrollToSettings}            [scroll={}]       Some scroll settings that you can check on the sugar.dom.scroll.scrollTo function
 *
 * @param     {IsmoothScrollSettings}    [settings={}]     Some settings to tweak the smooth scroll behavior
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __smoothScroll()
 *
 * @example    js
 * import { __smoothScroll } from '@coffeekraken/sugar/feature'
 * __smoothScroll()
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IsmoothScrollSettings {
    scroll: Partial<IScrollToSettings>;
}

export default function __smoothScroll(
    settings: Partial<IsmoothScrollSettings> = {},
): void {
    settings = __deepMerge(
        {
            scroll: {},
        },
        settings,
    );

    __smoothScrollOnPageLoad(settings);
    __smoothScrollOnAnchorLinks(settings);
    __smoothScrollOnHashChange(settings);
}
