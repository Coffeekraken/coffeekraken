// @ts-nocheck
import querySelectorLive from '../dom/query/querySelectorLive';
import urlParse from 'url-parse';
import scrollTo from '../dom/scroll/scrollTo';
import __deepMerge from '../../shared/object/deepMerge';
function smoothScrollOnAnchorLinks(settings = {}) {
    settings = __deepMerge({
        scroll: {},
        checkPathNames: true
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
            if (settings.checkPathNames && currentUrl.pathname !== linkUrl.pathname)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21vb3RoU2Nyb2xsT25BbmNob3JMaW5rcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNtb290aFNjcm9sbE9uQW5jaG9yTGlua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUdkLE9BQU8saUJBQWlCLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sUUFBK0IsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRSxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQWdDeEQsU0FBUyx5QkFBeUIsQ0FDaEMsV0FBd0QsRUFBRTtJQUcxRCxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsY0FBYyxFQUFFLElBQUk7S0FDckIsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUViLGlCQUFpQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDcEQsbUJBQW1CO1FBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxlQUFlO1lBQ2YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUU5Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHO2dCQUFFLE9BQU87WUFFbEQsMEVBQTBFO1lBQzFFLHNEQUFzRDtZQUN0RCxJQUFJLFFBQVEsQ0FBQyxjQUFjLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUTtnQkFBRSxPQUFPO1lBRWhGLHNDQUFzQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyRCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUVyQiw0Q0FBNEM7WUFDNUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRW5CLDRDQUE0QztZQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFDLG9EQUFvRDtZQUNwRCxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUseUJBQXlCLENBQUMifQ==