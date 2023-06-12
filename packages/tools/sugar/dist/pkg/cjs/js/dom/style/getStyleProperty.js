"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name      getStyleProperty
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Get a style property on the passed element through the computed style.
 * This function try to store the actual style to not trigger more that 1 redraw
 * each js execution loop.
 *
 * @param 		{HTMLElement} 					elm  		The element to get style from
 * @param 		{String} 						property 	The css property to get
 * @return 		{Mixed} 									The style value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getStyleProperty($1, $2)
 *
 * @example  	js
 * import { __getStyleProperty } from '@coffeekraken/sugar/dom'
 * const opacity = __getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __getStyleProperty(elm, property) {
    // // caching mecanisme
    // setTimeout(() => {
    //     elm._sComputedStyle = null;
    // });
    _console.log('ELM', elm);
    const computed = window.getComputedStyle(elm);
    // elm._sComputedStyle = computed;
    const prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
    for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[i];
        const value = computed[(0, string_1.__camelize)(`${prefix}${property}`)];
        if (value && value.trim() !== '')
            return (0, string_1.__parse)(value);
    }
    return null;
}
exports.default = __getStyleProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLHVEQUFpRTtBQUVqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLGtCQUFrQixDQUN0QyxHQUFnQixFQUNoQixRQUFnQjtJQUVoQix1QkFBdUI7SUFDdkIscUJBQXFCO0lBQ3JCLGtDQUFrQztJQUNsQyxNQUFNO0lBQ04sUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLGtDQUFrQztJQUVsQyxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFBLG1CQUFVLEVBQUMsR0FBRyxNQUFNLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQUUsT0FBTyxJQUFBLGdCQUFPLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0Q7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbkJELHFDQW1CQyJ9