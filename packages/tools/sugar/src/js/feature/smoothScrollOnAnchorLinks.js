// @ts-nocheck
import querySelectorLive from '../dom/query/querySelectorLive';
import urlParse from 'url-parse';
import scrollTo from '../dom/scroll/scrollTo';
import __deepMerge from '../../shared/object/deepMerge';
function smoothScrollOnAnchorLinks(settings = {}) {
    settings = __deepMerge({
        scroll: {},
        checkPathNames: true,
    }, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21vb3RoU2Nyb2xsT25BbmNob3JMaW5rcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNtb290aFNjcm9sbE9uQW5jaG9yTGlua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUdkLE9BQU8saUJBQWlCLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sUUFBK0IsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRSxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQWdDeEQsU0FBUyx5QkFBeUIsQ0FDOUIsV0FBd0QsRUFBRTtJQUUxRCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO1FBQ1YsY0FBYyxFQUFFLElBQUk7S0FDdkIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLGlCQUFpQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDbEQsbUJBQW1CO1FBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNsQyxlQUFlO1lBQ2YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUU5Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHO2dCQUFFLE9BQU87WUFFbEQsMEVBQTBFO1lBQzFFLHNEQUFzRDtZQUN0RCxJQUNJLFFBQVEsQ0FBQyxjQUFjO2dCQUN2QixVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRO2dCQUV4QyxPQUFPO1lBRVgsc0NBQXNDO1lBQ3RDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJELCtEQUErRDtZQUMvRCxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBRXJCLDRDQUE0QztZQUM1QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsNENBQTRDO1lBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUMsb0RBQW9EO1lBQ3BELFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSx5QkFBeUIsQ0FBQyJ9