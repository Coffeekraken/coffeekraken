"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        strToHtml
 * @namespace            js.html
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the html (dom) version of a string
 *
 * @param    {HTMLElement}    html    The string to convert to dom nodes
 * @return    {HTMLElement}    The dom nodes representation of the passed string
 * *
 * @example    js
 * import strToHtml from '@coffeekraken/sugar/js/html/strToHtml'
 * const myString = '<p>Hello World</p>'
 * strToHtml(myString) // <p>Hello World</p>
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function strToHtml(string) {
    if (document !== undefined && document.createElement !== undefined) {
        const cont = document.createElement('div');
        cont.innerHTML = string;
        if (cont.children.length === 1) {
            return cont.children[0];
        }
        else {
            return cont;
        }
    }
    return string;
}
exports.default = strToHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsTUFBYztJQUM3QixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7UUFDaEUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==