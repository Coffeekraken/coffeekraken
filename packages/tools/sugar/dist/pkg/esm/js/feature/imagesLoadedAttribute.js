// @ts-nocheck
import { __whenImageLoaded } from '@coffeekraken/sugar/dom';
import __fastdom from 'fastdom';
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
 * @example 	js
 * import { __imagesLoadedAttribute } from '@coffeekraken/sugar/feature';
 *  __imagesLoadedAttribute();
 *
 * @since         1.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QjtJQUMzQyxRQUFRLENBQUMsZ0JBQWdCLENBQ3JCLE1BQU0sRUFDTixDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTztZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLO1lBQUUsT0FBTztRQUNyRCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUFFLE9BQU87UUFDNUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUMsRUFDRCxJQUFJLENBQ1AsQ0FBQztJQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3RELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2hDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNsQixJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO29CQUFFLE9BQU87Z0JBQ3ZDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==