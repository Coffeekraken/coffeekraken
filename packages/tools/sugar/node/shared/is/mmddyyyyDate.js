"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isMmddyyyyDate
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
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
 * import isMmddyyyyDate from '@coffeekraken/sugar/js/is/mmddyyyyDate'
 * if (isMmddyyyyDate('12.25.2018')) {
 *     // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isMmddyyyyDate(date) {
    return /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d\d\d\d$/.test(date);
}
exports.default = isMmddyyyyDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW1kZHl5eXlEYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9pcy9tbWRkeXl5eURhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOztBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGNBQWMsQ0FBQyxJQUFJO0lBQzFCLE9BQU8saUVBQWlFLENBQUMsSUFBSSxDQUMzRSxJQUFJLENBQ0wsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSxjQUFjLENBQUMifQ==