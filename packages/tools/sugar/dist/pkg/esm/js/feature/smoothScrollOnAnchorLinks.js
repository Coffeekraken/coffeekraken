// @ts-nocheck
import __querySelectorLive from '../dom/query/querySelectorLive.js';
import __scrollTo from '../dom/scroll/scrollTo.js';
import urlParse from 'url-parse';
import __deepMerge from '../../shared/object/deepMerge.js';
export default function __smoothScrollOnAnchorLinks(settings = {}) {
    var _a, _b, _c, _d, _e, _f;
    settings = __deepMerge({
        scroll: {
            delay: (_f = (_e = (_d = (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, 'scroll')) === null || _e === void 0 ? void 0 : _e.delay) !== null && _f !== void 0 ? _f : 0,
        },
        checkPathNames: true,
    }, settings);
    __querySelectorLive('a:not([is])[href*="#"]', ($link) => {
        // listen for click
        $link.addEventListener('click', (e) => {
            var _a;
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
            // all seems to be good, we can scroll to the target
            setTimeout(() => {
                __scrollTo($target, settings.scroll);
            }, (_a = settings.scroll.delay) !== null && _a !== void 0 ? _a : 0);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLG1CQUFtQixNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sVUFBVSxNQUFNLDJCQUEyQixDQUFDO0FBRW5ELE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQW1DM0QsTUFBTSxDQUFDLE9BQU8sVUFBVSwyQkFBMkIsQ0FDL0MsV0FBd0QsRUFBRTs7SUFFMUQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxLQUFLLDBDQUFFLEdBQUcsbURBQUcsUUFBUSxDQUFDLDBDQUFFLEtBQUssbUNBQUksQ0FBQztTQUNsRTtRQUNELGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixtQkFBbUIsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3BELG1CQUFtQjtRQUNuQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ2xDLGVBQWU7WUFDZixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sVUFBVSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBRTlCLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEdBQUc7Z0JBQUUsT0FBTztZQUVsRCwwRUFBMEU7WUFDMUUsc0RBQXNEO1lBQ3RELElBQ0ksUUFBUSxDQUFDLGNBQWM7Z0JBQ3ZCLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLFFBQVE7Z0JBRXhDLE9BQU87WUFFWCxzQ0FBc0M7WUFDdEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckQsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFFckIsNENBQTRDO1lBQzVDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUVuQixvREFBb0Q7WUFDcEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUUsTUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssbUNBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==