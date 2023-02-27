// @ts-nocheck
import { __scrollTo } from '@coffeekraken/sugar/dom';
import __deepMerge from '../../../shared/object/deepMerge';
export default function __scrollToLocationHash(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    // check if we have an hash in the url
    const hash = document.location.hash;
    // if not, do nothing
    if (!hash)
        return;
    // try to get the hash target in the page
    const targetElm = document.querySelector(hash);
    // if no target found, do nothing
    if (!targetElm)
        return;
    // tell the browser that we handle the scroll restoration manually
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    // scroll to target
    return __scrollTo(targetElm, settings.scroll);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFvQzNELE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQzFDLFdBQW1ELEVBQUU7SUFFckQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixzQ0FBc0M7SUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFcEMscUJBQXFCO0lBQ3JCLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTztJQUVsQix5Q0FBeUM7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUvQyxpQ0FBaUM7SUFDakMsSUFBSSxDQUFDLFNBQVM7UUFBRSxPQUFPO0lBRXZCLGtFQUFrRTtJQUNsRSxJQUFJLG1CQUFtQixJQUFJLE9BQU8sRUFBRTtRQUNoQyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0tBQ3hDO0lBRUQsbUJBQW1CO0lBQ25CLE9BQU8sVUFBVSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9