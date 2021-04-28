// @ts-nocheck
import __scrollTo from './scrollTo';
import __easeing from '../../shared/easing/easeInOutQuint';
/**
 * @name      scrollToLocationHash
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Scroll to the location hash if an hash is present.
 * This function will try to get the target element from the hash and scroll to it
 *
 * @param    {Integer}    [duration=500]    The scroll duration
 * @param    {Integer}    [offset=0]    A pixel value to offset the scroll with
 * @param    {Function}    [easing=__easeing]    An easing function to use to scroll
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import __scrollToLocationHash from '@coffeekraken/sugar/js/dom/scrollToLocationHash'
 * __scrollToLocationHash(500, 0)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
 */
function scrollToLocationHash(duration = 500, offset = 0, easing = __easeing) {
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
    __scrollTo(targetElm, duration, easing, offset, 'top');
}
export default scrollToLocationHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsVG9Mb2NhdGlvbkhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxUb0xvY2F0aW9uSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sU0FBUyxNQUFNLG9DQUFvQyxDQUFDO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsb0JBQW9CLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxTQUFTO0lBQzFFLHNDQUFzQztJQUN0QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVwQyxxQkFBcUI7SUFDckIsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPO0lBRWxCLHlDQUF5QztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLGlDQUFpQztJQUNqQyxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU87SUFFdkIsa0VBQWtFO0lBQ2xFLElBQUksbUJBQW1CLElBQUksT0FBTyxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7S0FDdEM7SUFFRCxtQkFBbUI7SUFDbkIsVUFBVSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBQ0QsZUFBZSxvQkFBb0IsQ0FBQyJ9