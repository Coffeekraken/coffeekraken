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
export default function simplifySpecialChars(str) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxpZnlTcGVjaWFsQ2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGlmeVNwZWNpYWxDaGFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQixDQUFDLEdBQUc7SUFDNUMsTUFBTSxJQUFJLEdBQUc7UUFDVCxDQUFDLEVBQUUsWUFBWTtRQUNmLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLFVBQVU7UUFDYixDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxVQUFVO1FBQ2IsQ0FBQyxFQUFFLFVBQVU7UUFDYixDQUFDLEVBQUUsWUFBWTtRQUNmLENBQUMsRUFBRSxXQUFXO1FBQ2QsQ0FBQyxFQUFFLFVBQVU7UUFDYixDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxLQUFLO1FBQ1IsQ0FBQyxFQUFFLEtBQUs7UUFDUixDQUFDLEVBQUUsS0FBSztRQUNSLENBQUMsRUFBRSxLQUFLO1FBQ1IsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsbUJBQW1CO0tBQzNCLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9CLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyJ9