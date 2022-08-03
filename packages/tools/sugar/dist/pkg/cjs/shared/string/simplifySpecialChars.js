"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            simplifySpecialChars
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function take a string and replace all the special chars like "é", "à", etc...
 * with their simple version like "a", "e", etc...
 *
 * @param       {String}        str         The string to process
 * @return      {String}                        The processed string
 *
 * @example         php
 * Sugar\string\simplifySpecialChars('Hellô world'); // => Hello world
 *
 * @see             https://stackoverflow.com/questions/14114411/remove-all-special-characters-from-a-string/14114443
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function simplifySpecialChars(str) {
    const utf8 = {
        a: /[áàâãªä]/gm,
        A: /[ÁÀÂÃÄ]/gm,
        I: /[ÍÌÎÏ]/gm,
        i: /[íìîï]/gm,
        e: /[éèêë]/gm,
        E: /[ÉÈÊË]/gm,
        o: /[óòôõºö]/gm,
        O: /[ÓÒÔÕÖ]/gm,
        u: /[úùûü]/gm,
        U: /[ÚÙÛÜ]/gm,
        c: /ç/gm,
        C: /Ç/gm,
        n: /ñ/gm,
        N: /Ñ/gm,
        '-': /–/gm,
        ' ': /[’‘‹›‚“”«»„[] ]/gm,
    };
    Object.keys(utf8).forEach((char) => {
        str = str.replace(utf8[char], char);
    });
    return str;
}
exports.default = simplifySpecialChars;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBd0Isb0JBQW9CLENBQUMsR0FBRztJQUM1QyxNQUFNLElBQUksR0FBRztRQUNULENBQUMsRUFBRSxZQUFZO1FBQ2YsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxVQUFVO1FBQ2IsQ0FBQyxFQUFFLFVBQVU7UUFDYixDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxZQUFZO1FBQ2YsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxVQUFVO1FBQ2IsQ0FBQyxFQUFFLEtBQUs7UUFDUixDQUFDLEVBQUUsS0FBSztRQUNSLENBQUMsRUFBRSxLQUFLO1FBQ1IsQ0FBQyxFQUFFLEtBQUs7UUFDUixHQUFHLEVBQUUsS0FBSztRQUNWLEdBQUcsRUFBRSxtQkFBbUI7S0FDM0IsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBekJELHVDQXlCQyJ9