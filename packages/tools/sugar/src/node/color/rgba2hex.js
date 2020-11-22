"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                rgba2hex
 * @namespace           sugar.js.color
 * @type                Function
 *
 * RGBA to HEX
 *
 * @param       	{Number|Object}        	r	          	The red value between 0-255 or an object representing r, g, b, a
 * @param       	{Number}        	g	          	The green value between 0-255
 * @param       	{Number}        	b	          	The blue value between 0-255
 * @param       	{Number}        	a	          	The alpha value between 0-100|0-1
 * @return      	{string}		                    The hex string representation like #ff004f
 *
 * @example         js
 * import rgba2hex from '@coffeekraken/sugar/js/color/rgba2hex';
 * rgba2hex(10,20,30,10);
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rgba2hex(r, g, b, a = 1) {
    if (typeof r === 'object') {
        g = r.g;
        b = r.b;
        a = r.a;
        r = r.r;
    }
    let alpha = '';
    if (a != 1 && a != 100) {
        if (a < 1) {
            a = 255 * a;
        }
        else if (a > 1) {
            a = (255 / 100) * a;
        }
        a = Math.round(a);
        alpha = parseInt(a, 10).toString(16);
    }
    return ('#' +
        ('0' + parseInt(r, 10).toString(16)).slice(-2) +
        ('0' + parseInt(g, 10).toString(16)).slice(-2) +
        ('0' + parseInt(b, 10).toString(16)).slice(-2) +
        alpha);
}
exports.default = rgba2hex;
