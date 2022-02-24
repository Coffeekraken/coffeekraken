// @ts-nocheck
import { IScrollToSettings } from '../dom/scroll/scrollTo';
import __smoothScrollOnAnchorLinks from './smoothScrollOnAnchorLinks';
import __smoothScrollOnPageLoad from './smoothScrollOnPageLoad';
import __smoothScrollOnHashChange from './smoothScrollOnHashChange';
import __deepMerge from '../../shared/object/deepMerge';

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
 * @example    js
 * import smoothScroll from '@coffeekraken/sugar/js/smoothScroll'
 * smoothScroll()
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IsmoothScrollSettings {
    scroll: Partial<IScrollToSettings>;
}

function smoothScroll(settings: Partial<IsmoothScrollSettings> = {}): void {
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
export default smoothScroll;
