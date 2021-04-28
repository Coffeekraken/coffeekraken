// @ts-nocheck
import whenInViewport from '../dom/whenInViewport';
import querySelectorLive from '../dom/querySelectorLive';
import deepMerge from '../../shared/object/deepMerge';
/**
 * @name 		imagesLazySrcAttribute
 * @namespace            js.feature
 * @type      Feature
 * @stable
 *
 * Add support for the `lazy-src` attribute on `img` elements.
 * The video `src` attribute will be populated when the `img` element enter the viewport
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example       js
 * import imagesLazySrcAttribute from '@coffeekraken/sugar/js/feature/imagesLazySrcAttribute';
 * imagesLazySrcAttribute();
 *
 * @example    html
 * <img lazy-src="my-cool-image.jpg" />
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function imagesLazySrcAttribute(settings = {}) {
    settings = deepMerge({
        offset: 50
    }, settings);
    querySelectorLive('img[lazy-src]:not([is])', ($imgElm) => {
        whenInViewport($imgElm, settings.offset).then(() => {
            $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
        });
    });
}
export default imagesLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxTQUFTLE1BQU0sK0JBQStCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUMzQyxRQUFRLEdBQUcsU0FBUyxDQUNsQjtRQUNFLE1BQU0sRUFBRSxFQUFFO0tBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNGLGlCQUFpQixDQUFDLHlCQUF5QixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDdkQsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRCxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLHNCQUFzQixDQUFDIn0=