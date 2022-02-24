// @ts-nocheck

import __easing from '../../shared/easing/easeInOutQuint';
import querySelectorLive from '../dom/query/querySelectorLive';
import urlParse from 'url-parse';
import scrollTo, { IScrollToSettings } from '../dom/scroll/scrollTo';
import __deepMerge from '../../shared/object/deepMerge';

/**
 * @name        smoothScrollOnAnchorLinks
 * @namespace            js.feature
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Listen for links contains an hash to init them for scroll to target on click
 *
 * @setting    {IScrollToSettings}            [scroll={}]       Some scroll settings that you can check on the sugar.dom.scroll.scrollTo function
 *
 * @param     {ISmoothScrollOnAnchorLinksSettings}    [settings={}]     Some settings to tweak the smooth scroll behavior
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example    js
 * import smoothScrollOnAnchorLinks from '@coffeekraken/sugar/js/smoothScrollOnAnchorLinks'
 * smoothScrollOnAnchorLinks();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISmoothScrollOnAnchorLinksSettings {
    scroll: Partial<IScrollToSettings>;
    checkPathNames: boolean;
}

function smoothScrollOnAnchorLinks(
    settings: Partial<ISmoothScrollOnAnchorLinksSettings> = {},
): void {
    settings = __deepMerge(
        {
            scroll: {},
            checkPathNames: true,
        },
        settings,
    );

    querySelectorLive('a:not([is])[href*="#"]', ($link) => {
        // listen for click
        $link.addEventListener('click', (e) => {
            // get the hash
            const linkUrl = urlParse($link.getAttribute('href'));
            const currentUrl = urlParse();

            // chack that we have an hash
            if (!linkUrl.hash || linkUrl.hash === '#') return;

            // if it's not the same pathname between the current url and the link one,
            // we do nothing and we let the link behave as he want
            if (
                settings.checkPathNames &&
                currentUrl.pathname !== linkUrl.pathname
            )
                return;

            // try to get the target from the hash
            const $target = document.querySelector(linkUrl.hash);

            // if we don't have any target, let the link behave as he wants
            if (!$target) return;

            // preventing the link to behave as he wants
            e.preventDefault();

            // append the hash to the history in the url
            history.pushState({}, null, linkUrl.hash);

            // all seems to be good, we can scroll to the target
            scrollTo($target, settings.scroll);
        });
    });
}
export default smoothScrollOnAnchorLinks;
