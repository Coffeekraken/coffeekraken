// @ts-nocheck
import { __querySelectorLive, __scrollTo } from '@coffeekraken/sugar/dom';
import urlParse from 'url-parse';
import __deepMerge from '../../shared/object/deepMerge';
export default function __smoothScrollOnAnchorLinks(settings = {}) {
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
            __scrollTo($target, settings.scroll);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUUsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBRWpDLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBZ0N4RCxNQUFNLENBQUMsT0FBTyxVQUFVLDJCQUEyQixDQUMvQyxXQUF3RCxFQUFFO0lBRTFELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7UUFDVixjQUFjLEVBQUUsSUFBSTtLQUN2QixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsbUJBQW1CLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNwRCxtQkFBbUI7UUFDbkIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xDLGVBQWU7WUFDZixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sVUFBVSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBRTlCLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEdBQUc7Z0JBQUUsT0FBTztZQUVsRCwwRUFBMEU7WUFDMUUsc0RBQXNEO1lBQ3RELElBQ0ksUUFBUSxDQUFDLGNBQWM7Z0JBQ3ZCLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLFFBQVE7Z0JBRXhDLE9BQU87WUFFWCxzQ0FBc0M7WUFDdEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckQsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFFckIsNENBQTRDO1lBQzVDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUVuQiw0Q0FBNEM7WUFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxQyxvREFBb0Q7WUFDcEQsVUFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==