"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const url_parse_1 = __importDefault(require("url-parse"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function __smoothScrollOnAnchorLinks(settings = {}) {
    settings = (0, deepMerge_1.default)({
        scroll: {},
        checkPathNames: true,
    }, settings);
    (0, dom_1.__querySelectorLive)('a:not([is])[href*="#"]', ($link) => {
        // listen for click
        $link.addEventListener('click', (e) => {
            // get the hash
            const linkUrl = (0, url_parse_1.default)($link.getAttribute('href'));
            const currentUrl = (0, url_parse_1.default)();
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
            (0, dom_1.__scrollTo)($target, settings.scroll);
        });
    });
}
exports.default = __smoothScrollOnAnchorLinks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUEwRTtBQUMxRSwwREFBaUM7QUFDakMsOEVBQXdEO0FBbUN4RCxTQUF3QiwyQkFBMkIsQ0FDL0MsV0FBd0QsRUFBRTtJQUUxRCxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO1FBQ1YsY0FBYyxFQUFFLElBQUk7S0FDdkIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUEseUJBQW1CLEVBQUMsd0JBQXdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNwRCxtQkFBbUI7UUFDbkIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xDLGVBQWU7WUFDZixNQUFNLE9BQU8sR0FBRyxJQUFBLG1CQUFRLEVBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sVUFBVSxHQUFHLElBQUEsbUJBQVEsR0FBRSxDQUFDO1lBRTlCLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEdBQUc7Z0JBQUUsT0FBTztZQUVsRCwwRUFBMEU7WUFDMUUsc0RBQXNEO1lBQ3RELElBQ0ksUUFBUSxDQUFDLGNBQWM7Z0JBQ3ZCLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLFFBQVE7Z0JBRXhDLE9BQU87WUFFWCxzQ0FBc0M7WUFDdEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckQsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFFckIsNENBQTRDO1lBQzVDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUVuQiw0Q0FBNEM7WUFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxQyxvREFBb0Q7WUFDcEQsSUFBQSxnQkFBVSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUE3Q0QsOENBNkNDIn0=