// @ts-nocheck
import __scrollToLocationHash from '../dom/scroll/scrollToLocationHash.js';

import __deepMerge from '../../shared/object/deepMerge.js';
import type { IScrollToSettings } from '../dom/scroll/scrollTo.js';

/**
 * @name        smoothScrollOnHashChange
 * @namespace            js.feature
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * This feature simply allow a snooth scroll on hash changes
 *
 * @setting    {IScrollToSettings}            [scroll={}]       Some scroll settings that you can check on the sugar.dom.scroll.scrollTo function
 *
 * @param     {ISmoothScrollOnHashChangeSettings}    [settings={}]     Some settings to tweak the smooth scroll behavior
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __smoothScrollOnHashChange()
 *
 * @example    js
 * import { __smoothScrollOnHashChange } from '@coffeekraken/sugar/feature'
 * __smoothScrollOnHashChange();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISmoothScrollOnHashChangeSettings {
    scroll: Partial<IScrollToSettings>;
}

export default function __smoothScrollOnHashChange(
    settings: Partial<ISmoothScrollOnHashChangeSettings> = {},
): void {
    settings = __deepMerge(
        {
            scroll: {},
        },
        settings,
    );

    window.addEventListener('hashchange', (e) => {
        __scrollToLocationHash(settings);
    });
}
