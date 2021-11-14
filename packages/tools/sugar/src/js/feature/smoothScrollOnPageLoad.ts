// @ts-nocheck
import { IScrollToSettings } from '../dom/scroll/scrollTo';
import __scrollToLocationHash from '../dom/scroll/scrollToLocationHash';
import __deepMerge from '../../shared/object/deepMerge';

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
 * @example    js
 * import smoothScrollOnPageLoad from '@coffeekraken/sugar/js/smoothScrollOnPageLoad'
 * smoothScrollOnPageLoad();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISmoothScrollOnPageLoadSettings {
    scroll: Partial<IScrollToSettings>;
}

function smoothScrollOnPageLoad(
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
export default smoothScrollOnPageLoad;
