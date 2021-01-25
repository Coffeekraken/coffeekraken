"use strict";
// @ts-nocheck
// @shared
/**
 * @name        isEmail
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a valid email address
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isEmail from '@coffeekraken/sugar/js/is/email';
 * isEmail('john.doe@gmail.com') => true
 * isEmail('plop@yop.com') => true
 * isEmail('hello') => false
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isEmail(data) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(data);
}
module.exports = isEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJO0lBQ25CLE1BQU0sRUFBRSxHQUFHLHdKQUF3SixDQUFDO0lBQ3BLLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBQ0QsaUJBQVMsT0FBTyxDQUFDIn0=