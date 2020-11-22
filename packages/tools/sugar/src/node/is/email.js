"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isEmail
 * @namespace           sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a valid email address
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isEmail from '@coffeekraken/sugar/js/is/email';
 * isEmail('john.doe@gmail.com') => true
 * isEmail('plop@yop.com') => true
 * isEmail('hello') => false
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isEmail(data) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(data);
}
exports.default = isEmail;
