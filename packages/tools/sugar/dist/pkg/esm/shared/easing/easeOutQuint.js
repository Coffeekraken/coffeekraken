// @ts-nocheck
/**
 * @name      easeOutQuint
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Ease out quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __easeOutQuint } from '@coffeekraken/sugar/easing';
 * __easeOutQuint(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUFDLENBQUM7SUFDcEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLENBQUMifQ==