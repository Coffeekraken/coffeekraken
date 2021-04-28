// @ts-nocheck
import querySelectorLive from '../dom/querySelectorLive';
import scrollTo from '../dom/scrollTo';
import easeInOutQuint from '../../shared/easing/easeInOutQuint';
/**
 * @name 		linksScrollHrefAttribute
 * @namespace            js.feature
 * @type      Feature
 * @stable
 *
 * Add the ability to set links href attribute with "scroll:#target" in order to animate the scroll to this target element
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Number}       [duration=400]       Specify the scroll duration
 * @setting       {Function}      [easing=easeInOutQuint]     Specify the easing function to use
 *
 * @todo        interface
 * @todo        doc
 * @todo        tests
 *
 * @example     js
 * import linksScrollHrefAttribute from '@coffeekraken/sugar/js/feature/linksScrollHrefAttribute';
 * linksScrollHrefAttribute();
 *
 * @example 	html
 * <a scroll href="#my-cool-element-id">Scroll to</a>
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function linksScrollHrefAttribute(settings = {}) {
    settings = Object.assign({ duration: 400, easing: easeInOutQuint }, settings);
    querySelectorLive('[href^="#"][scroll]', ($scrollElm) => {
        $scrollElm.addEventListener('click', (e) => {
            e.preventDefault();
            const $target = document.querySelector(`${$scrollElm.getAttribute('href')}`);
            if (!$target)
                return;
            scrollTo($target, settings.duration, settings.easing);
        });
    });
}
export default linksScrollHrefAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3NTY3JvbGxIcmVmQXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua3NTY3JvbGxIcmVmQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sY0FBYyxNQUFNLG9DQUFvQyxDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsd0JBQXdCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDN0MsUUFBUSxtQkFDTixRQUFRLEVBQUUsR0FBRyxFQUNiLE1BQU0sRUFBRSxjQUFjLElBQ25CLFFBQVEsQ0FDWixDQUFDO0lBQ0YsaUJBQWlCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUN0RCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNyQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUNyQixRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSx3QkFBd0IsQ0FBQyJ9