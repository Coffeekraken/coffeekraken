// @ts-nocheck
import __scrollTo from './scrollTo';
import __easeing from '../../shared/easing/easeInOutQuint';
function scrollToLocationHash(settings = {}) {
    settings = Object.assign({ duration: 500, offset: 0, easing: __easeing }, settings);
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
    return __scrollTo(targetElm, settings);
}
export default scrollToLocationHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG9Mb2NhdGlvbkhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUb0xvY2F0aW9uSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sU0FBUyxNQUFNLG9DQUFvQyxDQUFDO0FBcUMzRCxTQUFTLG9CQUFvQixDQUFDLFdBQW1ELEVBQUU7SUFFakYsUUFBUSxtQkFDTixRQUFRLEVBQUUsR0FBRyxFQUNiLE1BQU0sRUFBRSxDQUFDLEVBQ1QsTUFBTSxFQUFFLFNBQVMsSUFDZCxRQUFRLENBQ1osQ0FBQztJQUVGLHNDQUFzQztJQUN0QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVwQyxxQkFBcUI7SUFDckIsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPO0lBRWxCLHlDQUF5QztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLGlDQUFpQztJQUNqQyxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU87SUFFdkIsa0VBQWtFO0lBQ2xFLElBQUksbUJBQW1CLElBQUksT0FBTyxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7S0FDdEM7SUFFRCxtQkFBbUI7SUFDbkIsT0FBTyxVQUFVLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFDRCxlQUFlLG9CQUFvQixDQUFDIn0=