/**
 * @name            simplifySpecialChars
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        ts
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxpZnlTcGVjaWFsQ2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGlmeVNwZWNpYWxDaGFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQyxHQUFHO0lBQzVDLE1BQU0sSUFBSSxHQUFHO1FBQ1QsQ0FBQyxFQUFFLFlBQVk7UUFDZixDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxVQUFVO1FBQ2IsQ0FBQyxFQUFFLFVBQVU7UUFDYixDQUFDLEVBQUUsVUFBVTtRQUNiLENBQUMsRUFBRSxVQUFVO1FBQ2IsQ0FBQyxFQUFFLFlBQVk7UUFDZixDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSxVQUFVO1FBQ2IsQ0FBQyxFQUFFLFVBQVU7UUFDYixDQUFDLEVBQUUsS0FBSztRQUNSLENBQUMsRUFBRSxLQUFLO1FBQ1IsQ0FBQyxFQUFFLEtBQUs7UUFDUixDQUFDLEVBQUUsS0FBSztRQUNSLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLG1CQUFtQjtLQUMzQixDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==