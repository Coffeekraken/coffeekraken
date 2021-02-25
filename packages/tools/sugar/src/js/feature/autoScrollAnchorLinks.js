// @ts-nocheck
import __easing from '../easing/easeInOutQuint';
import querySelectorLive from './querySelectorLive';
import urlParse from 'url-parse';
import scrollTo from './scrollTo';
/**
 * @name        autoScrollAnchorLinks
 * @namespace           sugar.js.feature
 * @type      Function
 * @stable
 *
 * Listen for links contains an hash to init them for scroll to target on click
 *
 * @param    {Integer}    [duration=500]    The scroll duration in ms
 * @param    {Integer}    [offset=0]    A scroll offset to apply
 * @param    {Function}    [easing=__easing]    An easing function used to scroll
 * @param    {Boolean}    [checkPathnames=true]    Specify if need to check the pathnames correspondance or not
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example    js
 * import autoScrollAnchorLinks from '@coffeekraken/sugar/js/autoScrollAnchorLinks'
 * autoScrollAnchorLinks()
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoScrollAnchorLinks(duration = 500, offset = 0, easing = __easing, checkPathnames = true) {
    querySelectorLive('a:not([is])[href*="#"]', ($link) => {
        // listen for click
        $link.addEventListener('click', (e) => {
            // get the hash
            const linkUrl = urlParse($link.getAttribute('href'));
            const currentUrl = urlParse();
            // chack that we have an hash
            if (!linkUrl.hash || linkUrl.hash === '#')
                return;
            // if it's not the same pathname between the current url and the link one,
            // we do nothing and we let the link behave as he want
            if (checkPathnames && currentUrl.pathname !== linkUrl.pathname)
                return;
            // try to get the target from the hash
            const $target = document.querySelector(linkUrl.hash);
            // if we don't have any target, let the link behave as he wants
            if (!$target)
                return;
            // preventing the link to behave as he wants
            e.preventDefault();
            // append the hash to the history in the url
            history.pushState({}, null, linkUrl.hash);
            // all seems to be good, we can scroll to the target
            scrollTo($target, duration, easing || __easing, offset, 'top');
        });
    });
}
export default autoScrollAnchorLinks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1Njcm9sbEFuY2hvckxpbmtzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0b1Njcm9sbEFuY2hvckxpbmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRCxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxxQkFBcUIsQ0FDNUIsUUFBUSxHQUFHLEdBQUcsRUFDZCxNQUFNLEdBQUcsQ0FBQyxFQUNWLE1BQU0sR0FBRyxRQUFRLEVBQ2pCLGNBQWMsR0FBRyxJQUFJO0lBRXJCLGlCQUFpQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDcEQsbUJBQW1CO1FBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxlQUFlO1lBQ2YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUU5Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHO2dCQUFFLE9BQU87WUFFbEQsMEVBQTBFO1lBQzFFLHNEQUFzRDtZQUN0RCxJQUFJLGNBQWMsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRO2dCQUFFLE9BQU87WUFFdkUsc0NBQXNDO1lBQ3RDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJELCtEQUErRDtZQUMvRCxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBRXJCLDRDQUE0QztZQUM1QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsNENBQTRDO1lBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUMsb0RBQW9EO1lBQ3BELFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sSUFBSSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxxQkFBcUIsQ0FBQyJ9