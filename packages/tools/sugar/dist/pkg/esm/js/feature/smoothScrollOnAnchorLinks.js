// @ts-nocheck
import __querySelectorLive from '../dom/query/querySelectorLive';
import __scrollTo from '../dom/scroll/scrollTo';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLG1CQUFtQixNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sVUFBVSxNQUFNLHdCQUF3QixDQUFDO0FBRWhELE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQW1DeEQsTUFBTSxDQUFDLE9BQU8sVUFBVSwyQkFBMkIsQ0FDL0MsV0FBd0QsRUFBRTtJQUUxRCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO1FBQ1YsY0FBYyxFQUFFLElBQUk7S0FDdkIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLG1CQUFtQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDcEQsbUJBQW1CO1FBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNsQyxlQUFlO1lBQ2YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUU5Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHO2dCQUFFLE9BQU87WUFFbEQsMEVBQTBFO1lBQzFFLHNEQUFzRDtZQUN0RCxJQUNJLFFBQVEsQ0FBQyxjQUFjO2dCQUN2QixVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRO2dCQUV4QyxPQUFPO1lBRVgsc0NBQXNDO1lBQ3RDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJELCtEQUErRDtZQUMvRCxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBRXJCLDRDQUE0QztZQUM1QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsNENBQTRDO1lBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUMsb0RBQW9EO1lBQ3BELFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=