// @ts-nocheck
import __scrollTo from './scrollTo';
import __deepMerge from '../../../shared/object/deepMerge';
function scrollToLocationHash(settings = {}) {
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
export default scrollToLocationHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG9Mb2NhdGlvbkhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUb0xvY2F0aW9uSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFpQyxNQUFNLFlBQVksQ0FBQztBQUUzRCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQWlDM0QsU0FBUyxvQkFBb0IsQ0FDekIsV0FBbUQsRUFBRTtJQUVyRCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLHNDQUFzQztJQUN0QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVwQyxxQkFBcUI7SUFDckIsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPO0lBRWxCLHlDQUF5QztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLGlDQUFpQztJQUNqQyxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU87SUFFdkIsa0VBQWtFO0lBQ2xFLElBQUksbUJBQW1CLElBQUksT0FBTyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7S0FDeEM7SUFFRCxtQkFBbUI7SUFDbkIsT0FBTyxVQUFVLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBQ0QsZUFBZSxvQkFBb0IsQ0FBQyJ9