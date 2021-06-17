// @ts-nocheck
import __scrollTo from './scrollTo';
import __deepMerge from '../../../shared/object/deepMerge';
function scrollToLocationHash(settings = {}) {
    settings = __deepMerge({
        scroll: {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG9Mb2NhdGlvbkhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUb0xvY2F0aW9uSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFpQyxNQUFNLFlBQVksQ0FBQztBQUUzRCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQWlDM0QsU0FBUyxvQkFBb0IsQ0FBQyxXQUFtRCxFQUFFO0lBRWpGLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDckIsTUFBTSxFQUFFLEVBQUU7S0FDWCxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWIsc0NBQXNDO0lBQ3RDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRXBDLHFCQUFxQjtJQUNyQixJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFbEIseUNBQXlDO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFL0MsaUNBQWlDO0lBQ2pDLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTztJQUV2QixrRUFBa0U7SUFDbEUsSUFBSSxtQkFBbUIsSUFBSSxPQUFPLEVBQUU7UUFDbEMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztLQUN0QztJQUVELG1CQUFtQjtJQUNuQixPQUFPLFVBQVUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFDRCxlQUFlLG9CQUFvQixDQUFDIn0=