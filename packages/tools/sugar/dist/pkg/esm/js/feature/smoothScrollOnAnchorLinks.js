// @ts-nocheck
import __querySelectorLive from '../dom/query/querySelectorLive.js';
import __scrollTo from '../dom/scroll/scrollTo.js';
import urlParse from 'url-parse';
import __deepMerge from '../../shared/object/deepMerge.js';
export default function __smoothScrollOnAnchorLinks(settings = {}) {
    var _a, _b, _c;
    settings = __deepMerge({
        scroll: {},
        checkPathNames: true,
    }, settings);
    if ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) {
        settings.scroll = Object.assign({
            duration: document.env.SUGAR.theme.get('scroll').duration,
            delay: document.env.SUGAR.theme.get('scroll').delay,
            offsetX: document.env.SUGAR.theme.get('scroll').offsetX,
            offsetY: document.env.SUGAR.theme.get('scroll').offsetY,
        }, ((_c = settings.scroll) !== null && _c !== void 0 ? _c : {}));
    }
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
            // append the hash to the history in the url
            history.pushState({}, null, linkUrl.hash);
            // all seems to be good, we can scroll to the target
            setTimeout(() => {
                __scrollTo($target, settings.scroll);
            }, (_a = settings.scroll.delay) !== null && _a !== void 0 ? _a : 0);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLG1CQUFtQixNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sVUFBVSxNQUFNLDJCQUEyQixDQUFDO0FBRW5ELE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQW1DM0QsTUFBTSxDQUFDLE9BQU8sVUFBVSwyQkFBMkIsQ0FDL0MsV0FBd0QsRUFBRTs7SUFFMUQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtRQUNWLGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssRUFBRTtRQUM1QixRQUFRLENBQUMsTUFBTSxpQkFDUjtZQUNDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVE7WUFDekQsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSztZQUNuRCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPO1lBQ3ZELE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU87U0FDMUQsRUFDRSxDQUFDLE1BQUEsUUFBUSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDLENBQzdCLENBQUM7S0FDTDtJQUVELG1CQUFtQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDcEQsbUJBQW1CO1FBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7WUFDbEMsZUFBZTtZQUNmLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxVQUFVLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFFOUIsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssR0FBRztnQkFBRSxPQUFPO1lBRWxELDBFQUEwRTtZQUMxRSxzREFBc0Q7WUFDdEQsSUFDSSxRQUFRLENBQUMsY0FBYztnQkFDdkIsVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUTtnQkFFeEMsT0FBTztZQUVYLHNDQUFzQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyRCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUVyQiw0Q0FBNEM7WUFDNUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRW5CLDRDQUE0QztZQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFDLG9EQUFvRDtZQUNwRCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxNQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9