// @ts-nocheck
import __scrollTo from './scrollTo.js';
import __deepMerge from '../../../shared/object/deepMerge.js';
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
    let targetElm;
    try {
        targetElm = document.querySelector(hash);
    }
    catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxXQUFXLE1BQU0scUNBQXFDLENBQUM7QUFvQzlELE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQzFDLFdBQW1ELEVBQUU7SUFFckQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixzQ0FBc0M7SUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFcEMscUJBQXFCO0lBQ3JCLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTztJQUVsQix5Q0FBeUM7SUFDekMsSUFBSSxTQUFTLENBQUM7SUFDZCxJQUFJO1FBQ0EsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUM7SUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBRWQsaUNBQWlDO0lBQ2pDLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTztJQUV2QixrRUFBa0U7SUFDbEUsSUFBSSxtQkFBbUIsSUFBSSxPQUFPLEVBQUU7UUFDaEMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztLQUN4QztJQUVELG1CQUFtQjtJQUNuQixPQUFPLFVBQVUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUMifQ==