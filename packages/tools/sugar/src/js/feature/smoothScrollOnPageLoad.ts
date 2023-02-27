// @ts-nocheck
import { __scrollToLocationHash } from '@coffeekraken/sugar/dom';
import __deepMerge from '../../shared/object/deepMerge';
import type { IScrollToSettings } from '../dom/scroll/scrollTo';

/**
 * @name        smoothScrollOnPageLoad
 * @namespace            js.feature
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * This feature simply allow a snooth scroll on page load if an hash exists in the url
 *
 * @setting    {IScrollToSettings}            [scroll={}]       Some scroll settings that you can check on the sugar.dom.scroll.scrollTo function
 *
 * @param     {ISmoothScrollOnPageLoadSettings}    [settings={}]     Some settings to tweak the smooth scroll behavior
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __smoothScrollOnPageLoad()
 *
 * @example    js
 * import { __smoothScrollOnPageLoad } from '@coffeekraken/sugar/feature'
 * __smoothScrollOnPageLoad();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISmoothScrollOnPageLoadSettings {
    scroll: Partial<IScrollToSettings>;
}

export default function __smoothScrollOnPageLoad(
    settings: Partial<ISmoothScrollOnPageLoadSettings> = {},
): void {
    settings = __deepMerge(
        {
            scroll: {},
        },
        settings,
    );

    __scrollToLocationHash(settings);
}
