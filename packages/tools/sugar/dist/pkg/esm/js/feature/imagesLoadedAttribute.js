// @ts-nocheck
import __fastdom from 'fastdom';
import __whenImageLoaded from '../dom/detect/whenImageLoaded.js';
/**
 * @name 		imagesLoadedAttribute
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add on every images the attribute "loaded" when it has been fully loaded. This is useful
 * for styling purposes and for others thinks as well.
 *
 * @param     {Object}        [settings={}]       An object of settings to configure your feature
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __imagesLoadedAttribute()
 *
 * @example 	js
 * import { __imagesLoadedAttribute } from '@coffeekraken/sugar/feature';
 *  __imagesLoadedAttribute();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __imagesLoadedAttribute() {
    document.addEventListener('load', (e) => {
        if (!e.target.tagName)
            return;
        if (e.target.tagName.toLowerCase() !== 'img')
            return;
        if (e.target.hasAttribute('loaded'))
            return;
        e.target.setAttribute('loaded', true);
    }, true);
    [].forEach.call(document.querySelectorAll('img'), (img) => {
        __whenImageLoaded(img).then((img) => {
            __fastdom.mutate(() => {
                if (img.hasAttribute('loaded'))
                    return;
                img.setAttribute('loaded', true);
            });
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxpQkFBaUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUVqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUI7SUFDM0MsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixNQUFNLEVBQ04sQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBQzlCLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSztZQUFFLE9BQU87UUFDckQsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFBRSxPQUFPO1FBQzVDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDLEVBQ0QsSUFBSSxDQUNQLENBQUM7SUFDRixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN0RCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztvQkFBRSxPQUFPO2dCQUN2QyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=