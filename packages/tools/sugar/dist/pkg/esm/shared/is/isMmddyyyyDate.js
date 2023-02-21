// @ts-nocheck
/**
 * @name        isMmddyyyyDate
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if is a valid mm.dd.yyyy date
 * This will match : mm.dd.yyyy | mm/dd/yyyy | mm-dd-yyyy | mm dd yyyy
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isMmddyyyyDate } from '@coffeekraken/sugar/is'
 * if (__isMmddyyyyDate('12.25.2018')) {
 *     // do something cool
 * }
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isMmddyyyyDate(date) {
    return /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d\d\d\d$/.test(date);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUFDLElBQUk7SUFDekMsT0FBTyxpRUFBaUUsQ0FBQyxJQUFJLENBQ3pFLElBQUksQ0FDUCxDQUFDO0FBQ04sQ0FBQyJ9