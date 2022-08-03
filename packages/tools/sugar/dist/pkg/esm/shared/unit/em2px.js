// @ts-nocheck
/**
 * @name                    em2px
 * @namespace            js.unit
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import em2px from '@coffeekraken/sugar/js/unit/em2px';
 * em2px(2);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function em2px(em, $elm = document.documentElement) {
    return em * parseFloat(getComputedStyle($elm).fontSize || '16px');
}
export default em2px;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZTtJQUM5QyxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9