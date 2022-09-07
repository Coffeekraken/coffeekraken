// @ts-nocheck
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import urlParse from 'url-parse';
import scrollTo from '../dom/scroll/scrollTo';
import __deepMerge from '../../shared/object/deepMerge';
function smoothScrollOnAnchorLinks(settings = {}) {
    settings = __deepMerge({
        scroll: {},
        checkPathNames: true,
    }, settings);
    __querySelectorLive('a:not([is])[href*="#"]', ($link) => {
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
            if (settings.checkPathNames &&
                currentUrl.pathname !== linkUrl.pathname)
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
            scrollTo($target, settings.scroll);
        });
    });
}
export default smoothScrollOnAnchorLinks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFFakMsT0FBTyxRQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFnQ3hELFNBQVMseUJBQXlCLENBQzlCLFdBQXdELEVBQUU7SUFFMUQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtRQUNWLGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixtQkFBbUIsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3BELG1CQUFtQjtRQUNuQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsZUFBZTtZQUNmLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxVQUFVLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFFOUIsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssR0FBRztnQkFBRSxPQUFPO1lBRWxELDBFQUEwRTtZQUMxRSxzREFBc0Q7WUFDdEQsSUFDSSxRQUFRLENBQUMsY0FBYztnQkFDdkIsVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUTtnQkFFeEMsT0FBTztZQUVYLHNDQUFzQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyRCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUVyQiw0Q0FBNEM7WUFDNUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRW5CLDRDQUE0QztZQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFDLG9EQUFvRDtZQUNwRCxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUseUJBQXlCLENBQUMifQ==