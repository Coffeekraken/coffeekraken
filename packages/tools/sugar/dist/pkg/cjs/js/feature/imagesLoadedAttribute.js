"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
 * import imagesLoadedAttribute from '@coffeekraken/sugar/js/feature/imagesLoadedAttribute';
 * imagesLoadedAttribute();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function imagesLoadedAttribute() {
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
        (0, dom_1.__whenImageLoaded)(img).then((img) => {
            if (img.hasAttribute('loaded'))
                return;
            img.setAttribute('loaded', true);
        });
    });
}
exports.default = imagesLoadedAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUE0RDtBQUc1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMscUJBQXFCO0lBQzFCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDckIsTUFBTSxFQUNOLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDRixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUs7WUFBRSxPQUFPO1FBQ3JELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQUUsT0FBTztRQUM1QyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQyxFQUNELElBQUksQ0FDUCxDQUFDO0lBQ0YsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdEQsSUFBQSx1QkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87WUFDdkMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxrQkFBZSxxQkFBcUIsQ0FBQyJ9